import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { PedidoService } from '../services/pedido.service';
import { CarritoService } from '../../../services/carrito.service';
import { AuthService } from '../../pages/services/auth.service'; // Ajusta la ruta según tu estructura
import { Carrito, DetalleProducto } from '../../../services/carrito.model';
import { first } from 'rxjs/operators';
import { firstValueFrom, Subject} from 'rxjs';
import { debounceTime } from 'rxjs/operators';

interface CardData {
  token?: string;
  issuerId?: string;
  paymentMethodId?: string;
  installments?: number;
  cardholderEmail?: string;
  identificationType?: string;
  identificationNumber?: string;
}

interface PaymentResponse {
  id: number;
  status: string;
  status_detail: string;
  card: { last_four_digits: string; first_six_digits?: string; expiration_month?: number; expiration_year?: number };
}

interface PedidoResponse {
  id: number;
}

interface DatosPedido {
  metodo_pago: string;
  direccion_entrega: string;
  telefono: string;
  total: number;
  numero_tarjeta?: string;
  fecha_expiracion?: string;
  codigo_seguridad?: string;
}

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit, AfterViewInit {
  carrito: DetalleProducto[] = [];
  metodoPago: string = 'tarjeta';
  direccion: string = '';
  telefono: string = '';
  pedidoRealizado: boolean = false;
  pedidoId: number | null = null;
  mpCardForm: any | null = null;
  userEmail: string = '';
  isProcessing: boolean = false;

  constructor(
    private carritoService: CarritoService,
    private servicio_pedido: PedidoService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.obtenerCarrito();
    this.authService.userData$.subscribe({
      next: (userData: { email: string } | null) => (this.userEmail = userData?.email || 'testuser@example.com'),
      error: (error: HttpErrorResponse) => {
        this.userEmail = 'testuser@example.com';
        console.error('Error al obtener email:', error);
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.inicializarMercadoPago(), 0);
  }

  obtenerCarrito(): void {
    this.carritoService.obtenerCarrito().subscribe({
      next: (data: Carrito) => {
        this.carrito = data.detalles_producto;
        if (!this.carrito?.length) {
          alert('Carrito vacío. Agrega productos.');
          this.router.navigate(['/productos']);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener carrito:', error);
        alert('Error al obtener carrito.');
      }
    });
  }

  calcularTotal(): number {
    return this.carrito.reduce((sum, item) => sum + Number(item.total_producto), 0) || 100;
  }

  async sincronizarCarrito(): Promise<void> {
    try {
      const token = this.authService.getAccessToken();
      if (!token) throw new Error('No hay token.');
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' });
      const carritoBackend = await firstValueFrom(this.carritoService.obtenerCarrito());
      const itemsBackend = carritoBackend.detalles_producto.map((item: any) => ({
        producto_id: item.id_producto,
        cantidad: item.cantidad
      }));
      const itemsFrontend = this.carrito.map(item => ({ producto_id: item.id_producto, cantidad: item.cantidad }));
      if (JSON.stringify(itemsBackend) === JSON.stringify(itemsFrontend)) return;

      for (const item of itemsFrontend) {
        try {
          await firstValueFrom(this.http.post('http://127.0.0.1:8000/api/cart/carrito/agregar/', item, { headers }));
        } catch (error: any) {
          console.warn('Error al agregar item:', error);
        }
      }
      const carritoFinal = await firstValueFrom(this.carritoService.obtenerCarrito());
      if (!carritoFinal.detalles_producto?.length) throw new Error('Carrito no sincronizado.');
    } catch (error: any) {
      console.error('Error al sincronizar carrito:', error);
      throw error;
    }
  }

  inicializarMercadoPago(): void {
    if (this.metodoPago !== 'tarjeta') return;
    if (!window.MercadoPago) {
      alert('SDK de Mercado Pago no cargado.');
      return;
    }

    try {
      const mp = new window.MercadoPago('TEST-a6ce50b2-3883-4185-ae56-bf8e2c88014e', { locale: 'es-AR' });
      const form = document.getElementById('form-checkout');
      if (!form) throw new Error('Formulario no encontrado.');

      this.mpCardForm = mp.cardForm({
        amount: this.calcularTotal().toString(),
        iframe: true,
        form: {
          id: 'form-checkout',
          cardNumber: { id: 'form-checkout__cardNumber', placeholder: 'Número de tarjeta' },
          expirationDate: { id: 'form-checkout__expirationDate', placeholder: 'MM/AA' },
          securityCode: { id: 'form-checkout__securityCode', placeholder: 'Código de seguridad' },
          cardholderName: { id: 'form-checkout__cardholderName', placeholder: 'Titular' },
          issuer: { id: 'form-checkout__issuer', placeholder: 'Banco emisor' },
          installments: { id: 'form-checkout__installments', placeholder: 'Cuotas' },
          identificationType: { id: 'form-checkout__identificationType', placeholder: 'Tipo de documento' },
          identificationNumber: { id: 'form-checkout__identificationNumber', placeholder: 'Número de documento' },
          cardholderEmail: { id: 'form-checkout__cardholderEmail', placeholder: 'E-mail' }
        },
        callbacks: {
          onFormMounted: (error: any) => error && console.error('Error al montar formulario:', error),
          onSubmit: async (event: Event) => {
            event.preventDefault();
            await this.handleSubmit();
          },
          onError: (errors: any[]) => alert(`Error en formulario: ${errors.map(e => e.message).join('; ')}`)
        }
      });
      mp.getIdentificationTypes();
    } catch (error: any) {
      console.error('Error inicializando Mercado Pago:', error);
      alert('Error al inicializar pagos.');
    }
  }

  async handleSubmit(): Promise<void> {
    if (this.isProcessing) {
      console.log('Procesamiento en curso, ignorando submit');
      return;
    }
    this.isProcessing = true;
    const submitButton = document.querySelector('#form-checkout__submit') as HTMLButtonElement;
    if (submitButton) submitButton.disabled = true;

    try {
      let cardData: CardData | null = null;
      if (this.metodoPago === 'tarjeta') {
        cardData = this.mpCardForm?.getCardFormData();
        if (!cardData?.token) throw new Error('Datos de tarjeta inválidos.');
        console.log('Datos de tarjeta:', cardData);
      }
      await this.realizarPedido(cardData);
    } catch (error: any) {
      console.error('Error al procesar:', error);
      alert(`Error: ${error.message || 'Verifica los datos.'}`);
    } finally {
      this.isProcessing = false;
      if (submitButton) submitButton.disabled = false;
    }
  }

  async realizarPedido(cardData: CardData | null): Promise<void> {
  if (!this.direccion || !this.telefono) {
    alert('Completa dirección y teléfono.');
    return;
  }
  if (!this.carrito?.length) {
    alert('Carrito vacío.');
    this.router.navigate(['/productos']);
    return;
  }
  const token = this.authService.getAccessToken();
  if (!token) {
    alert('Inicia sesión.');
    this.router.navigate(['']);
    return;
  }

  let datosPedido: DatosPedido = {
    metodo_pago: this.metodoPago,
    direccion_entrega: this.direccion,
    telefono: this.telefono,
    total: this.calcularTotal()
  };

  try {
    console.log('Sincronizando carrito...');
    await this.sincronizarCarrito();
    const carritoBackend = await firstValueFrom(this.carritoService.obtenerCarrito());
    if (!carritoBackend.detalles_producto?.length) {
      console.error('Carrito backend vacío:', carritoBackend);
      throw new Error('Carrito backend vacío.');
    }

    if (this.metodoPago === 'tarjeta' && cardData) {
      const paymentData = {
        token: cardData.token,
        issuer_id: cardData.issuerId,
        payment_method_id: cardData.paymentMethodId,
        transaction_amount: this.calcularTotal(),
        installments: Number(cardData.installments) || 1,
        email: this.userEmail,
        description: `Compra Aymara - ${Date.now()}`,
        payer: { email: this.userEmail, identification: { type: cardData.identificationType || 'DNI', number: cardData.identificationNumber || '12345678' } },
        external_reference: `PED_${Date.now()}`
      };

      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' });
      const response = await firstValueFrom(
        this.http.post<PaymentResponse>('http://127.0.0.1:8000/api/pagos/procesos_de_pago/', paymentData, { headers })
      );

      if (response.status !== 'approved') throw new Error(`Pago no aprobado: ${response.status_detail}`);
      datosPedido.numero_tarjeta = (response.card.first_six_digits || '503175') + '000000' + (response.card.last_four_digits || '0604');
      datosPedido.fecha_expiracion = `${String(response.card.expiration_month || 11).padStart(2, '0')}/${String(response.card.expiration_year || 2030).slice(-2)}`;
      datosPedido.codigo_seguridad = '123';
    }

    console.log('Creando pedido con:', datosPedido);
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' });
    const pedidoResponse = await firstValueFrom(
      this.http.post<PedidoResponse>('http://127.0.0.1:8000/api/cart/pedido/crear/', datosPedido, { headers })
    );

    this.pedidoId = pedidoResponse.id;
    this.carrito = [];
    alert('¡Pedido realizado!');
    this.pedidoRealizado = true;
    setTimeout(() => this.router.navigate(['/mispedidos']), 3000);
  } catch (error: any) {
    console.error('Error al crear pedido:', error);
    alert(`Error: ${error.error?.error || error.message || 'Inténtalo de nuevo.'}`);
    if (error.error?.error?.includes('vacío') || error.error?.error?.includes('empty')) {
      try {
        console.log('Reintentando sincronización de carrito...');
        await this.sincronizarCarrito();
        const carritoBackend = await firstValueFrom(this.carritoService.obtenerCarrito());
        if (!carritoBackend.detalles_producto?.length) {
          alert('No se pudo restaurar el carrito.');
          this.router.navigate(['/productos']);
        } else {
          alert('Carrito restaurado. Intenta de nuevo.');
        }
      } catch (restoreError: any) {
        console.error('Error al restaurar carrito:', restoreError);
        alert('Error al restaurar carrito.');
        this.router.navigate(['/productos']);
      }
    }
  }
}

  descargarPDF(): void {
    if (!this.pedidoId) {
      alert('No hay pedido.');
      return;
    }
    const token = this.authService.getAccessToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this.http.get(`http://127.0.0.1:8000/api/cart/pedidos/${this.pedidoId}/factura/`, { headers, responseType: 'blob' })
      .subscribe({
        next: (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `pedido-${this.pedidoId}.pdf`;
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (error: any) => {
          console.error('Error al descargar PDF:', error);
          alert('Error al descargar PDF.');
        }
      });
  }
}