import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private baseUrl = 'https://aymara.pythonanywhere.com/api/cart/pedido';

  constructor(private http: HttpClient) {}

  getHistorialPedidos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/historial/`);
  }

  descargarFactura(pedidoId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${pedidoId}/factura/`, { responseType: 'blob' });
  }
}
