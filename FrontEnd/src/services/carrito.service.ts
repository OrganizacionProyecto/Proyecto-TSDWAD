import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Producto } from './productos.service';

export interface Carrito {
  direccion_envio: string;
  telefono: string;
  total: number | null;
  id_usuario: number | null;
  id_datos_envio: number | null;
  id_metodo_pago: number | null;
  productos?: Producto[];
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private carritoSubject: BehaviorSubject<Carrito> = new BehaviorSubject<Carrito>({
    direccion_envio: '',
    telefono: '',
    total: null,
    id_usuario: null,
    id_datos_envio: null,
    id_metodo_pago: null,
    productos: []
  });
  carrito$ = this.carritoSubject.asObservable();

  constructor(private apiService: ApiService) {}

  obtenerCarrito(): Observable<Producto[]> {
    return this.carrito$.pipe(map(carrito => carrito.productos || []));
  }

  actualizarCarrito(datos: Partial<Carrito>) {
    const currentCarrito = this.carritoSubject.value;
    this.carritoSubject.next({ ...currentCarrito, ...datos });
  }

  agregarProducto(producto: Producto) {
    const currentCarrito = this.carritoSubject.value;
    const productos = currentCarrito.productos || [];
    const productoExistente = productos.find(p => p.idProducto === producto.idProducto);

    if (productoExistente) {
      productoExistente.cantidad += producto.cantidad;
    } else {
      productos.push(producto);
    }

    const nuevoTotal = productos.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);

    this.carritoSubject.next({ ...currentCarrito, productos, total: nuevoTotal });
  }

  cargarCarritoDesdeApi() {
    this.apiService.obtenerCarritos().subscribe((carritos: Carrito[]) => {
      if (carritos.length > 0) {
        this.carritoSubject.next(carritos[0]);
      }
    });
  }
}
