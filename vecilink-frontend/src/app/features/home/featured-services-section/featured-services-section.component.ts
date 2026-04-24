import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ServiceCatalogService } from '../../../core/services/service-catalog.service';
import { FavoriteService } from '../../../core/services/favorite.service';
import { AuthService } from '../../../core/services/auth.service';
import { ServiceItem } from '../../../core/models';

@Component({
  standalone: false,
  selector: 'app-featured-services-section',
  templateUrl: './featured-services-section.component.html',
  styleUrls: ['./featured-services-section.component.css']
})
export class FeaturedServicesSectionComponent implements OnInit {
  featuredServices: ServiceItem[] = [];
  favoriteIds = new Set<number>();

  constructor(
    private serviceCatalogService: ServiceCatalogService,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.serviceCatalogService.getFeaturedServices().subscribe(services => {
      this.featuredServices = services;
      this.cdr.markForCheck();
    });

    const user = this.authService.getCurrentUser();
    if (user) {
      this.favoriteService.listFavorites(user.id).subscribe(favs => {
        this.favoriteIds = new Set(favs.map(f => f.serviceId));
        this.cdr.markForCheck();
      });
    }
  }

  onFavoriteToggled(service: ServiceItem): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;
    if (this.favoriteIds.has(service.id)) {
      this.favoriteService.removeFavorite(user.id, service.id).subscribe(() => {
        this.favoriteIds.delete(service.id);
        this.cdr.markForCheck();
      });
    } else {
      this.favoriteService.addFavorite(user.id, service.id).subscribe(() => {
        this.favoriteIds.add(service.id);
        this.cdr.markForCheck();
      });
    }
  }
}
