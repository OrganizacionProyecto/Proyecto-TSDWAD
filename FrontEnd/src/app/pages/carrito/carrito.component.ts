import { Component, OnInit } from '@angular/core';
import { CarritoService, Carrito } from '../../../services/carrito.service';
import { AuthService } from '../services/auth.service';
import { ApiService, MetodoPago } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: Carrito = {
    direccion_envio: '',
    telefono: '',
    total: null,
    id_usuario_id: null,
    id_datos_envio_id: null,
    id_metodo_pago_id: null,
    productos: []
  };
  usuario: any;
  submitted = false;
  errorMessage = '';
  metodosPago: MetodoPago[] = [];

  constructor(private carritoService: CarritoService, private authService: AuthService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe((carrito) => {
      this.carrito = carrito;
    });
    this.usuario = this.authService.getUserData();
    this.obtenerMetodosPago();
  }

  obtenerMetodosPago() {
    this.apiService.obtenerMetodosPago().subscribe(
      (data: MetodoPago[]) => {
        this.metodosPago = data;
      },
      (error) => {
        console.error('Error al obtener métodos de pago:', error);
      }
    );
  }

  agregarProducto(idProducto: number) {
    this.carritoService.agregarProductoAlCarrito(idProducto, 1);
  }

  quitarProducto(idProducto: number) {
    this.carritoService.quitarProductoDelCarrito(idProducto, 1);
  }

  actualizarCarrito() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.carrito.direccion_envio && this.carrito.telefono && this.carrito.id_metodo_pago_id !== null) {
      this.carritoService.actualizarCarrito(this.carrito).subscribe({
        next: () => {
          // Aquí puedes agregar la lógica que quieras al actualizar el carrito, como redireccionar o mostrar un mensaje
          console.log('Carrito actualizado exitosamente');
        },
        error: (error: any) => {
          this.errorMessage = 'Ocurrió un error al actualizar el carrito. Inténtelo de nuevo.';
          console.error('Error al actualizar el carrito', error);
        }
      });
    } else {
      this.errorMessage = 'Por favor, complete todos los campos requeridos.';
    }
  }
}
