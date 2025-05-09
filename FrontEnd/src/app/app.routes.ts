import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './pages/auth/login/login/login.component';
import { RegistroComponent } from './pages/auth/registro/registro/registro.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AuthGuard } from './pages/services/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { ProductFormComponent } from './pages/dashboard-admin/components/product-form/product-form.component';
import { ProductListComponent } from './pages/dashboard-admin/components/product-list/product-list.component';
import { CategoryFormComponent } from './pages/dashboard-admin/components/category-form/category-form.component';
import { CategoryListComponent } from './pages/dashboard-admin/components/category-list/category-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard-admin',
    component: DashboardAdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ProductListComponent },
      { path: 'create', component: ProductFormComponent },
      { path: 'edit/:id', component: ProductFormComponent },
      { path: 'categories', component: CategoryListComponent },
      { path: 'categories/create', component: CategoryFormComponent },
      { path: 'categories/edit/:id', component: CategoryFormComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];