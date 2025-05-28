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

declare var MercadoPago: any;

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
  mpCardForm: any;
  userEmail: string = '';

  constructor(
    private carritoService: CarritoService,
    private pedidoService: PedidoService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.obtenerCarrito();
    this.authService.userData$.pipe(first()).subscribe({
      next: (userData: { email: string } | null) => {
        this.userEmail = userData?.email || 'testuser@example.com';
      },
      error: (error: HttpErrorResponse) => {
        this.userEmail = 'testuser@example.com';
        console.error('Error al obtener el email del usuario:', error);
        alert(`Error al obtener datos del usuario: ${error.message || 'Inténtalo de nuevo.'}`);
      }
    });
  }

  ngAfterViewInit(): void {
    this.inicializarMercadoPago();
  }

  obtenerCarrito(): void {
    this.carritoService.obtenerCarrito().subscribe({
      next: (data: any) => {
        this.carrito = data.detalles_producto;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener el carrito:', error);
        alert(`Error al obtener el carrito: ${error.message || 'Inténtalo de nuevo.'}`);
      }
    });
  }

  calcularTotal(): number {
    const total = this.carrito.reduce((total, item) => total + Number(item.total_producto), 0);
    return total > 0 ? total : 100; // Usar 100 como monto de prueba si es 0
  }

  inicializarMercadoPago(): void {
    if (this.metodoPago !== 'tarjeta') {
      console.log('Método de pago no es tarjeta, omitiendo inicialización de Mercado Pago');
      return;
    }

    try {
      const mp = new MercadoPago('TEST-a6ce50b2-3883-4185-ae56-bf8e2c88014e', { locale: 'es-AR' });
      console.log('Mercado Pago inicializado con éxito');

      const form = document.getElementById('form-checkout');
      if (!form) {
        throw new Error('Formulario con id="form-checkout" no encontrado en el DOM');
      }

      const requiredIds = [
        'form-checkout__cardNumber',
        'form-checkout__expirationDate',
        'form-checkout__securityCode',
        'form-checkout__cardholderName',
        'form-checkout__issuer',
        'form-checkout__installments',
        'form-checkout__identificationType',
        'form-checkout__identificationNumber',
        'form-checkout__cardholderEmail'
      ];
      requiredIds.forEach(id => {
        if (!document.getElementById(id)) {
          throw new Error(`Elemento con id="${id}" no encontrado en el DOM`);
        }
      });

      this.mpCardForm = mp.cardForm({
        amount: this.calcularTotal().toString(),
        iframe: true,
        form: {
          id: 'form-checkout',
          cardNumber: { id: 'form-checkout__cardNumber', placeholder: 'Número de tarjeta' },
          expirationDate: { id: 'form-checkout__expirationDate', placeholder: 'MM/AA' },
          securityCode: { id: 'form-checkout__securityCode', placeholder: 'Código de seguridad' },
          cardholderName: { id: 'form-checkout__cardholderName', placeholder: 'Titular de la tarjeta' },
          issuer: { id: 'form-checkout__issuer', placeholder: 'Banco emisor' },
          installments: { id: 'form-checkout__installments', placeholder: 'Cuotas' },
          identificationType: { id: 'form-checkout__identificationType', placeholder: 'Tipo de documento' },
          identificationNumber: { id: 'form-checkout__identificationNumber', placeholder: 'Número del documento' },
          cardholderEmail: { id: 'form-checkout__cardholderEmail', placeholder: 'E-mail' }
        },
        callbacks: {
          onFormMounted: (error: any) => {
            if (error) {
              console.error('Error al montar el formulario:', error);
              return;
            }
            console.log('Form mounted');
          },
          onSubmit: (event: any) => {
            event.preventDefault();
            const cardData = this.mpCardForm.getCardFormData();
            console.log('Datos del formulario:', cardData);
            this.realizarPedido(cardData);
          },
          onFetching: (resource: any) => {
            console.log('Fetching resource:', resource);
            const progressBar = document.querySelector('.progress-bar');
            if (progressBar) {
              progressBar.removeAttribute('value');
            }
            return () => {
              if (progressBar) {
                progressBar.setAttribute('value', '0');
              }
            };
          },
          onIdentificationTypesReceived: (error: any, identificationTypes: any) => {
            console.log('IdentificationTypes recibidos:', { error, identificationTypes });
            if (error) {
              console.error('Error al obtener tipos de identificación:', error);
              alert(`Error al obtener tipos de identificación: ${error.message || 'Inténtalo de nuevo.'}`);
              return;
            }
            const identificationSelect = document.getElementById('form-checkout__identificationType') as HTMLSelectElement;
            identificationSelect.innerHTML = '<option value="">Seleccione tipo de documento</option>';
            if (identificationTypes && Array.isArray(identificationTypes)) {
              identificationTypes.forEach((type: any) => {
                const option = document.createElement('option');
                option.value = type.id;
                option.text = type.name;
                identificationSelect.appendChild(option);
              });
            } else {
              console.warn('No se recibieron tipos de identificación válidos');
            }
          },
          onPaymentMethodsReceived: (error: any, paymentMethods: any) => {
            console.log('PaymentMethods recibidos:', { error, paymentMethods });
            if (error) {
              console.error('Error al obtener métodos de pago:', error);
              alert(`Error al obtener métodos de pago: ${error.message || 'Inténtalo de nuevo.'}`);
              return;
            }
            const issuerSelect = document.getElementById('form-checkout__issuer') as HTMLSelectElement;
            issuerSelect.innerHTML = '<option value="">Seleccione un banco</option>';
            if (paymentMethods && Array.isArray(paymentMethods)) {
              paymentMethods.forEach((method: any) => {
                const option = document.createElement('option');
                option.value = method.id || method.issuer_id || '';
                option.text = method.name || method.issuer_name || 'Banco desconocido';
                issuerSelect.appendChild(option);
              });
            } else {
              console.warn('No se recibieron métodos de pago válidos:', paymentMethods);
            }
          },
          onInstallmentsReceived: (error: any, installments: any) => {
            console.log('Installments recibidos:', { error, installments });
            if (error) {
              console.error('Error al obtener cuotas:', error);
              alert(`Error al obtener cuotas: ${error.message || 'Inténtalo de nuevo.'}`);
              return;
            }
            const installmentsSelect = document.getElementById('form-checkout__installments') as HTMLSelectElement;
            installmentsSelect.innerHTML = '<option value="">Seleccione cuotas</option>';
            if (installments && installments.payer_costs && Array.isArray(installments.payer_costs)) {
              installments.payer_costs.forEach((inst: any) => {
                const option = document.createElement('option');
                option.value = inst.installments.toString();
                option.text = `${inst.installments} cuota${inst.installments > 1 ? 's' : ''} de ${inst.installment_amount} ${installments.currency_id || 'ARS'}`;
                installmentsSelect.appendChild(option);
              });
            } else {
              console.warn('No se recibieron cuotas válidas:', installments);
            }
          },
          onError: (error: any) => {
            console.error('Error de Mercado Pago:', error);
            alert(`Error en el formulario de pago: ${error.message || 'Inténtalo de nuevo.'}`);
          }
        }
      });

      // Cargar tipos de identificación
      mp.getIdentificationTypes();

      // Cargar cuotas manualmente
      const total = this.calcularTotal();
      if (total > 0) {
        mp.getInstallments({
          amount: total.toString(),
          locale: 'es-AR',
          payment_method_id: 'visa',
          bin: '450995'
        }).then((installments: any) => {
          console.log('Cuotas obtenidas manualmente:', installments);
          const installmentsSelect = document.getElementById('form-checkout__installments') as HTMLSelectElement;
          installmentsSelect.innerHTML = '<option value="">Seleccione cuotas</option>';
          if (installments && installments.payer_costs && Array.isArray(installments.payer_costs)) {
            installments.payer_costs.forEach((inst: any) => {
              const option = document.createElement('option');
              option.value = inst.installments.toString();
              option.text = `${inst.installments} cuota${inst.installments > 1 ? 's' : ''} de ${inst.installment_amount} ${installments.currency_id || 'ARS'}`;
              installmentsSelect.appendChild(option);
            });
          }
        }).catch((error: any) => {
          console.error('Error al obtener cuotas manualmente:', error);
        });
      } else {
        console.warn('Total inválido para obtener cuotas:', total);
      }

    } catch (error: any) {
      console.error('Error al inicializar Mercado Pago:', error);
      alert(`No se pudo inicializar el sistema de pagos: ${error.message || 'Error desconocido'}. Por favor, recarga la página.`);
    }
  }

  realizarPedido(cardData?: any): void {
    if (!this.direccion || !this.telefono) {
      alert('Debes completar dirección y teléfono.');
      return;
    }

    const datosPedido: any = {
      metodo_pago: this.metodoPago,
      direccion_entrega: this.direccion,
      telefono: this.telefono,
      total: this.calcularTotal()
    };

    if (this.metodoPago === 'tarjeta' && cardData) {
      const paymentData = {
        token: cardData.token,
        issuer_id: cardData.issuerId,
        payment_method_id: cardData.paymentMethodId,
        transaction_amount: this.calcularTotal(),
        installments: Number(cardData.installments),
        description: `Compra en Aymara2025 - Pedido ${Date.now()}`,
        payer: {
          email: cardData.cardholderEmail,
          identification: {
            type: cardData.identificationType,
            number: cardData.identificationNumber
          }
        },
        external_reference: `PED_${Date.now()}`
      };

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getAccessToken() || ''}`,
        'Content-Type': 'application/json'
      });

      this.http.post('https://aymara.pythonanywhere.com/api/procesos_de_pago/', paymentData, { headers }).subscribe({
        next: (response: any) => {
          if (response.status === 'approved') {
            alert('¡Pago exitoso!');
            this.pedidoRealizado = true;
            this.pedidoId = response.id;

            this.pedidoService.crearPedido(datosPedido).subscribe({
              next: () => {
                setTimeout(() => this.router.navigate(['/mispedidos']), 3000);
              },
              error: (error: HttpErrorResponse) => {
                console.error('Error al guardar pedido:', error);
                alert(`Error al guardar el pedido: ${error.message || 'Inténtalo de nuevo.'}`);
              }
            });
          } else {
            alert(`Pago no aprobado: ${response.status_detail || 'Inténtalo de nuevo.'}`);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al procesar el pago:', error);
          alert(`Error al procesar el pago: ${error.error?.detail || 'No se pudo procesar el pago.'}`);
        }
      });
    } else if (this.metodoPago === 'efectivo') {
      this.pedidoService.crearPedido(datosPedido).subscribe({
        next: (response: any) => {
          alert('¡Pedido realizado con éxito!');
          this.pedidoRealizado = true;
          this.pedidoId = response.id;
          setTimeout(() => this.router.navigate(['/mispedidos']), 3000);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al realizar el pedido:', error);
          alert(`Error al realizar el pedido: ${error.message || 'Inténtalo de nuevo.'}`);
        }
      });
    }
  }

  descargarPDF(): void {
    if (!this.pedidoId) return;
    this.pedidoService.descargarPDF(this.pedidoId).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pedido_${this.pedidoId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al descargar PDF:', error);
        alert(`Error al descargar el PDF: ${error.message || 'Inténtalo de nuevo.'}`);
      }
    });
  }
}