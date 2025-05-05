import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs'; // Ya no es necesario
// import { catchError, tap } from 'rxjs/operators'; // Ya no es necesario
// import { throwError } from 'rxjs'; // Ya no es necesario
// import { TokenService } from '../services/token.service'; // Ya no es necesario

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // Ahora este servicio podría tener métodos para interactuar con *otros* usuarios
  // si tu aplicación lo requiere (por ejemplo, obtener lista de usuarios, detalles de un usuario específico, etc.).
}