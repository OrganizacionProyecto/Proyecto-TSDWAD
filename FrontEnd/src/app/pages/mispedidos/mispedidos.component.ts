import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/mispedidos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
@Component({
  selector: 'app-mispedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './mispedidos.component.html',
  styleUrls: ['./mispedidos.component.css']
})
export class MispedidosComponent implements OnInit {
  pedidos: any[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.pedidoService.getHistorialPedidos().subscribe({
      next: (data) => {
        this.pedidos = data.map((pedido: any) => ({
          ...pedido,
          fecha_creacion: new Date(pedido.fecha_creacion)
        }));
        console.log('Pedidos cargados:', this.pedidos);
      },
      error: (err) => {
        console.error('Error al cargar pedidos:', err);
      }
    });
  }

  descargarFactura(pedidoId: number): void {
    this.pedidoService.descargarFactura(pedidoId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `factura_${pedidoId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar la factura:', err);
      }
    });
  }
}
