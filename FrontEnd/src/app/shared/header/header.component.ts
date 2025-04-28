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
    this.authService.getUserData().subscribe(
      (data) => {
        console.log('User data loaded in HeaderComponent:', data);
        this.userData = data;  // Asignar los datos correctamente
      },
      (error) => {
        console.error('Error loading user data in HeaderComponent:', error);
        console.warn('No user data found in HeaderComponent.');
      }
    );
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
