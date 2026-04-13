import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Favorite } from '../models';
import { ApiBaseService, ApiResponse } from './api-base.service';

@Injectable({ providedIn: 'root' })
export class FavoriteService extends ApiBaseService {
  constructor(http: HttpClient) { super(http); }

  listFavorites(userId?: number): Observable<Favorite[]> {
    return this.unwrap(this.http.get<ApiResponse<Favorite[]>>(`${this.baseUrl}/favorites`));
  }

  addFavorite(userId: number, serviceId: number): Observable<Favorite> {
    return this.unwrap(this.http.post<ApiResponse<Favorite>>(`${this.baseUrl}/favorites`, { serviceId }));
  }

  removeFavorite(userId: number, serviceId: number): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/favorites/${serviceId}`).pipe(map(() => true));
  }

  isFavorite(userId: number, serviceId: number): Observable<boolean> {
    return this.listFavorites().pipe(
      map(favs => favs.some(f => f.serviceId === serviceId))
    );
  }
}
