<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, switchMap, catchError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
=======
import { Injectable, Injector } from '@angular/core';
     import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
     import { Observable } from 'rxjs';
     import { AuthService } from './auth.service';
>>>>>>> origin/WalterCamino

     @Injectable()
     export class AuthInterceptor implements HttpInterceptor {
       constructor(private injector: Injector) {}

<<<<<<< HEAD
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();

    let authReq = req;
    if (accessToken) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.url.includes('/auth/token/refresh/')) {
          // Si falló por token expirado, intento refrescar
          return this.authService.refreshToken().pipe(
            switchMap((res: any) => {
              const newToken = res.access;
              const clonedReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${newToken}`)
              });
              return next.handle(clonedReq);
            }),
            catchError((err) => {
              this.authService.logout();
              this.router.navigate(['/login']);
              return throwError(() => err);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
=======
       intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
         const authService = this.injector.get(AuthService);
         const accessToken = authService.getAccessToken();
         if (accessToken) {
           const cloned = req.clone({
             headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
           });
           return next.handle(cloned);
         }
         return next.handle(req);
       }
     }
>>>>>>> origin/WalterCamino
