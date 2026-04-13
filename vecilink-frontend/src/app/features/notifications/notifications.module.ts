import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationItemComponent } from './notification-list/notification-item/notification-item.component';

const routes: Routes = [{ path: '', component: NotificationsPageComponent }];

@NgModule({
  declarations: [NotificationsPageComponent, NotificationListComponent, NotificationItemComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class NotificationsModule { }
