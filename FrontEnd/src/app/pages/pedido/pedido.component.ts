import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { PedidoService } from '../services/pedido.service';
import { CarritoService } from '../../../services/carrito.service';
import { Carrito, DetalleProducto } from '../../../services/carrito.model';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  carrito: DetalleProducto[] = [];
  metodoPago: string = 'tarjeta';
  numero_tarjeta: string = '';
  fecha_expiracion: string = '';
  codigo_seguridad: string = '';
  direccion: string = '';
  telefono: string = '';
  pedidoRealizado: boolean = false;
  pedidoId: number | null = null;

  constructor(
    private carritoService: CarritoService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerCarrito();
  }

  obtenerCarrito(): void {
    this.carritoService.obtenerCarrito().subscribe({
      next: (data: any) => {
        this.carrito = data.detalles_producto;
      },
      error: (error: any) => {
        console.error('Error al obtener el carrito:', error);
      }
    });
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + Number(item.total_producto), 0);
  }

realizarPedido(): void {
  if (!this.direccion || !this.telefono) {
    alert('Debes completar dirección y teléfono.');
    return;
  }

  const datosPedido: any = {
    metodo_pago: this.metodoPago,
    direccion_entrega: this.direccion,
    telefono: this.telefono
  };

  if (this.metodoPago === 'tarjeta') {
    if (!this.numero_tarjeta || !this.fecha_expiracion || !this.codigo_seguridad) {
      alert('Completa todos los campos de tarjeta.');
      return;
    }
    datosPedido.numero_tarjeta = this.numero_tarjeta;
    datosPedido.fecha_expiracion = this.fecha_expiracion;
    datosPedido.codigo_seguridad = this.codigo_seguridad;
  }

  this.pedidoService.crearPedido(datosPedido).subscribe({
    next: (response: any) => {
      if (this.metodoPago === 'mercadopago' && response.mercadopago_url) {
        window.location.href = response.mercadopago_url;
        return;
      }

      alert('¡Pedido realizado con éxito!');
      this.pedidoRealizado = true;
      this.pedidoId = response.id || null;

      // Limpiar campos
      this.numero_tarjeta = '';
      this.fecha_expiracion = '';
      this.codigo_seguridad = '';
      this.direccion = '';
      this.telefono = '';
      this.metodoPago = 'tarjeta';

      // Redirigir tras 3 segundos
      setTimeout(() => this.router.navigate(['/mispedidos']), 3000);
    },
    error: (error: any) => {
      console.error('Error al realizar el pedido:', error);
      console.error('Detalle error backend:', error.error);  // <-- Aquí
      alert('Hubo un error al procesar el pedido.');
    }

  });
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
      error: (error: any) => {
        console.error('Error al descargar PDF:', error);
      }
    });
  }
}
