import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface PedidoResponse {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://127.0.0.1:8000/api/cart/pedido/crear/';
  private pdfUrl = 'https://aymara.pythonanywhere.com/api/cart/pedidos/';

  constructor(private http: HttpClient) {}

  crearPedido(pedidoData: any, token: string): Observable<PedidoResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<PedidoResponse>(this.apiUrl, pedidoData, { headers });
  }

  descargarPDF(pedidoId: number, token?: string): Observable<Blob> {
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
    return this.http.get(`${this.pdfUrl}${pedidoId}/factura/`, { headers, responseType: 'blob' });
  }
}