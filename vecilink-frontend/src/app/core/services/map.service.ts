import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface MapConfig {
  center: { lat: number; lng: number };
  zoom: number;
}

@Injectable({ providedIn: 'root' })
export class MapService {
  private defaultCenter = { lat: 6.2442, lng: -75.5812 }; // Medellín

  configureMap(): Observable<MapConfig> {
    return of({ center: this.defaultCenter, zoom: 12 });
  }

  geocode(address: string): Observable<{ lat: number; lng: number } | null> {
    // Stub: devuelve coordenadas del centro por defecto
    console.log(`Geocoding address: ${address}`);
    return of(this.defaultCenter);
  }

  centerMap(lat: number, lng: number): Observable<MapConfig> {
    return of({ center: { lat, lng }, zoom: 14 });
  }
}
