import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../../services/carrito.service';
import { ProductoService, Producto } from '../../../services/productos.service';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../../pages/services/auth.service'; 

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  productosOriginales: Producto[] = [];
  loading: boolean = true;
  buscarTexto: string = '';
  criterioSeleccionado: string = '0'; 
  categoriaMap: { [key: number]: string } = {
    1: 'Crocantes',
    2: 'Bebidas',
    3: 'Alimentos secos',
  };
  errorMensajes: { [id_producto: number]: string } = {};

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private router: Router,
    public authService: AuthService  // Cambia a public
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe(
      (productosData: Producto[]) => {
        this.productosOriginales = productosData;
        this.productos = productosData.map(p => ({ ...p, cantidad: 1 }));
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
        this.loading = false;
      }
    );
  }

  filtrarProductos(): void {
    const texto = this.buscarTexto.trim().toLowerCase();
    const criterio = this.criterioSeleccionado;
  
    if (!texto) {
      this.productos = this.productosOriginales; 
      return;
    }
  
    this.productos = this.productosOriginales.filter((producto) => {
      switch (criterio) {
        case '0': // Nombre
          return producto.nombre.toLowerCase().includes(texto);
        case '1': // Categoría
          const categoriaNombre = this.categoriaMap[producto.id_categoria]?.toLowerCase() || '';
          return categoriaNombre.includes(texto);
        default:
          return true;
      }
    });
  }

  agregarAlCarrito(producto: Producto, cantidad: any): void {
    // Limpia el mensaje anterior
    this.errorMensajes[producto.id_producto] = '';

    const cantidadNum = Number(cantidad);

    if (isNaN(cantidadNum) || cantidadNum <= 0) {
      this.errorMensajes[producto.id_producto] = 'La cantidad debe ser mayor a 0';
      return;
    }
    if (cantidadNum > producto.stock) {
      this.errorMensajes[producto.id_producto] = 'Cantidad no válida: supera el stock disponible';
      return;
    }

    this.carritoService.agregarProductoAlCarrito(producto.id_producto, cantidadNum).subscribe(
      (response) => {
        this.router.navigate(['carrito']);
      },
      (error) => {
        this.errorMensajes[producto.id_producto] = 'Error al agregar al carrito';
        console.error('Error al agregar al carrito:', error);
      }
    );
  }
}
