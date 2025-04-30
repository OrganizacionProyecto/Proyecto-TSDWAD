import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private authStatusSubject = new BehaviorSubject<boolean>(this.hasToken());
  public authStatus$ = this.authStatusSubject.asObservable();

  private userDataSubject = new BehaviorSubject<any>(null);
  public userData$ = this.userDataSubject.asObservable();
 
  constructor(private http: HttpClient) {
    if (this.hasToken()) {
      this.loadUserData();  // Cargar datos al iniciar si ya hay token
    }
   }

  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/token/`, credentials).pipe(
      tap((res: any) => {
        if (res.access && res.refresh) {
          localStorage.setItem('access_token', res.access);
          localStorage.setItem('refresh_token', res.refresh);
          this.authStatusSubject.next(true);
          this.loadUserData();
        }
      }),
      catchError(this.handleError)
    );
  }

  loadUserData(): void {
    this.http.get<any>(`${this.apiUrl}/users/me/`).pipe(
      tap((userData) => {
        console.log('Datos del usuario recibidos:', userData);  // Puedes verificar los datos aquí
        this.userDataSubject.next(userData);
      }),
      catchError((err) => {
        console.error('Error al obtener los datos del usuario:', err);  // Manejamos el error aquí
        return throwError(() => new Error('Error al obtener los datos del usuario'));
      })
    ).subscribe();
  }
  
  getUserData(): Observable<any> {
    return this.userData$; // Ahora retorna el observable, no hace HTTP directamente
  }

  register(user: { username: string, first_name: string, last_name: string, email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup/`, user).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.authStatusSubject.next(false);
    this.userDataSubject.next(null); 
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 0:
          errorMessage = 'No se puede conectar con el servidor. Por favor, inténtelo de nuevo más tarde.';
          break;
        case 400:
          errorMessage = 'Credenciales inválidas. Por favor, verifique su correo electrónico y contraseña.';
          break;
        case 401:
          errorMessage = 'No autorizado. Por favor, verifique sus credenciales.';
          break;
        default:
          errorMessage = `Error inesperado: ${error.message}`;
          break;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}

