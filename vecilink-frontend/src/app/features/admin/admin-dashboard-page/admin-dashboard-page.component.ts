import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { ServiceCatalogService } from '../../../core/services/service-catalog.service';
import { ReportService } from '../../../core/services/report.service';
import { ProviderService } from '../../../core/services/provider.service';

@Component({
  selector: 'app-admin-dashboard-page',
  templateUrl: './admin-dashboard-page.component.html',
  styleUrls: ['./admin-dashboard-page.component.css'],
  standalone: false
})
export class AdminDashboardPageComponent implements OnInit {
  totalUsers = 0;
  totalServices = 0;
  pendingReports = 0;
  featuredProviders = 0;
  isLoading = true;

  constructor(
    private userService: UserService,
    private catalogService: ServiceCatalogService,
    private reportService: ReportService,
    private providerService: ProviderService
  ) {}

  ngOnInit(): void {
    forkJoin({
      users:     this.userService.listUsers().pipe(catchError(() => of([]))),
      services:  this.catalogService.listServices().pipe(catchError(() => of([]))),
      reports:   this.reportService.listReports().pipe(catchError(() => of([]))),
      providers: this.providerService.getRanking().pipe(catchError(() => of([])))
    }).subscribe({
      next: ({ users, services, reports, providers }) => {
        this.totalUsers       = users.length;
        this.totalServices    = services.length;
        this.pendingReports   = reports.filter((r: any) => r.status === 'pending').length;
        this.featuredProviders = providers.filter((p: any) => p.isFeatured).length;
      },
      error: () => {},
      complete: () => { this.isLoading = false; }
    });
  }
}
