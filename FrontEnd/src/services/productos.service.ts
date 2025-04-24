import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  disponibilidad: number;
  imagen: string;
  id_categoria: number;
  cantidad: number;
  id_stock?: number; // Agregar stock
}

export interface Stock {
  id_stock: number;
  cantidad: number;
  id_producto: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseUrl = 'http://127.0.0.1:8000/api/tablas/productos/';
  private agregarProductosUrl = 'http://127.0.0.1:8000/api/tablas/agregar_productos/';
  private stockUrl='http://127.0.0.1:8000/api/tablas/stocks/'
  
  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  obtenerStock(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.stockUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  agregarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.agregarProductosUrl, producto)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error al obtener productos:', error);
    return throwError('Error al obtener productos. Por favor, inténtelo de nuevo más tarde.');
  }
}
