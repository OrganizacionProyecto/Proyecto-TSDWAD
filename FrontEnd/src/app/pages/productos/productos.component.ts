import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CarritoService } from '../../../services/api.service';
import { CarritoComponent } from '../carrito/carrito.component';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit{
    idProducto: number = 1; // Valor de ejemplo (cambia según tus necesidades)
    cantidad: number = 1;
    precio: number = 11500;
    nombre: string= "Aceite de coco organico";
  
  constructor(
    private carritoService: CarritoService, // Inyecta el servicio CarritoService
    private router: Router // Inyecta el Router
  ) {}

  ngOnInit(): void {
    // Lógica de inicialización (si es necesario)
  }
  

  agregarAlCarrito(){
    if (!this.idProducto) return;
    this.carritoService.agregarProducto(this.idProducto,this.cantidad, this.precio, this.nombre);
    this.router.navigate (["carrito"]);
  }



}
