import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { PedidoComponent } from './pages/pedido/pedido.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login/login.component';
import { RegistroComponent } from './pages/auth/registro/registro/registro.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { ProductFormComponent } from './pages/dashboard-admin/components/product-form/product-form.component';
import { MispedidosComponent } from './pages/mispedidos/mispedidos.component';

@NgModule({
  declarations: [
    AppComponent,
    CarritoComponent,
    ProductosComponent,
    PedidoComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    ContactoComponent,
    DashboardComponent,
    DashboardAdminComponent,
    ProductFormComponent,
    MispedidosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule  // Asegúrate de que CommonModule esté aquí
  ],
  providers: [DatePipe],  // Agregar DatePipe aquí
  bootstrap: [AppComponent]
})
export class AppModule {}
