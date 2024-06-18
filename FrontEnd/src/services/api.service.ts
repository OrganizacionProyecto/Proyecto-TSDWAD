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

  agregarProductoAlCarrito(carritoId: number, idProducto: number, cantidad: number): Observable<Carrito> {
    const userId = this.getUserId();
    return this.http.post<Carrito>(`${this.carritoUrl}${carritoId}/agregar_producto/`, { idProducto, cantidad, userId });
  }
  
  quitarProductoDelCarrito(carritoId: number, idProducto: number, cantidad: number): Observable<Carrito> {
    const userId = this.getUserId();
    return this.http.post<Carrito>(`${this.carritoUrl}${carritoId}/quitar_producto/`, { idProducto, cantidad, userId });
  }

  actualizarCarrito(carrito: Carrito): Observable<Carrito> {
    return this.http.put<Carrito>(`${this.carritoUrl}${carrito.id_usuario}/`, carrito);
  }

  obtenerCarrito(): Observable<Carrito> {
    // Aquí debes ajustar el endpoint según sea necesario
    return this.http.get<Carrito>(`${this.carritoUrl}/carritos/`);
  }

  private getUserId(): number {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      return user.id; // Asegúrate de que user.id existe y es el campo correcto
    }
    throw new Error('User ID not found in localStorage');
  }
}
