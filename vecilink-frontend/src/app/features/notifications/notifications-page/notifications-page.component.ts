import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';
import { AuthService } from '../../../core/services/auth.service';
import { AppNotification } from '../../../core/models';

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.css'],
  standalone: false
})
export class NotificationsPageComponent implements OnInit {
  notifications: AppNotification[] = [];
  isLoading = true;
  userId!: number;

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (!user) { this.router.navigate(['/login']); return; }
    this.userId = user.id;
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.listNotifications(this.userId).subscribe(list => {
      this.notifications = list;
      this.isLoading = false;
    });
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  onMarkRead(id: number): void {
    this.notificationService.markAsRead(id).subscribe(() => {
      const notif = this.notifications.find(n => n.id === id);
      if (notif) notif.isRead = true;
    });
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead(this.userId).subscribe(() => {
      this.notifications.forEach(n => n.isRead = true);
    });
  }
}
