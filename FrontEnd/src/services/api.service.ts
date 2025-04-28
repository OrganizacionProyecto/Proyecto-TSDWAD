import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Carrito } from './carrito.service';
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
  private carritoUrl = 'http://127.0.0.1:8000/api/tablas/carritos/';
  private productoUrl = 'http://127.0.0.1:8000/api/tablas/productos/';
  private usuarioUrl = 'http://127.0.0.1:8000/api/auth/user/';
  private agregarProductosUrl = 'http://127.0.0.1:8000/api/tablas/agregar_productos/';
  private metodosPagoUrl = 'http://127.0.0.1:8000/api/tablas/metodos_pago/';
  private csrfTokenUrl = 'http://127.0.0.1:8000/api/auth/get_csrf_token/';
  private datosEnvioUrl = 'http://127.0.0.1:8000/api/tablas/datos_envio/';

  constructor(private http: HttpClient) {}

  obtenerCarritos(): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(this.carritoUrl).pipe(
      catchError(this.handleError)
    );
  }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productoUrl).pipe(
      catchError(this.handleError)
    );
  }

  obtenerUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(this.usuarioUrl).pipe(
      catchError(this.handleError)
    );
  }

  agregarProductoAlCarrito(carritoId: number, idProducto: number, cantidad: number): Observable<Carrito> {
    return this.http.post<Carrito>(`${this.carritoUrl}${carritoId}/agregar_producto/`, { idProducto, cantidad }).pipe(
      catchError(this.handleError)
    );
  }

  quitarProductoDelCarrito(carritoId: number, idProducto: number, cantidad: number): Observable<Carrito> {
    return this.http.post<Carrito>(`${this.carritoUrl}${carritoId}/quitar_producto/`, { idProducto, cantidad }).pipe(
      catchError(this.handleError)
    );
  }

  actualizarCarrito(carrito: Carrito): Observable<Carrito> {
    return this.http.put<Carrito>(`${this.carritoUrl}${carrito.id_usuario_id}/`, carrito).pipe(
      catchError(this.handleError)
    );
  }

  obtenerCarrito(): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.carritoUrl}/carritos/`).pipe(
      catchError(this.handleError)
    );
  }

  agregarProductos(productoData: any): Observable<any> {
    return this.http.post<any>(this.agregarProductosUrl, productoData).pipe(
      catchError(this.handleError)
    );
  }

  obtenerMetodosPago(): Observable<MetodoPago[]> {
    return this.http.get<MetodoPago[]>(this.metodosPagoUrl).pipe(
      catchError(this.handleError)
    );
  }

  obtenerCsrfToken(): Observable<{ csrfToken: string }> {
    return this.http.get<{ csrfToken: string }>(this.csrfTokenUrl).pipe(
      catchError(this.handleError)
    );
  }

  obtenerDatosEnvio(): Observable<any> {
    return this.http.get<any>(this.datosEnvioUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
