import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ProviderService } from '../../../core/services/provider.service';
import { ServiceCatalogService } from '../../../core/services/service-catalog.service';
import { RequestHistoryService } from '../../../core/services/request-history.service';
import { ProviderProfile, User } from '../../../core/models';
import { ProviderStats } from './provider-stats-summary/provider-stats-summary.component';

@Component({
  standalone: false,
  selector: 'app-provider-dashboard-page',
  templateUrl: './provider-dashboard-page.component.html',
  styleUrls: ['./provider-dashboard-page.component.css']
})
export class ProviderDashboardPageComponent implements OnInit {
  currentUser: User | null = null;
  provider: ProviderProfile | null = null;
  stats: ProviderStats = { activeServices: 0, ratingAverage: 0, totalRequests: 0, isFeatured: false };
  isLoading = true;

  constructor(
    private authService: AuthService,
    private providerService: ProviderService,
    private serviceCatalogService: ServiceCatalogService,
    private requestHistoryService: RequestHistoryService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) return;

    this.providerService.getProviderProfileByUserId(this.currentUser.id).subscribe(profile => {
      this.provider = profile ?? null;

      if (profile) {
        this.stats.ratingAverage = profile.ratingAverage ?? 0;
        this.stats.isFeatured = profile.isFeatured;

        this.serviceCatalogService.getServicesByProvider(profile.id).subscribe(services => {
          this.stats.activeServices = services.length;
        });

        this.requestHistoryService.listRequestsByProvider(profile.id).subscribe(requests => {
          this.stats.totalRequests = requests.length;
          this.isLoading = false;
        });
      } else {
        this.isLoading = false;
      }
    });
  }
}
