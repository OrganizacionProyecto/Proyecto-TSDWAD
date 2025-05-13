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
  menuOpen: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userData$ = this.authService.userData$;

    this.authStatusSubscription = this.authService.authStatus$.subscribe(status => {
      this.isLoggedIn = status;
      if (this.isLoggedIn && !this.userData$) {
        this.userData$ = this.authService.userData$;
      } else if (!this.isLoggedIn) {
        this.userData$ = undefined;
      }
    });

    if (!this.isLoggedIn) {
      this.router.navigate(['/']);
    }
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
    if (this.searchQuery.trim()) {
      this.router.navigate(['/dashboard-admin'], { queryParams: { search: this.searchQuery } });
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
