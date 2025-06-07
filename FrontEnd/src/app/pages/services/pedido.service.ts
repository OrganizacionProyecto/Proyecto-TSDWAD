import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:8000/api/cart/pedido/crear/';  

  constructor(private http: HttpClient) {}

  crearPedido(pedidoData: any) {
    return this.http.post(this.apiUrl, pedidoData);
  }

  descargarPDF(pedidoId: number): Observable<Blob> {
    const url = `http://localhost:8000/api/cart/pedidos/${pedidoId}/factura/`; 
    return this.http.get(url, { responseType: 'blob' });
  }
}
  
