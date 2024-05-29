import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../../services/api.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})

export class CarritoComponent implements OnInit {
  productosEnCarrito: Carrito[] = []; 

  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.productosEnCarrito = this.carritoService.carrito;
  }
}


export interface Carrito {
  idProducto: number,
  cantidad: number,
  precio: number
  
}