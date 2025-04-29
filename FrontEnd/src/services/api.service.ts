import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Carrito } from './carrito.model';  // Importa desde el archivo correcto
import { Producto } from './productos.service';

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  user_type: string;
}

export interface MetodoPago {
  id_metodo_pago: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  // Endpoints agrupados
  private carritoUrl = `${this.baseUrl}/cart/`;
  private pedidoUrl = `${this.baseUrl}/cart/pedido/`;
  private productosUrl = `${this.baseUrl}/products/`;
  private categoriasUrl = `${this.baseUrl}/products/categorias/`;
  private favoritosUrl = `${this.baseUrl}/products/favoritos/`;
  private usuarioUrl = `${this.baseUrl}/users/`;
  private csrfTokenUrl = `${this.baseUrl}/auth/get_csrf_token/`;
  private authUrl = `${this.baseUrl}/auth/token/`;  // Ruta para obtener el token JWT

  constructor(private http: HttpClient) {}

  // --------- Carrito ----------
  obtenerCarrito(): Observable<Carrito> {
    return this.http.get<Carrito>(this.carritoUrl).pipe(
      catchError(this.handleError)
    );
  }

  agregarProductoAlCarrito(productoId: number, cantidad: number): Observable<Carrito> {
    return this.http.post<Carrito>(`${this.carritoUrl}agregar/`, { producto_id: productoId, cantidad }).pipe(
      catchError(this.handleError)
    );
  }

  modificarProductoCarrito(productoId: number, cantidad: number): Observable<Carrito> {
    return this.http.put<Carrito>(`${this.carritoUrl}modificar/${productoId}/`, { cantidad }).pipe(
      catchError(this.handleError)
    );
  }

  eliminarProductoDelCarrito(productoId: number): Observable<Carrito> {
    return this.http.delete<Carrito>(`${this.carritoUrl}eliminar/${productoId}/`).pipe(
      catchError(this.handleError)
    );
  }

  // --------- Pedido ----------
  realizarPedido(pedidoData: any): Observable<any> {
    return this.http.post<any>(`${this.pedidoUrl}crear/`, pedidoData).pipe(
      catchError(this.handleError)
    );
  }

  descargarFactura(pedidoId: number): Observable<Blob> {
    return this.http.get(`${this.pedidoUrl}${pedidoId}/factura/`, { responseType: 'blob' }).pipe(
      catchError(this.handleError)
    );
  }

  // --------- Productos ----------
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productosUrl).pipe(
      catchError(this.handleError)
    );
  }

  obtenerProductoDetalle(productoId: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.productosUrl}${productoId}/`).pipe(
      catchError(this.handleError)
    );
  }

  agregarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.productosUrl, producto).pipe(
      catchError(this.handleError)
    );
  }

  // --------- Categorías ----------
  obtenerCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.categoriasUrl).pipe(
      catchError(this.handleError)
    );
  }

  // --------- Favoritos ----------
  obtenerFavoritos(): Observable<any[]> {
    return this.http.get<any[]>(this.favoritosUrl).pipe(
      catchError(this.handleError)
    );
  }

  agregarFavorito(favoritoData: any): Observable<any> {
    return this.http.post<any>(this.favoritosUrl, favoritoData).pipe(
      catchError(this.handleError)
    );
  }

  eliminarFavorito(favoritoId: number): Observable<any> {
    return this.http.delete<any>(`${this.favoritosUrl}${favoritoId}/`).pipe(
      catchError(this.handleError)
    );
  }

  // --------- Usuario ----------
  obtenerUsuario(): Observable<User> {
    return this.http.get<User>(this.usuarioUrl).pipe(
      catchError(this.handleError)
    );
  }

  // --------- CSRF Token ----------
  obtenerCsrfToken(): Observable<{ csrfToken: string }> {
    return this.http.get<{ csrfToken: string }>(this.csrfTokenUrl).pipe(
      catchError(this.handleError)
    );
  }

  // --------- Autenticación (JWT) ----------
  obtenerToken(usuarioData: any): Observable<any> {
    return this.http.post<any>(this.authUrl, usuarioData).pipe(
      catchError(this.handleError)
    );
  }

  // --------- Error handling ----------
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error(error.message || 'Error desconocido'));
  }
}
