import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ProviderDashboardPageComponent } from './provider-dashboard-page/provider-dashboard-page.component';
import { ProviderStatsSummaryComponent } from './provider-dashboard-page/provider-stats-summary/provider-stats-summary.component';
import { ProviderProfileFormComponent } from './provider-profile-form/provider-profile-form.component';
import { ProviderServicesListComponent } from './provider-services-list/provider-services-list.component';
import { ProviderServiceFormComponent } from './provider-service-form/provider-service-form.component';
import { ProviderRequestsHistoryComponent } from './provider-requests-history/provider-requests-history.component';

const routes: Routes = [
  { path: '', component: ProviderDashboardPageComponent },
  { path: 'profile', component: ProviderProfileFormComponent },
  { path: 'services', component: ProviderServicesListComponent },
  { path: 'services/new', component: ProviderServiceFormComponent },
  { path: 'services/:id/edit', component: ProviderServiceFormComponent },
  { path: 'requests', component: ProviderRequestsHistoryComponent }
];

@NgModule({
  declarations: [
    ProviderDashboardPageComponent,
    ProviderStatsSummaryComponent,
    ProviderProfileFormComponent,
    ProviderServicesListComponent,
    ProviderServiceFormComponent,
    ProviderRequestsHistoryComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class ProvidersModule { }
