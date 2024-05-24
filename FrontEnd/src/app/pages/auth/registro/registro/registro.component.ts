import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {
    this.registroForm = this.fb.group({
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Correo_electronico: ['', [Validators.required, Validators.email]],
      Contrasena: ['', Validators.required],
      Direccion: ['', Validators.required],
      TipoUsuario: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      this.usuarioService.registrarUsuario(this.registroForm.value).subscribe(
        response => {
          console.log('Usuario registrado con éxito', response);
          this.router.navigate(['/login']); // Redirige al usuario a la página de login después del registro
        },
        error => {
          console.error('Error al registrar el usuario', error);
        }
      );
    }
  }
}
