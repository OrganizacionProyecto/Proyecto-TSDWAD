import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from '../account-settings/account-settings.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AccountSettingsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: any = {};
  showEdit = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }
  
  loadUserData(): void {
    this.authService.getUserData().subscribe({
      next: (user) => {
        this.userData = user;
        console.log('Loaded user data in dashboard:', this.userData);
      },
      error: (err) => {
        console.error('Error loading user data in dashboard:', err);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
    deleteAccount(): void {
      if (confirm('¿Esta seguro de que desea eliminar su cuenta?')) {
        this.authService.deleteAccount().subscribe({
          next: () => {
            alert('Cuenta eliminada correctamente');
            this.logout();
          },
          error: (err) => {
            console.error('Error al eliminar cuenta:', err);
            alert('Ocurrió un error al intentar eliminar la cuenta.');
          }
        });
      }
    }
  }