import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../pages/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userData: any = {};
  isLoggedIn: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Verificamos si el token existe
    this.isLoggedIn = this.authService.isLoggedIn();

    if (!this.isLoggedIn) {
      // Si el usuario no está logueado, redirigimos al inicio
      this.router.navigate(['/']);
    } else {
      // Si el usuario está logueado, cargamos sus datos
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
  }

  logout(): void {
    this.authService.logout();  // Redirige al inicio automáticamente al hacer logout
    this.router.navigate(['/']);  // Aseguramos que si no hay token, el usuario va al inicio
  }

  navigateHome(): void {
    this.router.navigate(['/Home']);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
