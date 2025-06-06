import { Component, Inject } from '@angular/core';
     import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
     import { MatButtonModule } from '@angular/material/button';

     @Component({
       selector: 'app-confirm-delete-dialog',
       standalone: true,
       imports: [MatDialogModule, MatButtonModule],
       template: `
         <div class="container">
           <h2>Confirmar Eliminación</h2>
           <p>¿Estás seguro de que deseas eliminar {{ data.entityName }}?</p>
           <div class="actions">
             <button mat-raised-button color="warn" (click)="onConfirm()">Eliminar</button>
             <button mat-raised-button (click)="onCancel()">Cancelar</button>
           </div>
         </div>
       `,
       styleUrls: ['./confirm-delete-dialog.component.scss']
     })
     export class ConfirmDeleteDialogComponent {
       constructor(
         public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
         @Inject(MAT_DIALOG_DATA) public data: { entityName: string }
       ) {}

       onConfirm(): void {
         this.dialogRef.close(true);
       }

       onCancel(): void {
         this.dialogRef.close(false);
       }
     }