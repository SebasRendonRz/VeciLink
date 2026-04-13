import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { CategoriesGridComponent } from './categories-grid/categories-grid.component';
import { FeaturedServicesSectionComponent } from './featured-services-section/featured-services-section.component';
import { TopProvidersSectionComponent } from './top-providers-section/top-providers-section.component';
import { AdsBannerComponent } from './ads-banner/ads-banner.component';

const routes: Routes = [{ path: '', component: HomePageComponent }];

@NgModule({
  declarations: [
    HomePageComponent,
    HeroSectionComponent,
    CategoriesGridComponent,
    FeaturedServicesSectionComponent,
    TopProvidersSectionComponent,
    AdsBannerComponent
  ],
  imports: [SharedModule, FormsModule, RouterModule.forChild(routes)]
})
export class HomeModule { }
