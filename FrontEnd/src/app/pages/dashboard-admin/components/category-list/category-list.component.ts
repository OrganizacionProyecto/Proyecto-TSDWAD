import { Component, OnInit } from '@angular/core';
     import { CommonModule } from '@angular/common';
     import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
     import { MatDialog, MatDialogModule } from '@angular/material/dialog';
     import { MatTableModule } from '@angular/material/table';
     import { MatButtonModule } from '@angular/material/button';
     import { MatInputModule } from '@angular/material/input';
     import { MatIconModule } from '@angular/material/icon';
     import { Router, RouterModule } from '@angular/router';
     import { ProductService } from '../../services/product.service';
     import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
     import { debounceTime } from 'rxjs/operators';

     @Component({
       selector: 'app-category-list',
       standalone: true,
       imports: [
         CommonModule,
         FormsModule,
         ReactiveFormsModule,
         MatDialogModule,
         MatTableModule,
         MatButtonModule,
         MatInputModule,
         MatIconModule,
         RouterModule,
         ConfirmDeleteDialogComponent
       ],
       templateUrl: './category-list.component.html',
       styleUrls: ['./category-list.component.scss']
     })
     export class CategoryListComponent implements OnInit {
       categories: { id_categoria: number; nombre: string; descripcion: string }[] = [];
       displayedColumns: string[] = ['id_categoria', 'nombre', 'descripcion', 'actions'];
       searchControl = new FormControl('');

       constructor(
         private productService: ProductService,
         private dialog: MatDialog,
         private router: Router
       ) {}

       ngOnInit(): void {
         this.loadCategories();
         this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((search: string | null) => {
           this.loadCategories(search || undefined);
         });
       }

       loadCategories(search?: string): void {
         this.productService.getCategories().subscribe({
           next: (categories) => {
             this.categories = search
               ? categories.filter(c => c.nombre.toLowerCase().includes(search.toLowerCase()))
               : categories;
             console.log('Categorías cargadas:', categories);
           },
           error: (err: any) => console.error('Error loading categories:', err)
         });
       }

       editCategory(id: number): void {
         this.router.navigate([`/dashboard-admin/categories/edit/${id}`]);
       }

       deleteCategory(id: number): void {
         const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
           data: { id }
         });
         dialogRef.afterClosed().subscribe((result) => {
           if (result) {
             this.productService.deleteCategory(id).subscribe({
               next: () => this.loadCategories(),
               error: (err: any) => console.error('Error deleting category:', err)
             });
           }
         });
       }
     }