import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule

import { AppComponent } from './app.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ProductosComponent } from './pages/productos/productos.component';

@NgModule({
  declarations: [
    AppComponent,
    CarritoComponent, // Declara el componente aquí
    ProductosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule // Asegúrate de importar CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

