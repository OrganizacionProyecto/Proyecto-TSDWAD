import { HttpClient } from '@angular/common/http';
import { Injectable , inject} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private_http = inject(HttpClient);
}

interface Carrito {
  idProducto: number;
  cantidad: number;
  precio: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  carrito: Carrito[] = [
    {
      idProducto:1,
      cantidad: 1,
      precio: 11500,
    },
   /* {
      idProducto:2,
      cantidad: 1,
      precio: 13500,
    },
    {
      idProducto:3,
      cantidad: 1,
      precio: 12500,
    }*/
  ];

  constructor() { }

  agregarProducto(idProducto: number, cantidad:number, precio:number){
    const i = this.carrito.findIndex( (producto) => producto.idProducto === idProducto);
    if (i ===-1){
      const nuevoProducto = {idProducto:idProducto, cantidad:cantidad, precio:precio };
      this.carrito.push(nuevoProducto);
    } else{
      this.carrito[i].cantidad+=cantidad;
      this.carrito[i].precio = precio;
    }
  }

  eliminarProducto(idProducto: number){
    this.carrito = this.carrito.filter ((producto) => producto.idProducto !== idProducto);
  }

  cambiarCantidadProducto(idProducto: number, cantidad:number){
    this.carrito = this.carrito.map (producto =>{
      const productoActual = producto;
      if (productoActual.idProducto === idProducto) productoActual.cantidad = cantidad;
      return productoActual;
    })
  }

}





 

