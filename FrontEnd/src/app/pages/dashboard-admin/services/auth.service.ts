import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth/`;
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.loadUser();
    }
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}token/`, credentials).pipe(
      tap((user: User) => {
        localStorage.setItem('access_token', user.access!);
        localStorage.setItem('refresh_token', user.refresh!);
        this.userSubject.next(user);
        console.log('Login response:', user);
        console.log('UserSubject after login:', this.userSubject.value);
      })
    );
  }
  
  loadUser(): void {
    this.http.get<User>(`${environment.apiUrl}/api/users/me/`).subscribe({
      next: (user) => {
        this.userSubject.next(user);
        console.log('Load user response:', user);
        console.log('UserSubject after load:', this.userSubject.value);
      },
      error: (err) => console.error('Error loading user:', err)
    });
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
  isAdmin(): boolean {
    const isAdmin = this.userSubject.value?.app_role === 'admin_app';
    console.log('isAdmin check:', {
      app_role: this.userSubject.value?.app_role,
      isAdmin
    });
    return isAdmin;
  }
}