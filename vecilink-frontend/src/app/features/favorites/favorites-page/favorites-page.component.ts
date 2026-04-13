import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { FavoriteService } from '../../../core/services/favorite.service';
import { ServiceCatalogService } from '../../../core/services/service-catalog.service';
import { AuthService } from '../../../core/services/auth.service';
import { ServiceItem } from '../../../core/models';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css'],
  standalone: false
})
export class FavoritesPageComponent implements OnInit {
  favoriteServices: ServiceItem[] = [];
  isLoading = true;
  userId!: number;

  constructor(
    private favoriteService: FavoriteService,
    private catalogService: ServiceCatalogService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (!user) { this.router.navigate(['/login']); return; }
    this.userId = user.id;
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.isLoading = true;
    this.favoriteService.listFavorites(this.userId).pipe(
      switchMap(favs => {
        if (favs.length === 0) return of([]);
        return forkJoin(
          favs.map(f => this.catalogService.getServiceDetail(f.serviceId))
        );
      }),
      map(services => services.filter((s): s is ServiceItem => !!s))
    ).subscribe(services => {
      this.favoriteServices = services;
      this.isLoading = false;
    });
  }

  onFavoriteToggled(service: ServiceItem): void {
    this.favoriteService.removeFavorite(this.userId, service.id).subscribe(() => {
      this.favoriteServices = this.favoriteServices.filter(s => s.id !== service.id);
    });
  }
}
