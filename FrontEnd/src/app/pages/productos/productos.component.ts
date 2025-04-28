/*import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CarritoService } from '../../../services/carrito.service';
import { ProductoService, Producto, Stock } from '../../../services/productos.service';
import { CarritoComponent } from '../carrito/carrito.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CarritoComponent, FormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  stock: Stock[] = [];

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe(
      (data: Producto[]) => {
        this.productos = data;
        this.productoService.obtenerStock().subscribe(
          (stockData: Stock[]) => {
            this.stock = stockData;
            this.asociarStock();
          },
          (error) => {
            console.error('Error al obtener stock:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  asociarStock(): void {
    this.productos.forEach(producto => {
      const stockItem = this.stock.find(s => s.id_producto === producto.idProducto);
      if (stockItem) {
        producto.disponibilidad = stockItem.cantidad; // Asignar la cantidad de stock a disponibilidad
        console.log(`Producto ID: ${producto.idProducto}, Stock: ${stockItem.cantidad}`);
      } else {
        producto.disponibilidad = 0; // Si no hay stock, asignar 0
        console.log(`Producto ID: ${producto.idProducto} no tiene stock asociado`);
      }
    });
  }
  

  agregarAlCarrito(producto: Producto, cantidad: number) {
    if (cantidad <= 0) return;
    const productoConCantidad = { ...producto, cantidad };
    this.carritoService.actualizarCarrito({ productos: [productoConCantidad] });
    this.router.navigate(['carrito']);
  }
}*/
