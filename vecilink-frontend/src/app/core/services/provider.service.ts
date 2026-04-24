import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProviderProfile, ProviderQuota } from '../models';
import { ApiBaseService, ApiResponse } from './api-base.service';

@Injectable({ providedIn: 'root' })
export class ProviderService extends ApiBaseService {
  constructor(http: HttpClient) { super(http); }

  private normalizeProvider(provider: Partial<ProviderProfile> & { providerId?: number; ratingAverage?: number }): ProviderProfile {
    return {
      ...provider,
      id: provider.id ?? provider.providerId ?? 0,
      userId: provider.userId ?? 0,
      providerName: provider.providerName ?? '',
      whatsapp: provider.whatsapp ?? '',
      neighborhood: provider.neighborhood ?? '',
      schedule: provider.schedule ?? '',
      availability: provider.availability ?? '',
      ratingAverage: provider.ratingAverage ?? 0,
      isFeatured: !!provider.isFeatured
    };
  }

  getProviderProfile(providerId: number): Observable<ProviderProfile> {
    return this.unwrap(this.http.get<ApiResponse<ProviderProfile>>(`${this.baseUrl}/providers/${providerId}`)).pipe(
      map(provider => this.normalizeProvider(provider))
    );
  }

  getProviderProfileByUserId(userId: number): Observable<ProviderProfile | null> {
    return this.unwrap(this.http.get<ApiResponse<ProviderProfile>>(`${this.baseUrl}/providers/${userId}`)).pipe(
      map(provider => this.normalizeProvider(provider)),
      catchError(() => of(null))
    );
  }

  updateProviderProfile(providerId: number, data: Partial<ProviderProfile>): Observable<ProviderProfile> {
    return this.unwrap(this.http.put<ApiResponse<ProviderProfile>>(`${this.baseUrl}/providers/profile`, data)).pipe(
      map(provider => this.normalizeProvider(provider))
    );
  }

  getFeatured(): Observable<ProviderProfile[]> {
    return this.unwrap(this.http.get<ApiResponse<ProviderProfile[]>>(`${this.baseUrl}/providers/featured`)).pipe(
      map(providers => providers.map(provider => this.normalizeProvider(provider)))
    );
  }

  getRanking(): Observable<ProviderProfile[]> {
    return this.unwrap(this.http.get<ApiResponse<ProviderProfile[]>>(`${this.baseUrl}/providers/ranking`)).pipe(
      map(providers => providers.map(provider => this.normalizeProvider(provider)))
    );
  }

  getAllProviders(): Observable<ProviderProfile[]> {
    return this.unwrap(this.http.get<ApiResponse<ProviderProfile[]>>(`${this.baseUrl}/providers`)).pipe(
      map(providers => providers.map(provider => this.normalizeProvider(provider)))
    );
  }

  setFeatured(providerId: number, isFeatured: boolean): Observable<boolean> {
    return this.http.put(`${this.baseUrl}/providers/${providerId}/featured`, null, { params: { isFeatured: isFeatured.toString() } }).pipe(map(() => true));
  }

  getProviderQuota(providerProfileId: number): Observable<ProviderQuota | null> {
    return this.unwrap(this.http.get<ApiResponse<ProviderQuota>>(`${this.baseUrl}/providers/${providerProfileId}/quota`)).pipe(
      catchError(() => of(null))
    );
  }

  updateMaxServicesAllowed(providerProfileId: number, maxServicesAllowed: number): Observable<boolean> {
    return this.http.put(
      `${this.baseUrl}/providers/${providerProfileId}/quota`,
      { maxServicesAllowed }
    ).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
