import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CarritoService } from '../../../services/carrito.service';
import { ProductoService, Producto } from '../../../services/productos.service';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  loading: boolean = true;

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe(
      (productosData: Producto[]) => {
        this.productos = productosData;
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
        this.loading = false;
      }
    );
  }

  agregarAlCarrito(producto: Producto, cantidad: number): void {
    if (cantidad <= 0 || cantidad > producto.stock) {
      console.error('Cantidad inválida o mayor al stock disponible');
      return;
    }

    this.carritoService.agregarProductoAlCarrito(producto.id_producto, cantidad).subscribe(
      (response) => {
        this.router.navigate(['carrito']);
      },
      (error) => {
        console.error('Error al agregar al carrito:', error);
      }
    );
  }
}
