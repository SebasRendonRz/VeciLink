import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Advertisement } from '../models';
import { ApiBaseService, ApiResponse } from './api-base.service';

@Injectable({ providedIn: 'root' })
export class AdvertisementService extends ApiBaseService {
  constructor(http: HttpClient) { super(http); }

  listActiveAds(): Observable<Advertisement[]> {
    return this.unwrap(this.http.get<ApiResponse<Advertisement[]>>(`${this.baseUrl}/advertisements/active`));
  }

  listAllAds(): Observable<Advertisement[]> {
    return this.unwrap(this.http.get<ApiResponse<Advertisement[]>>(`${this.baseUrl}/advertisements`));
  }

  createAd(ad: Omit<Advertisement, 'id'>): Observable<Advertisement> {
    return this.unwrap(this.http.post<ApiResponse<Advertisement>>(`${this.baseUrl}/advertisements`, ad));
  }

  editAd(id: number, data: Partial<Advertisement>): Observable<Advertisement> {
    return this.unwrap(this.http.put<ApiResponse<Advertisement>>(`${this.baseUrl}/advertisements/${id}`, data));
  }

  deactivateAd(id: number): Observable<boolean> {
    return this.http.patch(`${this.baseUrl}/advertisements/${id}/deactivate`, {}).pipe(map(() => true));
  }
}
