import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private injector: Injector) {}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const accessToken = this.tokenService.getAccessToken();

  if (accessToken) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
    });

    return next.handle(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const authService = this.injector.get(AuthService);

          return authService.refreshToken().pipe(
            switchMap((res) => {
              if (!res || !res.access) {
                console.warn('No se pudo refrescar el token. Cerrando sesión.');
                authService.logout();
                return throwError(() => new Error('Refresh token inválido'));
              }

              const clonedRetry = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${res.access}`)
              });

              return next.handle(clonedRetry);
            }),
            catchError(() => {
              console.error('Error al refrescar el token. Cerrando sesión.');
              authService.logout();
              return throwError(() => new Error('Error refrescando el token'));
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

  return next.handle(req);
}


}