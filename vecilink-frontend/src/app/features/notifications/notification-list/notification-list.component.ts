import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppNotification } from '../../../core/models';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
  standalone: false
})
export class NotificationListComponent {
  @Input() notifications: AppNotification[] = [];
  @Output() markRead = new EventEmitter<number>();
}
