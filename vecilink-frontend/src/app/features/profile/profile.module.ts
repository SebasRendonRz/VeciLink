import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileFormComponent } from './profile-page/profile-form/profile-form.component';

const routes: Routes = [{ path: '', component: ProfilePageComponent }];

@NgModule({
  declarations: [ProfilePageComponent, ProfileFormComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class ProfileModule { }
