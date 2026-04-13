import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: false,
  template: `
    <div class="loader-overlay">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>
  `,
  styles: [`
    .loader-overlay {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3rem 0;
    }
  `]
})
export class LoaderComponent {}
