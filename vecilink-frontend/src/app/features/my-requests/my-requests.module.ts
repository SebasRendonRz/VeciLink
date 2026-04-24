import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MyRequestsPageComponent } from './my-requests-page/my-requests-page.component';

const routes: Routes = [{ path: '', component: MyRequestsPageComponent }];

@NgModule({
  declarations: [MyRequestsPageComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class MyRequestsModule { }
