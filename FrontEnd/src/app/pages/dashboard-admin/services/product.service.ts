import { Injectable } from '@angular/core';
     import { HttpClient, HttpErrorResponse } from '@angular/common/http';
     import { Observable, BehaviorSubject, throwError } from 'rxjs';
     import { tap, catchError, switchMap } from 'rxjs/operators';

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
           this.loadUserData();
         }
       }

       private hasToken(): boolean {
         return !!localStorage.getItem('access_token');
       }

       login(credentials: { email: string; password: string }): Observable<any> {
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

       refreshToken(): Observable<any> {
         const refreshToken = localStorage.getItem('refresh_token');
         if (!refreshToken) {
           this.logout();
           return throwError(() => new Error('No refresh token available'));
         }
         return this.http.post<any>(`${this.apiUrl}/auth/token/refresh/`, { refresh: refreshToken }).pipe(
           tap((res: any) => {
             if (res.access) {
               localStorage.setItem('access_token', res.access);
               this.authStatusSubject.next(true);
             }
           }),
           catchError((err) => {
             this.logout();
             return this.handleError(err);
           })
         );
       }

       loadUserData(): void {
         this.http.get<any>(`${this.apiUrl}/users/me/`).pipe(
           tap((userData) => {
             console.log('Datos del usuario recibidos de /me/:', userData);
             this.userDataSubject.next(userData);
             if (!userData.app_role) {
               this.getAllUsers().subscribe({
                 next: (users) => {
                   const currentUser = users.find(user => user.email === userData.email);
                   if (currentUser) {
                     console.log('Usuario actual desde /users/:', currentUser);
                     this.userDataSubject.next(currentUser);
                   }
                 },
                 error: (err) => console.error('Error al obtener usuarios:', err)
               });
             }
           }),
           catchError((err) => {
             console.error('Error al obtener los datos del usuario:', err);
             return throwError(() => new Error('Error al obtener los datos del usuario'));
           })
         ).subscribe();
       }

       getUserData(): Observable<any> {
         return this.userData$;
       }

       getAllUsers(): Observable<any[]> {
         return this.http.get<any[]>(`${this.apiUrl}/users/`).pipe(
           tap((users) => console.log('Usuarios recibidos de /users/:', users)),
           catchError(this.handleError)
         );
       }

       register(user: { username: string; first_name: string; last_name: string; email: string; password: string }): Observable<any> {
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

       isAdmin(): boolean {
         const isAdmin = this.userDataSubject.value?.app_role === 'admin_app';
         console.log('isAdmin check:', {
           app_role: this.userDataSubject.value?.app_role,
           isAdmin
         });
         return isAdmin;
       }

       getAccessToken(): string | null {
         const token = localStorage.getItem('access_token');
         if (!token) {
           this.refreshToken().subscribe();
         }
         return token;
       }

       private handleError(error: HttpErrorResponse): Observable<never> {
         let errorMessage = '';
         if (error.error instanceof ErrorEvent) {
           errorMessage = `Error: ${error.error.message}`;
         } else {
           switch (error.status) {
             case 0:
               errorMessage = 'No se puede conectar con el servidor.';
               break;
             case 400:
               errorMessage = 'Credenciales inválidas.';
               break;
             case 401:
               errorMessage = 'No autorizado.';
               break;
             default:
               errorMessage = `Error inesperado: ${error.message}`;
           }
         }
         return throwError(() => new Error(errorMessage));
       }
     }