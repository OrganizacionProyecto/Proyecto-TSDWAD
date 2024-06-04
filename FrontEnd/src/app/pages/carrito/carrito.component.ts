import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarritoService, Carrito } from '../../../services/carrito.service';
import { Producto } from '../../../services/productos.service';
import { FormsModule } from '@angular/forms';

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

  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(
      (data: Carrito) => {
        this.carrito = data;
      },
      (error) => {
        console.error('Error al obtener datos del carrito:', error);
      }
    );
  }
}
