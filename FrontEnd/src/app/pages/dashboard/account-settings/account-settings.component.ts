import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userDataSubscription = this.authService.userData$.subscribe(data => {
      if (data) {
        this.userData = { ...data }; // Actualiza el objeto para detección de cambios
      }
    });

    // Ya no es necesario hacer una petición única aquí, se confía en el BehaviorSubject
    // this.loadUserData();
  }

  ngOnDestroy(): void {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

  // Este método ya no es necesario, la suscripción en ngOnInit se encarga de cargar los datos
  // loadUserData() {
  //   this.authService.userData$.subscribe(data => {
  //     if (data) {
  //       this.userData = data;
  //     } else {
  //       this.authService.getUserData().subscribe({
  //         next: (userData) => this.userData = userData,
  //         error: (err) => console.error(err)
  //       });
  //     }
  //   });
  // }

  updateUser() {
    this.authService.updateUser(this.userData).subscribe({
      next: () => alert('Datos actualizados correctamente'),
      error: (err) => {
        console.error(err);
        alert('Error al actualizar los datos');
      }
    });
  }

  deleteAccount() {
    this.authService.deleteAccount().subscribe({
      next: () => alert('Cuenta eliminada correctamente'),
      error: (err) => {
        console.error(err);
        alert('Error al eliminar la cuenta');
      }
    });
  }
}