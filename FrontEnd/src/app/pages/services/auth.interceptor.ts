import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';  // Asegúrate de tener la ruta correcta
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs'; // Importa throwError

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();

    if (accessToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
      });

      return next.handle(cloned).pipe(
        catchError((error) => {
          if (error.status === 401) {
            return this.authService.refreshToken().pipe(
              switchMap((res) => {
                const clonedRetry = req.clone({
                  headers: req.headers.set('Authorization', `Bearer ${res.access}`)
                });
                return next.handle(clonedRetry);
              }),
              catchError(() => {
                this.authService.logout();
                return throwError(() => new Error('Error refreshing token'));
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
