import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  updateUserData(userData: { nombre: string; apellido: string; email: string; }) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://127.0.0.1:8000/api';
  private authStatusSubject = new BehaviorSubject<boolean>(this.hasToken());
  public authStatus$ = this.authStatusSubject.asObservable();
  private userDataSubject = new BehaviorSubject<any>(null);
  public userData$ = this.userDataSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  private hasToken(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) {
      // Si no hay token, redirige al inicio
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

  // Método para obtener los datos del usuario
  getUserData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/me/`).pipe(
      tap((data) => {
        this.userDataSubject.next(data);  // Almacenar los datos del usuario en un BehaviorSubject
      }),
      catchError((error) => {
        console.error('Error al obtener los datos del usuario', error);
        return throwError(() => new Error('Error al obtener los datos del usuario'));
      })
    );
  }

  // Método para verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // Método para cargar los datos del usuario al iniciar la aplicación
  loadUserData(): void {
    this.getUserData().subscribe({
      next: (data) => {
        console.log('Datos del usuario cargados:', data);
      },
      error: (err) => {
        console.error('Error al cargar los datos del usuario:', err);
      }
    });
  }

  // Método para obtener el token de acceso
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Método para refrescar el token
  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      return this.http.post<any>(`${this.apiUrl}/auth/refresh-token/`, { refresh: refreshToken }).pipe(
        tap((tokens) => {
          if (tokens.access) {
            localStorage.setItem('access_token', tokens.access);
          }
        }),
        catchError((error) => {
          console.error('Error al refrescar el token', error);
          return throwError(() => new Error('Error al refrescar el token'));
        })
      );
    }
    return throwError(() => new Error('No refresh token found'));
  }

  // Método para loguearse
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/token/`, credentials).pipe(
      tap((res: any) => {
        if (res.access && res.refresh) {
          localStorage.setItem('access_token', res.access);
          localStorage.setItem('refresh_token', res.refresh);
          this.authStatusSubject.next(true);
        }
      }),
      catchError(this.handleError)
    );
  }

  // Método para hacer logout
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.authStatusSubject.next(false);
    this.router.navigate(['/']);  // Redirige al inicio ("/")
  }

  // Método para registrar un nuevo usuario
  register(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register/`, formData).pipe(
      tap((res) => {
        console.log('Usuario registrado con éxito:', res);
      }),
      catchError(this.handleError)
    );
  }

  // Método para verificar si el usuario es administrador
  isAdmin(): boolean {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      const user = JSON.parse(userData);
      return user.role === 'admin';  // Asumiendo que el rol está en user.role
    }
    return false;
  }

  // Manejo de errores
  private handleError(error: any): Observable<any> {
    console.error('Error de autenticación', error);
    return throwError(() => new Error('Error de autenticación'));
  }
}
