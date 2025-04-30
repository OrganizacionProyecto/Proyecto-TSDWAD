export interface Product {
    id_producto?: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen?: string | File;
    id_categoria: number;
  }