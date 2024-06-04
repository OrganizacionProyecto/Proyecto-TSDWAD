import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  disponibilidad: number;
  imagen: string;
  id_categoria: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private apiService: ApiService) {}

  obtenerProductos(): Observable<Producto[]> {
    return this.apiService.obtenerProductos();
  }
}
