import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from '../account-settings/account-settings.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AccountSettingsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userData: any = {};
  showEdit = false;
  private userDataSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userDataSubscription = this.authService.userData$.subscribe({
      next: (user: any) => {
        this.userData = user;
        console.log('Loaded user data in dashboard:', this.userData);
      },
      error: (err: any) => {
        console.error('Error loading user data in dashboard:', err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

  confirmDelete() {
    const confirmacion = confirm('¿Estás seguro de que querés eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (confirmacion) {
      this.deleteAccount();
    }
  }

  deleteAccount() {
    this.authService.deleteAccount().subscribe({
      next: () => {
        alert('Cuenta eliminada correctamente');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al eliminar la cuenta');
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}