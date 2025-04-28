import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { routes } from './app.routes';
import { CsrfInterceptor } from '../interceptors/csrf.interceptor'; 
import { AuthInterceptor } from './services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    importProvidersFrom(HttpClientModule), 
    { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true } 
  ]
};

