import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  standalone: false,
  template: `
    <div class="rating-stars d-flex align-items-center gap-1">
      <ng-container *ngFor="let star of starsArray; let i = index">
        <i
          class="bi"
          [class.bi-star-fill]="i < fullStars"
          [class.bi-star-half]="i === fullStars && hasHalf"
          [class.bi-star]="i > fullStars || (i === fullStars && !hasHalf)"
          [class.interactive]="interactive"
          (click)="interactive && selectStar(i + 1)"
        ></i>
      </ng-container>
      <span *ngIf="total !== undefined" class="text-muted small ms-1">({{ total }})</span>
      <span *ngIf="!interactive && stars > 0" class="small fw-semibold ms-1">{{ stars | number:'1.1-1' }}</span>
    </div>
  `,
  styles: [`
    .bi { color: #f5a623; font-size: 0.9rem; }
    .bi.interactive { cursor: pointer; transition: transform 0.1s; }
    .bi.interactive:hover { transform: scale(1.2); }
  `]
})
export class RatingStarsComponent implements OnChanges {
  @Input() stars = 0;
  @Input() total?: number;
  @Input() interactive = false;
  @Output() rated = new EventEmitter<number>();

  starsArray = [0, 1, 2, 3, 4];
  fullStars = 0;
  hasHalf = false;

  ngOnChanges(): void {
    this.fullStars = Math.floor(this.stars);
    this.hasHalf = this.stars - this.fullStars >= 0.5;
  }

  selectStar(value: number): void {
    this.stars = value;
    this.fullStars = value;
    this.hasHalf = false;
    this.rated.emit(value);
  }
}
