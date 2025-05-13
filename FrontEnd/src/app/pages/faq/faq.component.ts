import { Component } from '@angular/core';
     import { CommonModule } from '@angular/common';
     import { MatExpansionModule } from '@angular/material/expansion';
     import { MatCardModule } from '@angular/material/card';

     @Component({
       selector: 'app-faq',
       standalone: true,
       imports: [CommonModule, MatExpansionModule, MatCardModule],
       templateUrl: './faq.component.html',
       styleUrls: ['./faq.component.scss']
     })
     export class FaqComponent {
       panelOpenState = false;
     }