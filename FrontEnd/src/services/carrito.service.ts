import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrito } from './carrito.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private baseUrl = 'http://127.0.0.1:8000/api/cart/carrito';

  constructor(private http: HttpClient) {}

  obtenerCarrito(): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.baseUrl}/`);
  }

  agregarProductoAlCarrito(producto_id: number, cantidad: number): Observable<any> {
    const payload = { producto_id, cantidad }; 
    return this.http.post(`${this.baseUrl}/agregar/`, payload);
  }
  

  modificarProductoCarrito(id_producto: number, cantidad: number): Observable<any> {
    const payload = { cantidad };
    return this.http.put(`${this.baseUrl}/modificar/${id_producto}/`, payload);
  }

  eliminarProductoDelCarrito(id_producto: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar/${id_producto}/`);
  }
}
