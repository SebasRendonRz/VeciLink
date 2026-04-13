import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: false,
  template: `
    <div class="empty-state text-center py-5">
      <i class="bi {{ icon }} empty-state-icon"></i>
      <h5 class="mt-3 fw-semibold">{{ title }}</h5>
      <p class="text-muted">{{ message }}</p>
    </div>
  `,
  styles: [`
    .empty-state-icon { font-size: 3.5rem; color: #ced4da; display: block; }
    .empty-state h5 { color: #6c757d; }
  `]
})
export class EmptyStateComponent {
  @Input() icon = 'bi-inbox';
  @Input() title = 'Sin resultados';
  @Input() message = 'No se encontraron elementos que coincidan con tu búsqueda.';
}
