import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ServiceCatalogService } from '../../../core/services/service-catalog.service';
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
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.serviceCatalogService.getFeaturedServices().subscribe(services => {
      this.featuredServices = services;
      this.cdr.markForCheck();
    });
  }

  onFavoriteToggled(service: ServiceItem): void {
    if (this.favoriteIds.has(service.id)) {
      this.favoriteIds.delete(service.id);
    } else {
      this.favoriteIds.add(service.id);
    }
  }
}
