import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found-page',
  standalone: false,
  template: `
    <div class="page-container py-5">
      <div class="container py-5">
        <div class="card border-0 shadow-sm mx-auto text-center p-4 p-md-5" style="max-width: 640px;">
          <span class="display-1 fw-bold text-primary">404</span>
          <h1 class="h3 fw-bold mt-3">Página no encontrada</h1>
          <p class="text-muted mb-4">
            La ruta que intentaste abrir no existe o ya no está disponible.
          </p>
          <div class="d-flex flex-column flex-sm-row justify-content-center gap-2">
            <a routerLink="/" class="btn btn-primary">
              <i class="bi bi-house-door me-1"></i>Ir al inicio
            </a>
            <a routerLink="/services" class="btn btn-outline-secondary">
              <i class="bi bi-grid me-1"></i>Ver servicios
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class NotFoundPageComponent {}