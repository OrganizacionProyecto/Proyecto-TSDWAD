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
}
