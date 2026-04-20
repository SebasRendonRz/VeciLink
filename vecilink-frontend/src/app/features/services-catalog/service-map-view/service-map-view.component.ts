import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  NgZone,
} from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { ServiceItem } from '../../../core/models';

// Fix Leaflet default marker icons broken by Angular's asset bundler
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
  iconUrl: 'assets/leaflet/marker-icon.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png',
});

@Component({
  standalone: false,
  selector: 'app-service-map-view',
  templateUrl: './service-map-view.component.html',
  styleUrls: ['./service-map-view.component.css'],
})
export class ServiceMapViewComponent
  implements OnChanges, AfterViewInit, OnDestroy
{
  @Input() services: ServiceItem[] = [];
  @ViewChild('mapContainer', { static: true })
  mapContainer!: ElementRef<HTMLDivElement>;

  mappableServices: ServiceItem[] = [];
  selectedService: ServiceItem | null = null;

  private map: L.Map | null = null;
  private markers: { marker: L.Marker; serviceId: number }[] = [];

  /** Centro del mapa (Medellín) */
  private readonly mapCenter: L.LatLngExpression = [6.2442, -75.5812];

  constructor(private router: Router, private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => this.initMap());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['services']) {
      this.mappableServices = this.services.filter(
        s => s.latitude != null && s.longitude != null
      );
      if (this.map) {
        this.updateMarkers();
      }
    }
  }

  ngOnDestroy(): void {
    this.map?.remove();
    this.map = null;
  }

  private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement, {
      center: this.mapCenter,
      zoom: 13,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(this.map);

    this.updateMarkers();
  }

  private buildPopupContent(service: ServiceItem): HTMLElement {
    const container = document.createElement('div');
    container.className = 'vl-popup';
    container.innerHTML = `
      <p class="vl-popup__title">${service.serviceName}</p>
      <p class="vl-popup__neighborhood">${service.neighborhood}</p>
      ${
        service.categoryName
          ? `<span class="vl-popup__badge">${service.categoryName}</span>`
          : ''
      }
    `;
    const btn = document.createElement('button');
    btn.className = 'vl-popup__btn';
    btn.textContent = 'Ver detalle';
    btn.addEventListener('click', () =>
      this.ngZone.run(() => this.goToDetail(service.id))
    );
    container.appendChild(btn);
    return container;
  }

  private updateMarkers(): void {
    if (!this.map) return;

    this.markers.forEach(({ marker }) => marker.remove());
    this.markers = [];

    if (this.mappableServices.length === 0) return;

    this.mappableServices.forEach(service => {
      const marker = L.marker([service.latitude!, service.longitude!])
        .bindPopup(this.buildPopupContent(service), { maxWidth: 240 })
        .addTo(this.map!);
      this.markers.push({ marker, serviceId: service.id });
    });

    const group = L.featureGroup(this.markers.map(m => m.marker));
    this.map.fitBounds(group.getBounds().pad(0.25));
  }

  selectService(service: ServiceItem): void {
    this.selectedService =
      this.selectedService?.id === service.id ? null : service;

    if (service.latitude != null && service.longitude != null) {
      this.ngZone.runOutsideAngular(() => {
        this.map?.setView([service.latitude!, service.longitude!], 16, {
          animate: true,
        });
        const entry = this.markers.find(m => m.serviceId === service.id);
        entry?.marker.openPopup();
      });
    }
  }

  goToDetail(serviceId: number): void {
    this.router.navigate(['/services', serviceId]);
  }
}
