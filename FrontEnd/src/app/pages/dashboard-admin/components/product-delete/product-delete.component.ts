import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

     @Component({
       selector: 'app-product-delete',
       standalone: true,
       imports: [MatDialogModule, MatButtonModule],
       templateUrl: './product-delete.component.html',
       styleUrls: ['./product-delete.component.scss']
     })
     export class ProductDeleteComponent {
       constructor(
         public dialogRef: MatDialogRef<ProductDeleteComponent>,
         @Inject(MAT_DIALOG_DATA) public data: { id: number }
       ) {}

       onConfirm(): void {
         this.dialogRef.close(true);
       }

       onCancel(): void {
         this.dialogRef.close(false);
       }
     }