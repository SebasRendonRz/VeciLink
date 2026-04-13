import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from './core/services/error-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  errorMessage$: Observable<string | null>;

  constructor(private errorHandler: ErrorHandlerService) {
    this.errorMessage$ = this.errorHandler.error$;
  }

  clearError(): void {
    this.errorHandler.clearError();
  }
}
