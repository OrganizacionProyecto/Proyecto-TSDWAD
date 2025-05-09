import { Component, OnInit } from '@angular/core';
     import { CommonModule } from '@angular/common';
     import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
     import { MatButtonModule } from '@angular/material/button';
     import { MatInputModule } from '@angular/material/input';
     import { RouterModule } from '@angular/router';
     import { ProductService } from '../../services/product.service';
     import { ActivatedRoute, Router } from '@angular/router';

     @Component({
       selector: 'app-category-form',
       standalone: true,
       imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, RouterModule],
       templateUrl: './category-form.component.html',
       styleUrls: ['./category-form.component.scss']
     })
     export class CategoryFormComponent implements OnInit {
       categoryForm: FormGroup;
       categoryId?: number;

       constructor(
         private fb: FormBuilder,
         private productService: ProductService,
         private route: ActivatedRoute,
         private router: Router
       ) {
         this.categoryForm = this.fb.group({
           nombre: ['', [Validators.required, Validators.maxLength(100)]],
           descripcion: ['', [Validators.required, Validators.maxLength(500)]]
         });
       }

       ngOnInit(): void {
         this.categoryId = this.route.snapshot.params['id'];
         if (this.categoryId) {
           this.productService.getCategories().subscribe({
             next: (categories) => {
               const category = categories.find(c => c.id_categoria === this.categoryId);
               if (category) {
                 this.categoryForm.patchValue(category);
               }
             },
             error: (err: any) => console.error('Error al cargar categoría:', err)
           });
         }
       }

       onSubmit(): void {
         if (this.categoryForm.invalid) return;

         const categoryData = this.categoryForm.value;
         const request = this.categoryId
           ? this.productService.updateCategory(this.categoryId, categoryData)
           : this.productService.createCategory(categoryData);

         request.subscribe({
           next: () => this.router.navigate(['/dashboard-admin/categories']),
           error: (err: any) => console.error('Error saving category:', err)
         });
       }

       cancel(): void {
         this.router.navigate(['/dashboard-admin/categories']);
       }
     }