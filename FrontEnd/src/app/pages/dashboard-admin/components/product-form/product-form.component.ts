import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  categories: any[] = [];
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
    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  
    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this.productService.getProduct(this.productId).subscribe((product) => {
        this.productForm.patchValue(product);
        // Verificar si imagen es string antes de usar split
        this.fileName = typeof product.imagen === 'string' ? product.imagen.split('/').pop() || '' : '';
      });
    }
  }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.productForm.patchValue({ imagen: file });
      this.fileName = file.name;
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const formData = new FormData();
    Object.keys(this.productForm.value).forEach((key) => {
      if (key === 'imagen' && this.productForm.value[key]) {
        formData.append(key, this.productForm.value[key]);
      } else if (this.productForm.value[key] !== null) {
        formData.append(key, this.productForm.value[key]);
      }
    });

    const request = this.productId
      ? this.productService.updateProduct(this.productId, formData)
      : this.productService.createProduct(formData);

    request.subscribe({
      next: () => this.router.navigate(['/dashboard-admin']),
      error: (err) => console.error('Error saving product:', err)
    });
  }
}