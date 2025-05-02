import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent {
  userData = {
    nombre: '',
    apellido: '',
    email: ''
  };

  constructor(private authService: AuthService) {
    this.loadUserData();
  }

  loadUserData() {
    this.authService.getUserData().subscribe({
      next: (data) => this.userData = data,
      error: (err) => console.error(err)
    });
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
