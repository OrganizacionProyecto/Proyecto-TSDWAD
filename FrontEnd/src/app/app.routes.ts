import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
<<<<<<< HEAD
import { ProductosComponent } from './pages/productos/productos.component';
=======
>>>>>>> origin/WalterCamino
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './pages/auth/login/login/login.component';
import { RegistroComponent } from './pages/auth/registro/registro/registro.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AuthGuard } from './pages/services/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
<<<<<<< HEAD
import { CarritoComponent } from './pages/carrito/carrito.component';
=======
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { ProductFormComponent } from './pages/dashboard-admin/components/product-form/product-form.component';
>>>>>>> origin/WalterCamino

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
<<<<<<< HEAD
  { path: 'productos', component: ProductosComponent}, 
=======
>>>>>>> origin/WalterCamino
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
<<<<<<< HEAD
  { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' },
=======
  { path: 'dashboard-admin', component: DashboardAdminComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-admin/create', component: ProductFormComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-admin/edit/:id', component: ProductFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
>>>>>>> origin/WalterCamino
];