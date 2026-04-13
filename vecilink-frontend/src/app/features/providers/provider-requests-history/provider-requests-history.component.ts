import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestHistoryService } from '../../../core/services/request-history.service';
import { ProviderService } from '../../../core/services/provider.service';
import { AuthService } from '../../../core/services/auth.service';
import { ServiceRequest } from '../../../core/models';

@Component({
  selector: 'app-provider-requests-history',
  templateUrl: './provider-requests-history.component.html',
  styleUrls: ['./provider-requests-history.component.css'],
  standalone: false
})
export class ProviderRequestsHistoryComponent implements OnInit {
  requests: ServiceRequest[] = [];
  isLoading = true;

  statusLabels: Record<string, string> = {
    pending: 'Pendiente',
    contacted: 'Contactado',
    closed: 'Cerrado'
  };

  statusBadge: Record<string, string> = {
    pending: 'bg-warning text-dark',
    contacted: 'bg-info text-dark',
    closed: 'bg-success'
  };

  constructor(
    private requestHistoryService: RequestHistoryService,
    private providerService: ProviderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (!user) { this.router.navigate(['/login']); return; }

    this.providerService.getProviderProfileByUserId(user.id).subscribe(p => {
      if (p) {
        this.requestHistoryService.listRequestsByProvider(p.id).subscribe(reqs => {
          this.requests = reqs;
          this.isLoading = false;
        });
      } else {
        this.isLoading = false;
      }
    });
  }
}
