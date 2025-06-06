import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Producto {
  id_producto: number;  
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;  
  imagen: string;
  id_categoria: number;
  cantidad: number;
}

export interface Categoria {
  id_categoria: number;
  nombre: string;
}

export interface Favorito {
  id: number;
  usuario: string; 
  producto: Producto;
  fecha_agregado: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseUrl = 'http://127.0.0.1:8000/api/products/productos/';  
  private categoriasUrl = 'http://127.0.0.1:8000/api/products/categorias/';  
  private favoritosUrl = 'http://127.0.0.1:8000/api/products/favoritos/';  

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  obtenerProductos(id_categoria?: number): Observable<Producto[]> {
    let url = this.baseUrl;
    if (id_categoria) {
      url += `?id_categoria=${id_categoria}`;  // Filtrar productos por categoría
    }
    return this.http.get<Producto[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener un producto específico por su id
  obtenerProductoDetalle(productoId: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}${productoId}/`).pipe(
      catchError(this.handleError)
    );
  }

  // Crear un nuevo producto
  agregarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.baseUrl, producto).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener todas las categorías
  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriasUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener los favoritos del usuario
  obtenerFavoritos(): Observable<Favorito[]> {
    return this.http.get<Favorito[]>(this.favoritosUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Agregar un producto a favoritos
  agregarAFavoritos(productoId: number): Observable<Favorito> {
    return this.http.post<Favorito>(this.favoritosUrl, { producto_id: productoId }).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un favorito
  eliminarFavorito(favoritoId: number): Observable<any> {
    return this.http.delete(`${this.favoritosUrl}${favoritoId}/`).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error(error.message || 'Error desconocido'));
  }
}
