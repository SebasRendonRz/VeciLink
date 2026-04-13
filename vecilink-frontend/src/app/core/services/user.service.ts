import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models';
import { ApiBaseService, ApiResponse } from './api-base.service';

@Injectable({ providedIn: 'root' })
export class UserService extends ApiBaseService {
  constructor(http: HttpClient) { super(http); }

  private normalizeUser(user: User): User {
    return {
      ...user,
      role: user.role.toLowerCase() as User['role']
    };
  }

  getProfile(userId: number): Observable<User> {
    return this.unwrap(this.http.get<ApiResponse<User>>(`${this.baseUrl}/users/${userId}`)).pipe(
      map(user => this.normalizeUser(user))
    );
  }

  updateProfile(userId: number, data: Partial<User>): Observable<User> {
    return this.unwrap(this.http.put<ApiResponse<User>>(`${this.baseUrl}/users/${userId}`, data)).pipe(
      map(user => this.normalizeUser(user))
    );
  }

  listUsers(): Observable<User[]> {
    return this.unwrap(this.http.get<ApiResponse<User[]>>(`${this.baseUrl}/users`)).pipe(
      map(users => users.map(user => this.normalizeUser(user)))
    );
  }

  deleteUser(userId: number): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/users/${userId}`).pipe(map(() => true));
  }
}
