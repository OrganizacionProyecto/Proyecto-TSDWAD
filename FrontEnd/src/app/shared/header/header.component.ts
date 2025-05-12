import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../pages/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';  

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userData$: Observable<any> | undefined; // Usar el Observable del servicio
  isLoggedIn: boolean = false;
  private authStatusSubscription: Subscription | undefined;
  searchQuery: string = '';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userData$ = this.authService.userData$; // Suscribirse al Observable

    this.authStatusSubscription = this.authService.authStatus$.subscribe(status => {
      this.isLoggedIn = status;
      if (this.isLoggedIn && !this.userData$) {
        this.userData$ = this.authService.userData$; // Volver a suscribir si el estado cambia
      } else if (!this.isLoggedIn) {
        this.userData$ = undefined; // Limpiar userData$ al cerrar sesión
      }
    });

    if (!this.isLoggedIn) {
      this.router.navigate(['/']);
    }
    // Ya no necesitamos llamar getUserData directamente aquí, el Observable lo maneja
  }

  ngOnDestroy(): void {
    if (this.authStatusSubscription) {
      this.authStatusSubscription.unsubscribe();
    }
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