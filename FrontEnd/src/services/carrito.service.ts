import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Carrito } from './carrito.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private baseUrl = 'http://127.0.0.1:8000/api/cart/'; // Base URL para las rutas del carrito
  private pedidoUrl = `${this.baseUrl}pedido/`; // Base URL para las rutas de pedidos

  constructor(private http: HttpClient) {}

  // Obtener el carrito del usuario
  obtenerCarrito(): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.baseUrl}carrito/`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Agregar un producto al carrito
  agregarProductoAlCarrito(id_producto: number, cantidad: number): Observable<Carrito> {
    const body = { producto_id: id_producto, cantidad };
    return this.http.post<Carrito>(`${this.baseUrl}carrito/agregar/`, body, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Modificar la cantidad de un producto en el carrito
  modificarProductoCarrito(id_producto: number, cantidad: number): Observable<Carrito> {
    const body = { cantidad };
    return this.http.put<Carrito>(`${this.baseUrl}carrito/modificar/${id_producto}/`, body, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un producto del carrito
  eliminarProductoDelCarrito(id_producto: number): Observable<Carrito> {
    return this.http.delete<Carrito>(`${this.baseUrl}carrito/eliminar/${id_producto}/`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar el carrito
  actualizarCarrito(carrito: any): Observable<any> {
    return this.http.put(`${this.baseUrl}carrito/`, carrito, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Realizar un pedido
  realizarPedido(pedidoData: any): Observable<any> {
    return this.http.post<any>(`${this.pedidoUrl}crear/`, pedidoData, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Descargar factura de un pedido
  descargarFactura(pedidoId: number): Observable<Blob> {
    return this.http.get(`${this.pedidoUrl}${pedidoId}/factura/`, {
      headers: this.getAuthHeaders(),
      responseType: 'blob' // Para manejar archivos binarios
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener encabezados de autenticación
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token'); // Asegúrate de que el token esté almacenado en localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Errores del cliente
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Errores del servidor
      errorMessage = `Código de error: ${error.status}, Mensaje: ${error.message}`;
    }
    console.error('Ocurrió un error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
