import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // Método para cargar los datos del usuario
  loadUserData(): Observable<any> {
    const token = localStorage.getItem('access_token');  // Asumiendo que el token está en localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.apiUrl}/users/me/`, { headers }).pipe(  // Se pasa la cabecera con el token
      tap((userData) => {
        console.log('Datos del usuario recibidos:', userData);
      }),
      catchError((err) => {
        console.error('Error al obtener los datos del usuario:', err);
        return throwError(() => new Error('Error al obtener los datos del usuario'));
      })
    );
  }
}
