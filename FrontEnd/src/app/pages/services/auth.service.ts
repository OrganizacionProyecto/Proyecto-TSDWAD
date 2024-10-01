import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/auth';
  private authStatusSubject = new BehaviorSubject<boolean>(this.hasToken());
  public authStatus$ = this.authStatusSubject.asObservable();
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');  // Aquí obtenemos el token almacenado
  }
  constructor(private http: HttpClient) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, credentials).pipe(
      tap((res: any) => {
        if (res.access && res.refresh) {
          localStorage.setItem('access_token', res.access);
          localStorage.setItem('refresh_token', res.refresh);
          if (res.userData) {
            localStorage.setItem('userData', JSON.stringify(res.userData));
            console.log('User data saved to localStorage:', res.userData);
          } else {
            console.warn('userData is not defined in the response.');
          }
          this.authStatusSubject.next(true);
        }
      }),
      catchError(this.handleError)
    );
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
    localStorage.removeItem('userData');
    this.authStatusSubject.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getUserData(): any {
    try {
      const userDataString = localStorage.getItem('userData');
      if (!userDataString) {
        console.warn('No user data found in localStorage.');
        return null;
      }
      return JSON.parse(userDataString);
    } catch (error) {
      console.error('Error parsing user data from localStorage', error);
      return null;
    }
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
