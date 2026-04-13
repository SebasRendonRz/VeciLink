import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from '../models';
import { ApiBaseService, ApiResponse } from './api-base.service';

interface AuthResponseDto {
  token: string;
  userId: number;
  fullName: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService extends ApiBaseService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(http: HttpClient) {
    super(http);
    this.restoreSession();
  }

  private restoreSession(): void {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      try { this.currentUserSubject.next(JSON.parse(stored) as User); } catch { /* ignore */ }
    }
  }

  private mapDtoToUser(dto: AuthResponseDto): User {
    return {
      id: dto.userId,
      fullName: dto.fullName,
      email: dto.email,
      role: dto.role.toLowerCase() as User['role'],
      isActive: true,
      createdAt: new Date().toISOString()
    };
  }

  login(email: string, password: string): Observable<{ token: string; user: User }> {
    return this.http.post<ApiResponse<AuthResponseDto>>(`${this.baseUrl}/auth/login`, { email, password }).pipe(
      map(res => ({ token: res.data!.token, user: this.mapDtoToUser(res.data!) })),
      tap(mapped => {
        localStorage.setItem('token', mapped.token);
        localStorage.setItem('currentUser', JSON.stringify(mapped.user));
        this.currentUserSubject.next(mapped.user);
      })
    );
  }

  register(userData: (Partial<User> & { password: string }) & { providerName?: string; schedule?: string; availability?: string; description?: string }): Observable<{ token: string; user: User }> {
    const endpoint = userData.role === 'provider'
      ? `${this.baseUrl}/auth/register/provider`
      : `${this.baseUrl}/auth/register/citizen`;

    return this.http.post<ApiResponse<AuthResponseDto>>(endpoint, userData).pipe(
      map(res => ({ token: res.data!.token, user: this.mapDtoToUser(res.data!) })),
      tap(mapped => {
        localStorage.setItem('token', mapped.token);
        localStorage.setItem('currentUser', JSON.stringify(mapped.user));
        this.currentUserSubject.next(mapped.user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: User['role']): boolean {
    return this.getCurrentUser()?.role === role;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}