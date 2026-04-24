import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceRequest } from '../models';
import { ApiBaseService, ApiResponse } from './api-base.service';

@Injectable({ providedIn: 'root' })
export class RequestHistoryService extends ApiBaseService {
  constructor(http: HttpClient) { super(http); }

  listRequests(userId?: number): Observable<ServiceRequest[]> {
    if (userId) {
      return this.unwrap(this.http.get<ApiResponse<ServiceRequest[]>>(`${this.baseUrl}/service-requests`, { params: { userId: userId.toString() } }));
    }
    return this.unwrap(this.http.get<ApiResponse<ServiceRequest[]>>(`${this.baseUrl}/service-requests`));
  }

  listRequestsByProvider(providerId: number): Observable<ServiceRequest[]> {
    return this.unwrap(this.http.get<ApiResponse<ServiceRequest[]>>(`${this.baseUrl}/service-requests/provider-history`));
  }

  getMyHistory(categoryId?: number): Observable<ServiceRequest[]> {
    const params: Record<string, string> = {};
    if (categoryId != null) params['categoryId'] = categoryId.toString();
    return this.unwrap(this.http.get<ApiResponse<ServiceRequest[]>>(
      `${this.baseUrl}/service-requests/my-history`, { params }
    ));
  }

  registerRequest(userId: number, serviceId: number): Observable<ServiceRequest> {
    return this.unwrap(this.http.post<ApiResponse<ServiceRequest>>(`${this.baseUrl}/service-requests`, { userId, serviceId }));
  }

  updateRequestStatus(requestId: number, status: ServiceRequest['status']): Observable<boolean> {
    return this.http.put(`${this.baseUrl}/service-requests/${requestId}/status`, { status }).pipe(map(() => true));
  }
}
