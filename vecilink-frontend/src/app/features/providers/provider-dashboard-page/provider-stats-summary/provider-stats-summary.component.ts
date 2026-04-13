import { Component, Input } from '@angular/core';
import { ProviderProfile } from '../../../../core/models';

export interface ProviderStats {
  activeServices: number;
  ratingAverage: number;
  totalRequests: number;
  isFeatured: boolean;
}

@Component({
  standalone: false,
  selector: 'app-provider-stats-summary',
  templateUrl: './provider-stats-summary.component.html',
  styleUrls: ['./provider-stats-summary.component.css']
})
export class ProviderStatsSummaryComponent {
  @Input() stats: ProviderStats = { activeServices: 0, ratingAverage: 0, totalRequests: 0, isFeatured: false };
  @Input() provider: ProviderProfile | null = null;
}
