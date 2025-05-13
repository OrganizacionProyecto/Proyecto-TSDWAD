
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../../../services/carrito.service';
import { Carrito, DetalleProducto } from '../../../services/carrito.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  
  carrito: Carrito = {
    detalles_producto: [],
    total_carrito: 0
  };

  constructor(
    private carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerCarrito();
  }

  /**
   * Obtiene los datos del carrito desde el backend.
   */
  obtenerCarrito(): void {
    this.carritoService.obtenerCarrito().subscribe({
      next: (data: Carrito) => {
        this.carrito = data;
        this.actualizarTotalCarrito();
        console.log('Carrito obtenido:', this.carrito);
      },
      error: (error) => {
        console.error('Error al obtener el carrito:', error);
      }
    });
  }

  /**
   * Modifica la cantidad de un producto en el carrito.
   */
modificarCantidad(producto: DetalleProducto, nuevaCantidad: number | string, accion: string): void {
  const cantidadNumerica = Number(nuevaCantidad);

  if (isNaN(cantidadNumerica) || cantidadNumerica < 0) {
    console.error('Cantidad inválida');
    return;
  }

  console.log(`Producto ID: ${producto.id_producto}, Acción: ${accion}, Nueva Cantidad: ${cantidadNumerica}`);

  this.carritoService.modificarProductoCarrito(producto.id_producto, accion, cantidadNumerica).subscribe({
    next: (data) => {
      console.log('Producto actualizado:', data);
      this.obtenerCarrito();
    },
    error: (error) => {
      console.error('Error al modificar cantidad:', error);
    }
  });
}


  /**
   * Elimina un producto del carrito.
   */
  eliminarProducto(producto: DetalleProducto): void {
    if (producto.id_producto === undefined) {
      console.warn('ID del producto no disponible para eliminar.');
      return;
    }

    console.log(`Eliminando producto ID: ${producto.id_producto}`);

    this.carritoService.eliminarProductoDelCarrito(producto.id_producto).subscribe({
      next: () => {
        console.log(`Producto ${producto.id_producto} eliminado correctamente.`);
        this.obtenerCarrito();
      },
      error: (error) => {
        console.error(`Error al eliminar producto ${producto.id_producto}:`, error);
      }
    });
  }

  /**
   * Recalcula el total del carrito.
   */
  actualizarTotalCarrito(): void {
    this.carrito.total_carrito = this.carrito.detalles_producto.reduce(
      (total, producto) => total + (producto.precio_unitario * producto.cantidad), 0
    );
    console.log(`Total del carrito actualizado: $${this.carrito.total_carrito}`);
  }

  /**
   * Redirige al componente de pedido.
   */
  irAPedido(): void {
    console.log('Redirigiendo a la página de pedido.');
    this.router.navigate(['/pedido']);
  }
}
