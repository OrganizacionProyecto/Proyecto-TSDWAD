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

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userData = this.authService.getUserData();
    if (userData) {
      console.log('User data loaded in HeaderComponent:', userData);
      this.userData = userData; // Asigna userData correctamente
    } else {
      console.warn('No user data found in HeaderComponent.');
    }
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateHome(): void {
    this.router.navigate(['/Home']);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
