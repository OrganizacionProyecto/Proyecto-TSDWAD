import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CarritoService } from '../../../services/carrito.service';
import { ProductoService, Producto } from '../../../services/productos.service';
import { CarritoComponent } from '../carrito/carrito.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CarritoComponent, FormsModule ],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe(
      (data: Producto[]) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  agregarAlCarrito(producto: Producto, cantidad: number) {
    if (cantidad <= 0) return;
    const productoConCantidad = { ...producto, cantidad };
    this.carritoService.actualizarCarrito({ productos: [productoConCantidad] });
    this.router.navigate(['carrito']);
  }
}
