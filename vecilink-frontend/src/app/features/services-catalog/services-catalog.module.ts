import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ServicesListPageComponent } from './services-list-page/services-list-page.component';
import { ServiceDetailPageComponent } from './service-detail-page/service-detail-page.component';
import { ServiceMapViewComponent } from './service-map-view/service-map-view.component';
import { ServiceCommentsSectionComponent } from './service-detail-page/service-comments-section/service-comments-section.component';

const routes: Routes = [
  { path: '', component: ServicesListPageComponent },
  { path: ':id', component: ServiceDetailPageComponent }
];

@NgModule({
  declarations: [
    ServicesListPageComponent,
    ServiceDetailPageComponent,
    ServiceMapViewComponent,
    ServiceCommentsSectionComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class ServicesCatalogModule { }
