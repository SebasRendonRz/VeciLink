import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: false,
  template: `
    <div *ngIf="message" class="alert alert-{{ type }} alert-dismissible fade show d-flex align-items-center gap-2" role="alert">
      <i class="bi {{ iconClass }}"></i>
      <span>{{ message }}</span>
      <button type="button" class="btn-close ms-auto" (click)="dismiss()" aria-label="Cerrar"></button>
    </div>
  `
})
export class AlertComponent {
  @Input() message = '';
  @Input() type: 'success' | 'danger' | 'warning' | 'info' = 'info';
  @Output() dismissed = new EventEmitter<void>();

  get iconClass(): string {
    const icons: Record<string, string> = {
      success: 'bi-check-circle-fill',
      danger: 'bi-exclamation-triangle-fill',
      warning: 'bi-exclamation-circle-fill',
      info: 'bi-info-circle-fill'
    };
    return icons[this.type] ?? 'bi-info-circle-fill';
  }

  dismiss(): void {
    this.message = '';
    this.dismissed.emit();
  }
}
