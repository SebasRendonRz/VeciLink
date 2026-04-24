import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppNotification } from '../models';
import { ApiBaseService, ApiResponse } from './api-base.service';

@Injectable({ providedIn: 'root' })
export class NotificationService extends ApiBaseService {
  private _unreadCount$ = new BehaviorSubject<number>(0);
  unreadCount$ = this._unreadCount$.asObservable();

  constructor(http: HttpClient) { super(http); }

  listNotifications(userId?: number): Observable<AppNotification[]> {
    return this.unwrap(this.http.get<ApiResponse<AppNotification[]>>(`${this.baseUrl}/notifications`)).pipe(
      tap(list => this._unreadCount$.next(list.filter(n => !n.isRead).length))
    );
  }

  countUnread(userId?: number): Observable<number> {
    return this.listNotifications().pipe(
      map(notifications => notifications.filter(n => !n.isRead).length)
    );
  }

  markAsRead(notificationId: number): Observable<boolean> {
    return this.http.put(`${this.baseUrl}/notifications/${notificationId}/read`, {}).pipe(
      map(() => true),
      tap(() => this._unreadCount$.next(Math.max(0, this._unreadCount$.value - 1)))
    );
  }

  markAllAsRead(userId?: number): Observable<boolean> {
    return this.http.put(`${this.baseUrl}/notifications/read-all`, {}).pipe(
      map(() => true),
      tap(() => this._unreadCount$.next(0))
    );
  }
}
