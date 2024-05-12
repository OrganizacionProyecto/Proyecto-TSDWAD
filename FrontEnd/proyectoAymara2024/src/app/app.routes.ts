import { Routes } from '@angular/router';
import path from 'node:path';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "products", component: ProductsComponent },
    { path: "products/:id", component: ProductDetailComponent },
    { path: "contact", component: ContactComponent },
    { path:"login", component: LoginComponent},
    { path: "**", redirectTo: "", pathMatch: 'full' }
];