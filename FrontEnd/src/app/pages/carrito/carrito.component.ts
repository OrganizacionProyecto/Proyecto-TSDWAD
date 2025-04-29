import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../../services/carrito.service';
import { Carrito } from '../../../services/carrito.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Importar los módulos necesarios
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: Carrito = { 
    productos: [], 
    total: 0, 
    id: 0,            // Inicializa las propiedades faltantes
    direccionEnvio: '', 
    telefono: '' 
  };

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.obtenerCarrito();
  }

  obtenerCarrito(): void {
    this.carritoService.obtenerCarrito().subscribe({
      next: (data: Carrito) => {
        this.carrito = data;  // Asigna los datos del carrito
      },
      error: (error) => {
        console.error('Error al obtener el carrito:', error);
      }
    });
  }

  agregarProducto(id_producto: number, cantidad: number): void {
    this.carritoService.agregarProductoAlCarrito(id_producto, cantidad).subscribe({
      next: () => {
        this.obtenerCarrito();  // Actualiza el carrito después de agregar el producto
      },
      error: (error) => {
        console.error('Error al agregar producto:', error);
      }
    });
  }

  modificarCantidad(id_producto: number, cantidad: number): void {
    this.carritoService.modificarProductoCarrito(id_producto, cantidad).subscribe({
      next: () => {
        this.obtenerCarrito();  // Actualiza el carrito después de modificar la cantidad
      },
      error: (error) => {
        console.error('Error al modificar cantidad:', error);
      }
    });
  }

  eliminarProducto(id_producto: number): void {
    this.carritoService.eliminarProductoDelCarrito(id_producto).subscribe({
      next: () => {
        this.obtenerCarrito();  // Actualiza el carrito después de eliminar el producto
      },
      error: (error) => {
        console.error('Error al eliminar producto:', error);
      }
    });
  }
}
