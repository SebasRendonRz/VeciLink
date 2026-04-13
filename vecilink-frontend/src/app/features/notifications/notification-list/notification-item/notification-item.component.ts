import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppNotification } from '../../../../core/models';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css'],
  standalone: false
})
export class NotificationItemComponent {
  @Input() notification!: AppNotification;
  @Output() markRead = new EventEmitter<number>();
}
