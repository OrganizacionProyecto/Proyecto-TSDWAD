import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductListComponent],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  userData: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUserData().subscribe({
      next: (data) => {
        this.userData = data;
        console.log('Datos del usuario cargados:', data);
      },
      error: (err) => console.error('Error al cargar datos del usuario:', err)
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/dashboard-admin/create']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}