import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Producto } from './productos.service';
import { AuthService } from '../app/pages/services/auth.service';

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

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.cargarCarritoDesdeApi();
  }

  obtenerCarrito(): Observable<Producto[]> {
    return this.carrito$.pipe(map(carrito => carrito.productos || []));
  }

  actualizarCarrito(datos: Partial<Carrito>) {
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
    this.apiService.actualizarCarrito(updatedCarrito).subscribe({
      next: (carritoActualizado: Carrito) => {
        this.carritoSubject.next(carritoActualizado);
      },
      error: (error) => {
        console.error('Error al actualizar el carrito:', error);
      }
    });
  }

  agregarProductoAlCarrito(productoId: number, cantidad: number) {
    const carritoId = this.carritoSubject.value.id_usuario; // Obtener el ID del usuario actual
    if (carritoId === null) {
      console.error('Carrito ID is not available');
      return;
    }

    this.apiService.agregarProductoAlCarrito(carritoId, productoId, cantidad)
      .subscribe({
        next: (carritoActualizado: Carrito) => {
          this.carritoSubject.next(carritoActualizado);
        },
        error: (error) => {
          console.error('Error al agregar producto al carrito:', error);
        }
      });
  }

  quitarProductoDelCarrito(productoId: number, cantidad: number) {
    const carritoId = this.carritoSubject.value.id_usuario; // Obtener el ID del usuario actual
    if (carritoId === null) {
      console.error('Carrito ID is not available');
      return;
    }

    this.apiService.quitarProductoDelCarrito(carritoId, productoId, cantidad)
      .subscribe({
        next: (carritoActualizado: Carrito) => {
          this.carritoSubject.next(carritoActualizado);
        },
        error: (error) => {
          console.error('Error al quitar producto del carrito:', error);
        }
      });
  }

  cargarCarritoDesdeApi() {
    const userData = this.authService.getUserData();
    if (!userData) {
      console.error('User data is not available');
      return;
    }

    this.apiService.obtenerCarritos().subscribe({
      next: (carritos: Carrito[]) => {
        if (carritos.length > 0) {
          const userCarrito = carritos.find(carrito => carrito.id_usuario === userData.id);
          if (userCarrito) {
            this.carritoSubject.next(userCarrito);
          } else {
            console.warn('No carrito found for the user.');
          }
        }
      },
      error: (error) => {
        console.error('Error al cargar el carrito desde la API:', error);
      }
    });
  }
}
