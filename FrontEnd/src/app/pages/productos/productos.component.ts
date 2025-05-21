import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../../services/carrito.service';
import { ProductoService, Producto, Categoria } from '../../../services/productos.service';
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
  categorias: Categoria[] = [];
  categoriaMap: { [key: number]: string } = {};
  loading: boolean = true;
  buscarTexto: string = '';
  criterioSeleccionado: string = '0';
  filtroCategoria: string = ''; 

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private router: Router,
    public authService: AuthService  
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe(
      (productosData: Producto[]) => {
        this.productosOriginales = productosData;
        this.productos = productosData;
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
        this.loading = false;
      }
    );
  }

  obtenerCategorias(): void {
    this.productoService.obtenerCategorias().subscribe(
      (categoriasData: Categoria[]) => {
        this.categorias = categoriasData;

        // Actualizamos el mapa de categorías
        this.categoriaMap = {};
        categoriasData.forEach(categoria => {
          this.categoriaMap[categoria.id_categoria] = categoria.nombre;
        });
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }

  filtrarProductos(): void {
    const texto = this.buscarTexto.trim().toLowerCase();
    const categoriaSeleccionada = this.filtroCategoria;

    this.productos = this.productosOriginales.filter((producto) => {
      const coincideTexto = producto.nombre.toLowerCase().includes(texto);
      const coincideCategoria = categoriaSeleccionada 
        ? producto.id_categoria.toString() === categoriaSeleccionada 
        : true;

      return coincideTexto && coincideCategoria;
    });
  }

  agregarAlCarrito(producto: Producto, cantidad: number): void {
    if (cantidad <= 0 || cantidad > producto.stock) {
      console.error('Cantidad inválida o mayor al stock disponible');
      return;
    }

    this.carritoService.agregarProductoAlCarrito(producto.id_producto, cantidad).subscribe(
      () => {
        this.router.navigate(['carrito']);
      },
      (error) => {
        console.error('Error al agregar al carrito:', error);
      }
    );
  }
}
