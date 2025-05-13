export interface DetalleProducto {
  id_producto: number;           
  nombre_producto: string;
  cantidad: number;              
  precio_unitario: number;       
  total_producto?: number;  
}

export interface Carrito {
  usuario?: number;
  detalles_producto: DetalleProducto[];
  total_carrito: number;  
}
