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
import { Product } from '../../../../core/models/product.model';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
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
    ProductDeleteComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['id_producto', 'nombre', 'precio', 'stock', 'id_categoria', 'actions'];
  searchControl = new FormControl('');

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((search: string | null) => {
      this.loadProducts(search || undefined);
    });
  }

  loadProducts(search?: string): void {
    this.productService.getProducts(search).subscribe({
      next: (products) => (this.products = products),
      error: (err) => console.error('Error loading products:', err)
    });
  }

  editProduct(id: number): void {
    this.router.navigate([`/dashboard-admin/edit/${id}`]);
  }

  deleteProduct(id: number): void {
    const dialogRef = this.dialog.open(ProductDeleteComponent, {
      data: { id }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.deleteProduct(id).subscribe({
          next: () => this.loadProducts(),
          error: (err) => console.error('Error deleting product:', err)
        });
      }
    });
  }
}