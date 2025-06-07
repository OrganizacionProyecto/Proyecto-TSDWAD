import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.authStatus$.pipe(
      map(isLoggedIn => {
        if (!isLoggedIn) {
          // Si el usuario no está logueado (o su sesión ha expirado), redirigir al login
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}

