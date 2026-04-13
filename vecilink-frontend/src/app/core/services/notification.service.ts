import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppNotification } from '../models';
import { ApiBaseService, ApiResponse } from './api-base.service';

@Injectable({ providedIn: 'root' })
export class NotificationService extends ApiBaseService {
  constructor(http: HttpClient) { super(http); }

  listNotifications(userId?: number): Observable<AppNotification[]> {
    return this.unwrap(this.http.get<ApiResponse<AppNotification[]>>(`${this.baseUrl}/notifications`));
  }

  countUnread(userId?: number): Observable<number> {
    return this.listNotifications().pipe(
      map(notifications => notifications.filter(n => !n.isRead).length)
    );
  }

  markAsRead(notificationId: number): Observable<boolean> {
    return this.http.patch(`${this.baseUrl}/notifications/${notificationId}/read`, {}).pipe(map(() => true));
  }

  markAllAsRead(userId?: number): Observable<boolean> {
    return this.http.patch(`${this.baseUrl}/notifications/read-all`, {}).pipe(map(() => true));
  }
}
