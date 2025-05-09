import { Component, OnInit } from '@angular/core';
     import { Router, RouterModule } from '@angular/router';
     import { CommonModule } from '@angular/common';
     import { FormsModule } from '@angular/forms';
     import { AuthService } from '../../pages/services/auth.service';

     @Component({
       selector: 'app-header',
       standalone: true,
       imports: [CommonModule, FormsModule, RouterModule],
       templateUrl: './header.component.html',
       styleUrls: ['./header.component.css']
     })
     export class HeaderComponent implements OnInit {
       userData: any = {};
       searchQuery: string = '';

       constructor(public authService: AuthService, private router: Router) {}

       ngOnInit(): void {
         this.authService.getUserData().subscribe({
           next: (data) => {
             console.log('User data loaded in HeaderComponent:', data);
             this.userData = data;
           },
           error: (error) => {
             console.error('Error loading user data in HeaderComponent:', error);
             console.warn('No user data found in HeaderComponent.');
           }
         });
       }

       logout(): void {
         this.authService.logout();
         this.router.navigate(['/login']);
       }

       navigateHome(): void {
         this.router.navigate(['/home']);
       }

       navigateTo(route: string): void {
         this.router.navigate([route]);
       }

       searchProducts(): void {
         // Navega a dashboard-admin con el parámetro de búsqueda para filtrar productos
         if (this.searchQuery.trim()) {
           this.router.navigate(['/dashboard-admin'], { queryParams: { search: this.searchQuery } });
         }
       }
     }