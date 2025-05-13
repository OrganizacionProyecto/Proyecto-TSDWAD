import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService { // Asegúrate de que 'export' esté aquí
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  setAccessToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem('refresh_token', token);
  }

  removeTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}