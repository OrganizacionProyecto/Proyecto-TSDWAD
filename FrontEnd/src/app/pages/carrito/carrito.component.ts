import { Component, OnInit } from '@angular/core';
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

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.obtenerCarrito();
  }

  obtenerCarrito(): void {
    this.carritoService.obtenerCarrito().subscribe({
      next: (data: Carrito) => {
        this.carrito = data;
      },
      error: (error) => {
        console.error('Error al obtener el carrito:', error);
      }
    });
  }

  modificarCantidad(producto: DetalleProducto, nuevaCantidad: number | string): void {
    if (!producto.id_producto) {
      console.error('Falta id_producto');
      return;
    }

    const cantidadNumerica = Number(nuevaCantidad);
    if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
      console.error('Cantidad inválida');
      return;
    }

    this.carritoService.modificarProductoCarrito(producto.id_producto, cantidadNumerica).subscribe({
      next: () => this.obtenerCarrito(),
      error: (error) => console.error('Error al modificar cantidad:', error)
    });
  }

  eliminarProducto(producto: DetalleProducto): void {
    if (!producto.id_producto) {
      console.error('Falta id_producto');
      return;
    }

    this.carritoService.eliminarProductoDelCarrito(producto.id_producto).subscribe({
      next: () => this.obtenerCarrito(),
      error: (error) => console.error('Error al eliminar producto:', error)
    });
  }
}
