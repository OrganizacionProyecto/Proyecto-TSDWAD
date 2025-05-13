import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Validadores personalizados para la contraseña
    const strongPasswordValidators = [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/[A-Z]/), // Al menos una mayúscula
      Validators.pattern(/\d/)     // Al menos un número
    ];

    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', strongPasswordValidators],
      password2: ['', strongPasswordValidators],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    if (this.registroForm.valid) {
      const formData = this.registroForm.value;
      // Enviar solo los campos esperados por el backend
      const dataToSend = {
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        password2: formData.password2
      };
      this.authService.register(dataToSend).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          this.errorMessage = err.error?.detail || JSON.stringify(err.error) || 'Ocurrió un error al registrar. Inténtelo de nuevo.';
          console.error('Error al registrar', err);
        }
      });
    }
  }
}