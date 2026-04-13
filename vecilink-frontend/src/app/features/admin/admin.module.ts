import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminTopbarComponent } from './admin-topbar/admin-topbar.component';
import { AdminDashboardPageComponent } from './admin-dashboard-page/admin-dashboard-page.component';
import { AdminUsersPageComponent } from './admin-users-page/admin-users-page.component';
import { AdminServicesPageComponent } from './admin-services-page/admin-services-page.component';
import { AdminCategoriesPageComponent } from './admin-categories-page/admin-categories-page.component';
import { AdminFeaturedPageComponent } from './admin-featured-page/admin-featured-page.component';
import { AdminAdsPageComponent } from './admin-ads-page/admin-ads-page.component';
import { AdminReportsPageComponent } from './admin-reports-page/admin-reports-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: AdminDashboardPageComponent },
      { path: 'users', component: AdminUsersPageComponent },
      { path: 'services', component: AdminServicesPageComponent },
      { path: 'categories', component: AdminCategoriesPageComponent },
      { path: 'featured', component: AdminFeaturedPageComponent },
      { path: 'ads', component: AdminAdsPageComponent },
      { path: 'reports', component: AdminReportsPageComponent },
    ]
  }
];

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminSidebarComponent,
    AdminTopbarComponent,
    AdminDashboardPageComponent,
    AdminUsersPageComponent,
    AdminServicesPageComponent,
    AdminCategoriesPageComponent,
    AdminFeaturedPageComponent,
    AdminAdsPageComponent,
    AdminReportsPageComponent,
  ],
  imports: [SharedModule, FormsModule, RouterModule.forChild(routes)]
})
export class AdminModule { }