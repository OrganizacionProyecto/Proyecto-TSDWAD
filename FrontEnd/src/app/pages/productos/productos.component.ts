import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../../services/carrito.service';
import { ProductoService, Producto, Categoria, Favorito } from '../../../services/productos.service';
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
  favoritos: Favorito[] = [];
  favoritoPorProductoId: { [key: number]: number } = {};
  loading: boolean = true;
  buscarTexto: string = '';
  criterioSeleccionado: string = '0';
  filtroCategoria: string = '';

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
    this.obtenerFavoritos();
    // if (this.authService.isLoggedIn()) {
    // this.obtenerFavoritos();
  // }
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

  obtenerFavoritos(): void {
  this.productoService.obtenerFavoritos().subscribe(
    (favoritos) => {
      this.favoritoPorProductoId = {};
      favoritos.forEach(f => {
        this.favoritoPorProductoId[f.producto.id_producto] = f.id;
      });
    },
    (error) => {
      console.error('Error al obtener favoritos:', error);
    }
  );
}

esFavorito(productoId: number): boolean {
  return productoId in this.favoritoPorProductoId;
}

toggleFavorito(producto: Producto): void {
  if (this.esFavorito(producto.id_producto)) {
    console.log('Intentando eliminar favorito:', producto.id_producto, this.favoritoPorProductoId);
    this.productoService.eliminarFavorito(producto.id_producto).subscribe(
      () => {
        this.obtenerFavoritos();
      },
      (error) => {
        if (error.status === 404) {
          this.obtenerFavoritos();
        }
        console.error('Error al eliminar favorito:', error);
      }
    );
  } else {
    // Agregar a favoritos
    this.productoService.agregarAFavoritos(producto.id_producto).subscribe(
      (nuevoFavorito: Favorito) => {
        this.favoritoPorProductoId[nuevoFavorito.producto.id_producto] = nuevoFavorito.id;
        this.obtenerFavoritos();
      },
      (error) => console.error('Error al agregar a favoritos:', error)
    );
  }
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