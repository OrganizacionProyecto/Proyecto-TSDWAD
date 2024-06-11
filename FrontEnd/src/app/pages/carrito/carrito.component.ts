import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarritoService, Carrito } from '../../../services/carrito.service';
import { Producto } from '../../../services/productos.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: Carrito = {
    direccion_envio: '',
    telefono: '',
    total: null,
    id_usuario: null,
    id_datos_envio: null,
    id_metodo_pago: null,
    productos: []
  };
  usuario: any;

  constructor(private carritoService: CarritoService, private authService: AuthService) { }

  ngOnInit(): void {
    this.usuario = this.authService.getUserData();

    this.carritoService.carrito$.subscribe(
      (data: Carrito) => {
        this.carrito = data;
      },
      (error) => {
        console.error('Error al obtener datos del carrito:', error);
      }
    );

    this.carritoService.cargarCarritoDesdeApi();
  }

  actualizarCarrito() {
    this.carritoService.actualizarCarrito(this.carrito);
  }

  agregarProducto(idProducto: number) {
    this.carritoService.agregarProductoAlCarrito(idProducto, 1);
  }

  quitarProducto(idProducto: number) {
    this.carritoService.quitarProductoDelCarrito(idProducto, 1);
  }
}
