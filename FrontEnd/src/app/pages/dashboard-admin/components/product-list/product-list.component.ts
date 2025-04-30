import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../../core/models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
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
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((search) => {
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