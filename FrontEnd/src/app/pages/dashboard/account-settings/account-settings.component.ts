import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';



@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  accountForm!: FormGroup;
  message = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
    });
   
    this.authService.getUserData().subscribe({
      next: (user) => {
        this.accountForm = this.fb.group({
          email: [user.email, [Validators.required, Validators.email]],
          name: [user.name, Validators.required],
          // otros campos necesarios
        });
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los datos del usuario';
      }
    });
  }

  onUpdate(): void {
    if (this.accountForm.valid) {
      this.authService.updateUser(this.accountForm.value).subscribe({
        next: () => {
          this.message = 'Datos actualizados correctamente';
        },
        error: () => {
          this.error = 'No se pudieron actualizar los datos';
        }
      });
    }
  }

  onDelete(): void {
    if (confirm('¿Estás seguro de que querés eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      this.authService.deleteAccount().subscribe({
        next: () => {
          localStorage.removeItem('authToken');
          this.router.navigate(['/login']);
        },
        error: () => {
          this.error = 'No se pudo eliminar la cuenta';
        }
      });
    }
  }
}
