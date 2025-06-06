import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://aymara.pythonanywhere.com/api';
  private authStatusSubject = new BehaviorSubject<boolean>(this.hasToken());
  public authStatus$ = this.authStatusSubject.asObservable();
  private userDataSubject = new BehaviorSubject<any>(null);
  public userData$ = this.userDataSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {
    if (this.hasToken()) {
      this.loadUserData();
    }
  }

  private hasToken(): boolean {
    const token = this.tokenService.getAccessToken();
    return !!token;
  }

  // Método para obtener los datos del usuario
  getUserData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/me/`).pipe(
      tap((data) => {
        this.userDataSubject.next(data);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error al obtener los datos del usuario', error);
        let errorMessage = 'Error al obtener los datos del usuario';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  // Método para verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return this.hasToken();
  }

  // Método para cargar los datos del usuario al iniciar la aplicación (o cuando sea necesario)
  loadUserData(): void {
    this.getUserData().subscribe({
      next: (data) => {
        console.log('Datos del usuario cargados:', data);
      },
      error: (err) => {
        console.error('Error al cargar los datos del usuario:', err);
        // Considera redirigir al login si falla la carga inicial
        this.router.navigate(['/']);
      }
    });
  }

  // Método para obtener el token de acceso
  getAccessToken(): string | null {
    return this.tokenService.getAccessToken();
  }

  // Método para refrescar el token
refreshToken(): Observable<any> {
  const refreshToken = this.tokenService.getRefreshToken();
  
  if (refreshToken) {
    return this.http.post<any>(`${this.apiUrl}/auth/token/refresh/`, { refresh: refreshToken }).pipe(
      tap((tokens) => {
        if (tokens.access) {
          this.tokenService.setAccessToken(tokens.access);
        } else {
          console.warn('No se obtuvo un nuevo access token.');
          this.logout();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error al refrescar el token', error);
        
        if (error.status === 401) {
          console.warn('Refresh token inválido. Cerrando sesión.');
          this.logout(); 
        }

        return throwError(() => new Error('Error al refrescar el token'));
      })
    );
  }

  console.warn('No refresh token disponible. Cerrando sesión.');
  this.logout();
  return throwError(() => new Error('No refresh token found'));
}




  // Método para loguearse
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/token/`, credentials).pipe(
      tap((res: any) => {
        if (res.access && res.refresh) {
          this.tokenService.setAccessToken(res.access);
          this.tokenService.setRefreshToken(res.refresh);
          this.authStatusSubject.next(true);
          this.loadUserData(); 
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error de autenticación', error);
        let errorMessage = 'Error de autenticación';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  // Método para hacer logout
  logout(): void {
    this.tokenService.removeTokens();
    this.authStatusSubject.next(false);
    this.userDataSubject.next(null); 
    this.router.navigate(['/']); // Redirige al inicio ("/")
  }

  //Metodo para hacer update de perfil de user
  updateUser(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/me/`, data).pipe(
      tap((updatedUser) => {
        this.userDataSubject.next(updatedUser); 
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error al actualizar el usuario', error);
        let errorMessage = 'Error al actualizar el usuario';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  //Metodo para borrar mi propia cuenta
  deleteAccount(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/me/`).pipe(
      switchMap(user => {
        const id = user.id;
        return this.http.delete(`${this.apiUrl}/users/${id}/`);
      }),
      tap(() => {
        this.logout();
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error al eliminar la cuenta', error);
        let errorMessage = 'Error al eliminar la cuenta';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  // Método para registrar un nuevo usuario
  register(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/`, formData).pipe(
      tap((res) => {
        console.log('Usuario registrado con éxito:', res);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error al registrar usuario', error);
        let errorMessage = 'Error al registrar usuario';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  // Método para verificar si el usuario es administrador
  isAdmin(): boolean {
    const userData = this.userDataSubject.getValue();
    return userData && userData.app_role === 'admin_app';
  }


}