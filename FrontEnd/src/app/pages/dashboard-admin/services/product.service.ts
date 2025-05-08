import { Injectable } from '@angular/core';
     import { HttpClient, HttpHeaders } from '@angular/common/http';
     import { Observable } from 'rxjs';
     import { Product } from '../../../core/models/product.model';
     import { environment } from '../../../../environments/environment';
     import { AuthService } from '../../services/auth.service';

     @Injectable({
       providedIn: 'root'
     })
     export class ProductService {
       private apiUrl = `${environment.apiUrl}/api/products/productos/`;

       constructor(private http: HttpClient, private authService: AuthService) {}

       private getHeaders(): HttpHeaders {
         const token = this.authService.getAccessToken();
         return new HttpHeaders({
           Authorization: `Bearer ${token}`
         });
       }

       getProducts(search?: string): Observable<Product[]> {
         const url = search ? `${this.apiUrl}?search=${search}` : this.apiUrl;
         return this.http.get<Product[]>(url, { headers: this.getHeaders() });
       }

       getProduct(id: number): Observable<Product> {
         return this.http.get<Product>(`${this.apiUrl}${id}/`, { headers: this.getHeaders() });
       }

       createProduct(product: FormData): Observable<Product> {
         return this.http.post<Product>(this.apiUrl, product, { headers: this.getHeaders() });
       }

       updateProduct(id: number, product: FormData): Observable<Product> {
         return this.http.put<Product>(`${this.apiUrl}${id}/`, product, { headers: this.getHeaders() });
       }

       deleteProduct(id: number): Observable<void> {
         return this.http.delete<void>(`${this.apiUrl}${id}/`, { headers: this.getHeaders() });
       }

       getCategories(): Observable<any[]> {
         return this.http.get<any[]>(`${environment.apiUrl}/api/products/categorias/`, { headers: this.getHeaders() });
       }
     }