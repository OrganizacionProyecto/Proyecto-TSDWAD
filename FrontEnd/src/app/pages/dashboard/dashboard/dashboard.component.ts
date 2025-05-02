import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // IMPORTANTE

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: any = {};

  constructor(
    private userService: UserService,
    private authService: AuthService, // INYECTAR EL SERVICIO
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.loadUserData().subscribe({
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
  }
}
