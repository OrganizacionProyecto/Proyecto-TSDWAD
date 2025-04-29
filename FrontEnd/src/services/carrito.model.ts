import { Producto } from './productos.model';

export interface Carrito {
  id: number;
  productos: Producto[];
  total: number;
  direccionEnvio: string;
  telefono: string;
}