import { Component } from '@angular/core';
     import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
     import { MatButtonModule } from '@angular/material/button';

     @Component({
       selector: 'app-confirm-delete-dialog',
       standalone: true,
       imports: [MatDialogModule, MatButtonModule],
       template: `
         <h2 mat-dialog-title>Confirmar Eliminación</h2>
         <mat-dialog-content>
           ¿Estás seguro de que deseas eliminar esta categoría?
         </mat-dialog-content>
         <mat-dialog-actions>
           <button mat-button (click)="onCancel()">Cancelar</button>
           <button mat-raised-button color="warn" (click)="onConfirm()">Eliminar</button>
         </mat-dialog-actions>
       `
     })
     export class ConfirmDeleteDialogComponent {
       constructor(public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>) {}

       onConfirm(): void {
         this.dialogRef.close(true);
       }

       onCancel(): void {
         this.dialogRef.close(false);
       }
     }