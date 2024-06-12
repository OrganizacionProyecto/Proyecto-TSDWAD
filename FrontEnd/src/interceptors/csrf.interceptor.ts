import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtén el token CSRF desde las cookies
    const csrfToken = this.getCookie('csrftoken');
    if (csrfToken) {
      // Clona la solicitud y agrega el encabezado CSRF
      const clonedRequest = req.clone({
        headers: req.headers.set('X-CSRFToken', csrfToken)
      });
      return next.handle(clonedRequest);
    } else {
      return next.handle(req);
    }
  }

  // Método para obtener el valor de una cookie por su nombre
  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }
}
