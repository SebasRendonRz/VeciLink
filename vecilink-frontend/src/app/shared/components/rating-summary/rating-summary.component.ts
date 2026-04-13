import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { RatingService } from '../../../core/services/rating.service';
import { Rating } from '../../../core/models';

@Component({
  selector: 'app-rating-summary',
  templateUrl: './rating-summary.component.html',
  styleUrls: ['./rating-summary.component.css'],
  standalone: false
})
export class RatingSummaryComponent implements OnInit, OnChanges {
  @Input() serviceId!: number;
  @Input() refreshTrigger = 0;

  ratings: Rating[] = [];
  average = 0;
  total = 0;

  constructor(private ratingService: RatingService) {}

  ngOnInit(): void {
    this.load();
  }

  ngOnChanges(): void {
    this.load();
  }

  load(): void {
    if (!this.serviceId) return;
    this.ratingService.listRatings(this.serviceId).subscribe(list => {
      this.ratings = list;
      this.total = list.length;
      this.average = this.total > 0
        ? Math.round((list.reduce((s, r) => s + r.stars, 0) / this.total) * 10) / 10
        : 0;
    });
  }

  starsArray(n: number): number[] {
    return Array(n).fill(0);
  }
}
