import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: false,
  template: `
    <nav *ngIf="totalPages > 1" aria-label="Paginación">
      <ul class="pagination justify-content-center mb-0">
        <li class="page-item" [class.disabled]="currentPage === 1">
          <button class="page-link" (click)="goTo(currentPage - 1)">
            <i class="bi bi-chevron-left"></i>
          </button>
        </li>
        <li class="page-item" *ngFor="let page of pages" [class.active]="page === currentPage">
          <button class="page-link" (click)="goTo(page)">{{ page }}</button>
        </li>
        <li class="page-item" [class.disabled]="currentPage === totalPages">
          <button class="page-link" (click)="goTo(currentPage + 1)">
            <i class="bi bi-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  `
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChanged = new EventEmitter<number>();

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goTo(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChanged.emit(page);
    }
  }
}
