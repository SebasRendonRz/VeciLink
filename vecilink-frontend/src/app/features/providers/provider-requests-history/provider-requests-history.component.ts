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
  updatingId: number | null = null;

  statusLabels: Record<string, string> = {
    Pending: 'Pendiente',
    Contacted: 'Contactado',
    Closed: 'Cerrado'
  };

  statusBadge: Record<string, string> = {
    Pending: 'bg-warning text-dark',
    Contacted: 'bg-info text-dark',
    Closed: 'bg-success'
  };

  nextStatus: Record<string, { value: ServiceRequest['status']; label: string; css: string }[]> = {
    Pending: [
      { value: 'Contacted', label: 'Marcar contactado', css: 'btn-outline-info' },
      { value: 'Closed',    label: 'Cerrar',            css: 'btn-outline-success' }
    ],
    Contacted: [
      { value: 'Closed',   label: 'Cerrar',             css: 'btn-outline-success' }
    ],
    Closed: []
  };

  constructor(
    private requestHistoryService: RequestHistoryService,
    private providerService: ProviderService,
    private authService: AuthService,
    private router: Router
  ) {}

  changeStatus(req: ServiceRequest, status: ServiceRequest['status']): void {
    this.updatingId = req.id;
    this.requestHistoryService.updateRequestStatus(req.id, status).subscribe({
      next: () => {
        req.status = status;
        this.updatingId = null;
      },
      error: () => { this.updatingId = null; }
    });
  }

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
