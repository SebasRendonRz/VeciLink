import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

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
      this.favoriteService.listFavorites(user.id).subscribe({
        next: (favs) => {
          this.favoriteIds = new Set(favs.map(f => f.serviceId));
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Error loading favorites:', error);
          this.favoriteIds = new Set();
        }
      });
    }
  }

  loadServices(): void {
    this.isLoading = true;
    const { keyword, categoryId, neighborhood } = this.currentFilters;
    this.serviceCatalogService.searchServices(keyword, categoryId ?? undefined, neighborhood).subscribe({
      next: (services) => {
        this.allServices = services;
        this.currentPage = 1;
        this.updatePagination();
        this.isLoading = false;
        // Forzar detección de cambios
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading services:', error);
        this.allServices = [];
        this.isLoading = false;
        this.cdr.markForCheck();
      }
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

  toggleView(): void {
    this.showMap = !this.showMap;
  }

  private updatePagination(): void {
    this.totalPages = Math.max(1, Math.ceil(this.allServices.length / this.pageSize));
    const start = (this.currentPage - 1) * this.pageSize;
    this.displayedServices = this.allServices.slice(start, start + this.pageSize);
  }
}
