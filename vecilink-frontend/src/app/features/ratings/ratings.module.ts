import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ProviderRankingPageComponent } from './provider-ranking-page/provider-ranking-page.component';

const routes: Routes = [{ path: '', component: ProviderRankingPageComponent }];

@NgModule({
  declarations: [ProviderRankingPageComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class RatingsModule { }
