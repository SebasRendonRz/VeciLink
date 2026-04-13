import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceCatalogService } from '../../../core/services/service-catalog.service';
import { FavoriteService } from '../../../core/services/favorite.service';
import { AuthService } from '../../../core/services/auth.service';
import { ServiceItem } from '../../../core/models';
import { SearchFilters } from '../../../shared/components/search-filters/search-filters.component';

@Component({
  standalone: false,
  selector: 'app-services-list-page',
  templateUrl: './services-list-page.component.html',
  styleUrls: ['./services-list-page.component.css']
})
export class ServicesListPageComponent implements OnInit {
  allServices: ServiceItem[] = [];
  displayedServices: ServiceItem[] = [];
  favoriteIds = new Set<number>();
  isLoading = true;
  showMap = false;

  currentPage = 1;
  pageSize = 6;
  totalPages = 1;

  private currentFilters: SearchFilters = { keyword: '', categoryId: null, neighborhood: '' };

  constructor(
    private serviceCatalogService: ServiceCatalogService,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Apply query params from hero search
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.currentFilters.keyword = params['q'];
      }
      if (params['categoryId']) {
        this.currentFilters.categoryId = +params['categoryId'];
      }
      this.loadServices();
    });

    const user = this.authService.getCurrentUser();
    if (user) {
      this.favoriteService.listFavorites(user.id).subscribe(favs => {
        this.favoriteIds = new Set(favs.map(f => f.serviceId));
      });
    }
  }

  loadServices(): void {
    this.isLoading = true;
    const { keyword, categoryId, neighborhood } = this.currentFilters;
    this.serviceCatalogService.searchServices(keyword, categoryId ?? undefined, neighborhood).subscribe(services => {
      this.allServices = services;
      this.currentPage = 1;
      this.updatePagination();
      this.isLoading = false;
    });
  }

  onFiltersChanged(filters: SearchFilters): void {
    this.currentFilters = filters;
    this.loadServices();
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  onFavoriteToggled(service: ServiceItem): void {
    if (this.favoriteIds.has(service.id)) {
      this.favoriteIds.delete(service.id);
    } else {
      this.favoriteIds.add(service.id);
    }
  }

  toggleView(): void {
    this.showMap = !this.showMap;
  }

  private updatePagination(): void {
    this.totalPages = Math.max(1, Math.ceil(this.allServices.length / this.pageSize));
    const start = (this.currentPage - 1) * this.pageSize;
    this.displayedServices = this.allServices.slice(start, start + this.pageSize);
  }
}
