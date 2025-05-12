import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit, OnDestroy {
  userData: any = {
    nombre: '',
    apellido: '',
    email: ''
  };
  private userDataSubscription: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userDataSubscription = this.authService.userData$.subscribe(data => {
      if (data) {
        this.userData = { ...data }; 
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

  updateUser() {
    this.authService.updateUser(this.userData).subscribe({
      next: () => alert('Datos actualizados correctamente'),
      error: (err) => {
        console.error(err);
        alert('Error al actualizar los datos');
      }
    });
  }
}