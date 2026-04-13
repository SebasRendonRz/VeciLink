import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { FavoriteServiceListComponent } from './favorite-service-list/favorite-service-list.component';

const routes: Routes = [{ path: '', component: FavoritesPageComponent }];

@NgModule({
  declarations: [FavoritesPageComponent, FavoriteServiceListComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class FavoritesModule { }
