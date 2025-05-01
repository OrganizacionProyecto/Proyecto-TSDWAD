import { Component, OnInit } from '@angular/core';
     import { CommonModule } from '@angular/common';
     import { Router } from '@angular/router';
     import { AuthService } from '../../pages/services/auth.service';
     import { ProductListComponent } from './components/product-list/product-list.component';

     @Component({
       selector: 'app-dashboard-admin',
       standalone: true,
       imports: [CommonModule, ProductListComponent],
       templateUrl: './dashboard-admin.component.html',
       styleUrls: ['./dashboard-admin.component.scss']
     })
     export class DashboardAdminComponent implements OnInit {
       userData: any = {};

       constructor(private authService: AuthService, private router: Router) {}

       ngOnInit(): void {
         if (!this.authService.isAdmin()) {
           this.router.navigate(['/Home']);
           return;
         }

         this.authService.getUserData().subscribe({
           next: (data) => {
             console.log('User data loaded in DashboardAdmin:', data);
             this.userData = data;
           },
           error: (error) => {
             console.error('Error loading user data:', error);
           }
         });
       }

       logout(): void {
         this.authService.logout();
         this.router.navigate(['/login']);
       }

       navigateToCreate(): void {
         this.router.navigate(['/dashboard-admin/create']);
       }
     }