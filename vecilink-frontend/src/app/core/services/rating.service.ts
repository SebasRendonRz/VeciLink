import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rating } from '../models';
import { ApiBaseService, ApiResponse } from './api-base.service';

@Injectable({ providedIn: 'root' })
export class RatingService extends ApiBaseService {
  constructor(http: HttpClient) { super(http); }

  listRatings(serviceId: number): Observable<Rating[]> {
    return this.unwrap(this.http.get<ApiResponse<Rating[]>>(`${this.baseUrl}/ratings`, { params: { serviceId: serviceId.toString() } }));
  }

  addRating(rating: Omit<Rating, 'id'>): Observable<Rating> {
    return this.unwrap(this.http.post<ApiResponse<Rating>>(`${this.baseUrl}/ratings`, rating));
  }

  getRatingSummary(serviceId: number): Observable<{ average: number; total: number }> {
    return this.unwrap(this.http.get<ApiResponse<{ average: number; total: number }>>(`${this.baseUrl}/ratings/summary/${serviceId}`));
  }
}
