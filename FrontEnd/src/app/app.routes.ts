import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './pages/auth/login/login/login.component';
import { RegistroComponent } from './pages/auth/registro/registro/registro.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AuthGuard } from './pages/services/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { ProductFormComponent } from './pages/dashboard-admin/components/product-form/product-form.component';
import { CarritoComponent } from './pages/carrito/carrito.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'productos', component: ProductosComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard] },
  
  // Standalone PedidoComponent
  { 
    path: 'pedido', 
    loadComponent: () => import('./pages/pedido/pedido.component').then(m => m.PedidoComponent), 
    canActivate: [AuthGuard] 
  },

  { path: 'dashboard-admin', component: DashboardAdminComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-admin/create', component: ProductFormComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-admin/edit/:id', component: ProductFormComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];
