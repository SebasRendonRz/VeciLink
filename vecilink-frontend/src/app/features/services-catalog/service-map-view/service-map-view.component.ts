import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceItem } from '../../../core/models';

@Component({
  standalone: false,
  selector: 'app-service-map-view',
  templateUrl: './service-map-view.component.html',
  styleUrls: ['./service-map-view.component.css']
})
export class ServiceMapViewComponent implements OnChanges {
  @Input() services: ServiceItem[] = [];

  /** Servicios que tienen coordenadas definidas */
  mappableServices: ServiceItem[] = [];
  selectedService: ServiceItem | null = null;

  /** Centro del mapa (Medellín) */
  readonly mapCenter = { lat: 6.2442, lng: -75.5812 };

  /** Google Maps API key placeholder — set your key in environment.ts (Etapa 9) */
  readonly mapsApiKey = '';

  /** Static map URL for placeholder rendering */
  get staticMapUrl(): string {
    const markers = this.mappableServices
      .map(s => `color:blue|label:${s.id}|${s.latitude},${s.longitude}`)
      .join('&markers=');
    const base = 'https://maps.googleapis.com/maps/api/staticmap';
    return `${base}?center=${this.mapCenter.lat},${this.mapCenter.lng}&zoom=12&size=800x400&${markers ? 'markers=' + markers : ''}&key=${this.mapsApiKey}`;
  }

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['services']) {
      this.mappableServices = this.services.filter(
        s => s.latitude != null && s.longitude != null
      );
    }
  }

  selectService(service: ServiceItem): void {
    this.selectedService = this.selectedService?.id === service.id ? null : service;
  }

  goToDetail(serviceId: number): void {
    this.router.navigate(['/services', serviceId]);
  }
}
