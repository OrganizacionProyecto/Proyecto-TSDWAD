import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.authService.login(formData).subscribe({
        next: () => {
          this.authService.getUserData().subscribe({
            next: (user) => {
              console.log('Datos del usuario:', user);
              this.router.navigate(['/dashboard']);
            },
            error: (err) => {
              console.error('Error al obtener datos del usuario:', err);
              this.router.navigate(['/dashboard']);
            }
          });
        },
        error: (err: HttpErrorResponse) => {
          this.handleError(err);
        }
      });
    }
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      this.errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 0:
          this.errorMessage = 'No se puede conectar con el servidor. Por favor, inténtelo de nuevo más tarde.';
          break;
        case 400:
          this.errorMessage = 'Credenciales inválidas. Por favor, verifique su correo electrónico y contraseña.';
          break;
        case 401:
          this.errorMessage = 'No autorizado. Por favor, verifique sus credenciales.';
          break;
        default:
          this.errorMessage = `Error inesperado: ${error.message}`;
          break;
      }
    }
    console.error('Error al iniciar sesión', error);
  }
}
