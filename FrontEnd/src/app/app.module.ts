import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; // Necesario para el app principal
import { FormsModule } from '@angular/forms';             // Necesario para ngModel
import { HttpClientModule } from '@angular/common/http'; // Para las peticiones HTTP
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
    ProductFormComponent
  ],
  imports: [
    BrowserModule,    // Necesario para la aplicación principal
    FormsModule,      // Necesario para la vinculación ngModel
    HttpClientModule  // Necesario para las peticiones HTTP
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
