import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Producto } from './productos.service'; 
import { AuthService } from '../app/pages/services/auth.service';

export interface Carrito {
  direccion_envio: string;
  telefono: string;
  total: number | null;
  id_usuario_id: number | null;
  id_datos_envio_id: number | null;
  id_metodo_pago_id: number | null;
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
    id_usuario_id: null,
    id_datos_envio_id: null,
    id_metodo_pago_id: null,
    productos: []
  });
  carrito$ = this.carritoSubject.asObservable();

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.cargarCarritoDesdeApi();
  }

  obtenerCarrito(): Observable<Producto[]> {
    return this.carrito$.pipe(map(carrito => carrito.productos || []));
  }

  actualizarCarrito(datos: Partial<Carrito>): Observable<Carrito> {
    const currentCarrito = this.carritoSubject.value;
    const updatedCarrito = {
      ...currentCarrito,
      ...datos,
      productos: [
        ...(currentCarrito.productos || []),
        ...(datos.productos || [])
      ]
    };
    this.carritoSubject.next(updatedCarrito);

    if (updatedCarrito.id_usuario_id !== null) {
      return this.apiService.actualizarCarrito(updatedCarrito).pipe(
        map((carritoActualizado: Carrito) => {
          this.carritoSubject.next(carritoActualizado);
          return carritoActualizado;
        }),
        catchError((error) => {
          console.error('Error al actualizar el carrito:', error);
          throw error;
        })
      );
    } else {
      console.error('No se puede actualizar el carrito sin un ID de usuario.');
      return new Observable<Carrito>((observer) => {
        observer.error('No se puede actualizar el carrito sin un ID de usuario.');
      });
    }
  }
  agregarProductoAlCarrito(idProducto: number, cantidad: number): void {
    const carritoId = this.carritoSubject.value.id_usuario_id;
    if (carritoId === null) {
      console.error('Carrito ID is not available');
      return;
    }

    this.apiService.agregarProductoAlCarrito(carritoId, idProducto, cantidad)
      .subscribe({
        next: (carritoActualizado: Carrito) => {
          this.carritoSubject.next(carritoActualizado);
        },
        error: (error) => {
          console.error('Error al agregar producto al carrito:', error);
        }
      });
  }

  quitarProductoDelCarrito(idProducto: number, cantidad: number) {
    const carritoId = this.carritoSubject.value.id_usuario_id;
    if (carritoId === null) {
      console.error('Carrito ID is not available');
      return;
    }

    this.apiService.quitarProductoDelCarrito(carritoId, idProducto, cantidad)
      .subscribe({
        next: (carritoActualizado: Carrito) => {
          this.actualizarTotalCarrito(carritoActualizado);
          this.carritoSubject.next(carritoActualizado);
        },
        error: (error) => {
          console.error('Error al quitar producto del carrito:', error);
        }
      });
  }

  actualizarTotalCarrito(carrito: Carrito) {
    const total = carrito.productos?.reduce((sum, producto) => sum + (producto.precio * (producto.cantidad || 0)), 0) || 0;
    carrito.total = total;
  }

  cargarCarritoDesdeApi() {
    const userData = this.authService.getUserData();
    console.log('Datos del usuario:', userData);
    if (!userData || !userData.id) {
      console.error('User data is not available');
      return;
    }

    this.apiService.obtenerCarritos().subscribe({
      next: (carritos: Carrito[]) => {
        const userCarrito = carritos.find(carrito => carrito.id_usuario_id === userData.id);
        if (userCarrito) {
          this.carritoSubject.next(userCarrito);
        } else {
          console.warn('No carrito found for the user.');
        }
      },
      error: (error) => {
        console.error('Error al cargar el carrito desde la API:', error);
      }
    });
  }
}

