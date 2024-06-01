import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/auth/signup/', userData).pipe(
      tap(response => {
        if (response && response.token) {
          this.isLoggedInSubject.next(true);
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/auth/login/', credentials).pipe(
      tap(response => {
        if (response && response.token) {
          this.isLoggedInSubject.next(true);
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  getUserData(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>('http://127.0.0.1:8000/api/auth/user/', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
