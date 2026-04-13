import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ServiceItem } from '../../../core/models';

@Component({
  selector: 'app-service-card',
  standalone: false,
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css'
})
export class ServiceCardComponent {
  @Input() service!: ServiceItem;
  @Input() isFavorite = false;
  @Output() favoriteToggled = new EventEmitter<ServiceItem>();
}
