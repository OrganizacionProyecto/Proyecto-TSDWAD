import { Component, OnInit } from '@angular/core';
     import { CommonModule } from '@angular/common';
     import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
     import { MatButtonModule } from '@angular/material/button';
     import { MatInputModule } from '@angular/material/input';
     import { MatSelectModule } from '@angular/material/select';
     import { RouterModule } from '@angular/router';
     import { ProductService } from '../../services/product.service';
     import { ActivatedRoute, Router } from '@angular/router';
     import { Product } from '../../../../core/models/product.model';

     @Component({
       selector: 'app-product-form',
       standalone: true,
       imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatSelectModule, RouterModule],
       templateUrl: './product-form.component.html',
       styleUrls: ['./product-form.component.scss']
     })
     export class ProductFormComponent implements OnInit {
       productForm: FormGroup;
       categories: { id_categoria: number; nombre: string; descripcion: string }[] = [];
       productId?: number;
       fileName = '';

       constructor(
         private fb: FormBuilder,
         private productService: ProductService,
         private route: ActivatedRoute,
         private router: Router
       ) {
         this.productForm = this.fb.group({
           nombre: ['', [Validators.required, Validators.maxLength(200)]],
           descripcion: ['', [Validators.required, Validators.maxLength(1000)]],
           precio: [0, [Validators.required, Validators.min(0)]],
           stock: [0, [Validators.required, Validators.min(0)]],
           imagen: [null],
           id_categoria: [null, Validators.required]
         });
       }

       ngOnInit(): void {
         console.log('ngOnInit ejecutado');
         this.productService.getCategories().subscribe({
           next: (categories: { id_categoria: number; nombre: string; descripcion: string }[]) => {
             console.log('Categorías recibidas:', categories);
             this.categories = categories;
           },
           error: (err: any) => console.error('Error al cargar categorías:', err)
         });

         this.productId = this.route.snapshot.params['id'];
         if (this.productId) {
           this.productService.getProduct(this.productId).subscribe({
             next: (product: Product) => {
               this.productForm.patchValue(product);
               this.fileName = typeof product.imagen === 'string' ? product.imagen.split('/').pop() || '' : '';
             },
             error: (err: any) => console.error('Error al cargar producto:', err)
           });
         }
       }

       onFileChange(event: Event): void {
         const input = event.target as HTMLInputElement;
         if (input.files && input.files.length) {
           const file = input.files[0];
           this.productForm.patchValue({ imagen: file });
           this.fileName = file.name;
         } else {
           this.productForm.patchValue({ imagen: null });
           this.fileName = '';
         }
       }

       onSubmit(): void {
         if (this.productForm.invalid) return;

         const formData = new FormData();
         Object.keys(this.productForm.value).forEach((key) => {
           if (key === 'imagen') {
             if (this.productForm.value[key] instanceof File) {
               formData.append(key, this.productForm.value[key]);
             }
           } else if (this.productForm.value[key] !== null) {
             formData.append(key, String(this.productForm.value[key]));
           }
         });

         // Depurar FormData
         const formDataDebug: { [key: string]: any } = {};
         formData.forEach((value, key) => {
           formDataDebug[key] = value;
         });
         console.log('Datos enviados:', formDataDebug);

         const request = this.productId
           ? this.productService.updateProduct(this.productId, formData)
           : this.productService.createProduct(formData);

         request.subscribe({
           next: () => this.router.navigate(['/dashboard-admin']),
           error: (err: any) => console.error('Error saving product:', err)
         });
       }
     }