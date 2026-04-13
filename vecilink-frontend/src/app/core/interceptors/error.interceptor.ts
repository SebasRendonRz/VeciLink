import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../services/error-handler.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private errorHandler: ErrorHandlerService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
          this.errorHandler.setError('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
        } else if (error.status === 0) {
          this.errorHandler.setError('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
        } else if (error.status >= 400 && error.status < 500) {
          const msg = error.error?.message || 'Ocurrió un error en la solicitud.';
          this.errorHandler.setError(msg);
        } else if (error.status >= 500) {
          this.errorHandler.setError('Error interno del servidor. Intenta de nuevo más tarde.');
        }
        return throwError(() => error);
      })
    );
  }
}
