import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCatalogService } from '../../../core/services/service-catalog.service';
import { ProviderService } from '../../../core/services/provider.service';
import { FavoriteService } from '../../../core/services/favorite.service';
import { AuthService } from '../../../core/services/auth.service';
import { RequestHistoryService } from '../../../core/services/request-history.service';
import { ServiceItem, ProviderProfile } from '../../../core/models';

@Component({
  standalone: false,
  selector: 'app-service-detail-page',
  templateUrl: './service-detail-page.component.html',
  styleUrls: ['./service-detail-page.component.css']
})
export class ServiceDetailPageComponent implements OnInit {
  service: ServiceItem | undefined;
  provider: ProviderProfile | undefined;
  isFavorite = false;
  isLoggedIn = false;
  isLoading = true;
  notFound = false;
  ratingRefresh = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceCatalogService: ServiceCatalogService,
    private providerService: ProviderService,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private requestHistoryService: RequestHistoryService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.isLoggedIn = this.authService.isLoggedIn();

    this.serviceCatalogService.getServiceDetail(id).subscribe(service => {
      if (!service) {
        this.notFound = true;
        this.isLoading = false;
        return;
      }
      this.service = service;
      this.isLoading = false;

      const providerUserId = service.providerUserId;
      if (providerUserId) {
        this.providerService.getProviderProfile(providerUserId).subscribe(p => {
          this.provider = p;
        });
      }

      const user = this.authService.getCurrentUser();
      if (user) {
        this.favoriteService.isFavorite(user.id, id).subscribe(fav => {
          this.isFavorite = fav;
        });
      }
    });
  }

  toggleFavorite(): void {
    const user = this.authService.getCurrentUser();
    if (!user || !this.service) return;
    if (this.isFavorite) {
      this.favoriteService.removeFavorite(user.id, this.service.id).subscribe(() => {
        this.isFavorite = false;
      });
    } else {
      this.favoriteService.addFavorite(user.id, this.service!.id).subscribe(() => {
        this.isFavorite = true;
      });
    }
  }

  onContactProvider(): void {
    const user = this.authService.getCurrentUser();
    if (user && user.role === 'citizen' && this.service) {
      this.requestHistoryService.registerRequest(user.id, this.service.id).subscribe();
    }
  }

  goBack(): void {
    this.router.navigate(['/services']);
  }
}
