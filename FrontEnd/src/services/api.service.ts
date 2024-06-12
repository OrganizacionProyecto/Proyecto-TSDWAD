import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrito } from './carrito.service';
import { Producto } from './productos.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private carritoUrl = 'http://127.0.0.1:8000/api/tablas/carritos/';
  private productoUrl = 'http://127.0.0.1:8000/api/tablas/productos/';

  constructor(private http: HttpClient) {}

  obtenerCarritos(): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(this.carritoUrl);
  }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productoUrl);
  }

  agregarProductoAlCarrito(carritoId: number, productoId: number, cantidad: number): Observable<Carrito> {
    return this.http.post<Carrito>(`${this.carritoUrl}${carritoId}/agregar_producto/`, { producto_id: productoId, cantidad });
  }
  
  quitarProductoDelCarrito(carritoId: number, productoId: number, cantidad: number): Observable<Carrito> {
    return this.http.post<Carrito>(`${this.carritoUrl}${carritoId}/quitar_producto/`, { producto_id: productoId, cantidad });
  }

  actualizarCarrito(carrito: Carrito): Observable<Carrito> {
    return this.http.put<Carrito>(`${this.carritoUrl}${carrito.id_usuario}/`, carrito);
  }
}
