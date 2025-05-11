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

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerCarrito();
  }

  obtenerCarrito(): void {
    this.carritoService.obtenerCarrito().subscribe({
      next: (data: Carrito) => {
        this.carrito = data;
        this.actualizarTotalCarrito(); 
      },
      error: (error) => {
        console.error('Error al obtener el carrito:', error);
      }
    });
  }

modificarCantidad(producto: DetalleProducto, nuevaCantidad: number | string): void {
  const cantidadNumerica = Number(nuevaCantidad);

  if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
    console.error('Cantidad inválida');
    return;
  }

  console.log(`Cantidad actual: ${producto.cantidad}, Nueva cantidad: ${cantidadNumerica}`);

  if (producto.cantidad === cantidadNumerica) {
    console.warn('La cantidad es la misma, no se realizaron cambios.');
    return;
  }

  const diferencia = cantidadNumerica - producto.cantidad;

  const accion = diferencia > 0 ? 'aumentar' : 'disminuir';
  const cantidadAbsoluta = Math.abs(diferencia);

  this.carritoService.modificarProductoCarrito(producto.id_producto, accion, cantidadAbsoluta).subscribe({
    next: (data) => {
      console.log('Carrito actualizado:', data);
      this.carrito = data; 
      this.actualizarTotalCarrito(); // Recalcular el total del carrito
    },
    error: (error) => {
      console.error('Error al modificar cantidad:', error);
    }
  });
}


actualizarTotalCarrito(): void {
  this.carrito.total_carrito = this.carrito.detalles_producto.reduce(
    (total, producto) => total + (producto.precio_unitario * producto.cantidad), 0
  );
  console.log(`Total del carrito actualizado: $${this.carrito.total_carrito}`);
}



eliminarProducto(producto: DetalleProducto): void {
  if (producto.id_producto === undefined) {
    console.error('ID del producto no disponible para eliminar');
    return;
  }

  this.carritoService.eliminarProductoDelCarrito(producto.id_producto).subscribe({
    next: () => this.obtenerCarrito(),
    error: (error) => console.error('Error al eliminar producto:', error)
  });
}


  irAPedido(): void {
    this.router.navigate(['/pedido']);
  }
}
