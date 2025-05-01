export interface DetalleProducto {
  id_producto: number;           // necesario para modificar o eliminar
  nombre_producto: string;
  cantidad: number;
  precio_unitario: string;
  total_producto: string;
}

export interface Carrito {
  usuario?: number;
  detalles_producto: DetalleProducto[];
  total_carrito: number | string;
}
