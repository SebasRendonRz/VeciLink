import { Component, Input, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-confirm-modal',
  standalone: false,
  template: `
    <div class="modal fade" #modalEl tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" aria-label="Cerrar" (click)="cancel()"></button>
          </div>
          <div class="modal-body">
            <p>{{ message }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="cancel()">Cancelar</button>
            <button type="button" [class]="'btn ' + confirmClass" (click)="confirm()">{{ confirmLabel }}</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ConfirmModalComponent implements AfterViewInit {
  @Input() modalId = 'confirmModal';
  @Input() title = 'Confirmar acción';
  @Input() message = '¿Estás seguro de que deseas continuar?';
  @Input() confirmLabel = 'Confirmar';
  @Input() confirmClass = 'btn-danger';
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  @ViewChild('modalEl') modalEl!: ElementRef;
  private modalInstance: any;

  ngAfterViewInit(): void {
    this.modalInstance = new bootstrap.Modal(this.modalEl.nativeElement);
    this.modalInstance.show();
  }

  confirm(): void {
    this.modalInstance?.hide();
    this.confirmed.emit();
  }

  cancel(): void {
    this.modalInstance?.hide();
    this.cancelled.emit();
  }
}
