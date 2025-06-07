import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './app/pages/services/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; 

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, ReactiveFormsModule),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, provideAnimationsAsync('noop')
  ]
}).catch(err => console.error(err));

