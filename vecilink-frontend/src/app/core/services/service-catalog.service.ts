import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceItem } from '../models';
import { ApiBaseService, ApiResponse } from './api-base.service';

@Injectable({ providedIn: 'root' })
export class ServiceCatalogService extends ApiBaseService {
  constructor(http: HttpClient) { super(http); }

  listServices(): Observable<ServiceItem[]> {
    return this.unwrap(this.http.get<ApiResponse<ServiceItem[]>>(`${this.baseUrl}/services`));
  }

  searchServices(keyword: string, categoryId?: number, neighborhood?: string): Observable<ServiceItem[]> {
    let params = new HttpParams();
    if (keyword) { params = params.set('keyword', keyword); }
    if (categoryId) { params = params.set('categoryId', categoryId.toString()); }
    if (neighborhood) { params = params.set('neighborhood', neighborhood); }
    return this.unwrap(this.http.get<ApiResponse<ServiceItem[]>>(`${this.baseUrl}/services`, { params }));
  }

  getServiceDetail(id: number): Observable<ServiceItem> {
    return this.unwrap(this.http.get<ApiResponse<ServiceItem>>(`${this.baseUrl}/services/${id}`));
  }

  getFeaturedServices(): Observable<ServiceItem[]> {
    return this.unwrap(this.http.get<ApiResponse<ServiceItem[]>>(`${this.baseUrl}/services`, { params: { providerIsFeatured: 'true' } }));
  }

  getServicesByProvider(providerProfileId: number): Observable<ServiceItem[]> {
    return this.unwrap(this.http.get<ApiResponse<ServiceItem[]>>(`${this.baseUrl}/services`, { params: { providerProfileId: providerProfileId.toString() } }));
  }

  createService(service: Omit<ServiceItem, 'id'>): Observable<ServiceItem> {
    return this.unwrap(this.http.post<ApiResponse<ServiceItem>>(`${this.baseUrl}/services`, service));
  }

  editService(id: number, data: Partial<ServiceItem>): Observable<ServiceItem> {
    return this.unwrap(this.http.put<ApiResponse<ServiceItem>>(`${this.baseUrl}/services/${id}`, data));
  }

  deleteService(id: number): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/services/${id}`).pipe(map(() => true));
  }
}
