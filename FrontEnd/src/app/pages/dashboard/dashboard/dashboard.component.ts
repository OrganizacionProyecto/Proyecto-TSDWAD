import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }
  
  loadUserData(): void {
    this.userData = this.authService.getUserData();
    if (!this.userData) {
      console.warn('No user data found in localStorage.');
    } else {
      console.log('Loaded user data in dashboard:', this.userData);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
