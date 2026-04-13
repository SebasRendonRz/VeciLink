import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ServiceItem } from '../../../core/models';

@Component({
  selector: 'app-favorite-service-list',
  templateUrl: './favorite-service-list.component.html',
  styleUrls: ['./favorite-service-list.component.css'],
  standalone: false
})
export class FavoriteServiceListComponent {
  @Input() services: ServiceItem[] = [];
  @Output() favoriteToggled = new EventEmitter<ServiceItem>();
}
