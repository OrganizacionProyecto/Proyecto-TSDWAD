import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Carrito } from './carrito.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private baseUrl = 'http://127.0.0.1:8000/api/cart/carrito';

  constructor(private http: HttpClient) {}

  obtenerCarrito(): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.baseUrl}/`).pipe(
      catchError((error) => {
        console.error('Error al obtener el carrito:', error);
        return throwError('Hubo un error al obtener el carrito');
      })
    );
  }

  agregarProductoAlCarrito(producto_id: number, cantidad: number): Observable<any> {
    const payload = { producto_id, cantidad };
    return this.http.post(`${this.baseUrl}/agregar/`, payload).pipe(
      catchError((error) => {
        console.error('Error al agregar producto al carrito:', error);
        return throwError('Hubo un error al agregar el producto al carrito');
      })
    );
  }

  modificarProductoCarrito(id_producto: number, accion: 'aumentar' | 'disminuir', cantidad: number): Observable<any> {
    const payload = { accion, cantidad };
    return this.http.put(`${this.baseUrl}/modificar/${id_producto}/`, payload).pipe(
      catchError((error) => {
        console.error('Error al modificar producto en el carrito:', error);
        return throwError('Hubo un error al modificar el producto');
      })
    );
  }

  eliminarProductoDelCarrito(id_producto: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar/${id_producto}/`).pipe(
      catchError((error) => {
        console.error('Error al eliminar producto del carrito:', error);
        return throwError('Hubo un error al eliminar el producto del carrito');
      })
    );
  }
}
