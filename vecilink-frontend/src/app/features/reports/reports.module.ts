import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ReportServiceFormComponent } from './report-service-form/report-service-form.component';
import { ReportUserFormComponent } from './report-user-form/report-user-form.component';

const routes: Routes = [
  { path: 'service/:id', component: ReportServiceFormComponent },
  { path: 'user/:id', component: ReportUserFormComponent }
];

@NgModule({
  declarations: [ReportServiceFormComponent, ReportUserFormComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class ReportsModule { }
