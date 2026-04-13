import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceCatalogService } from '../../../core/services/service-catalog.service';
import { ProviderService } from '../../../core/services/provider.service';
import { AuthService } from '../../../core/services/auth.service';
import { ServiceItem } from '../../../core/models';
import { ProviderProfile } from '../../../core/models';

@Component({
  selector: 'app-provider-services-list',
  templateUrl: './provider-services-list.component.html',
  styleUrls: ['./provider-services-list.component.css'],
  standalone: false
})
export class ProviderServicesListComponent implements OnInit {
  services: ServiceItem[] = [];
  provider: ProviderProfile | undefined;
  isLoading = true;
  deleteTargetId: number | null = null;
  successMessage = '';
  errorMessage = '';

  constructor(
    private catalogService: ServiceCatalogService,
    private providerService: ProviderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (!user) { this.router.navigate(['/login']); return; }

    this.providerService.getProviderProfileByUserId(user.id).subscribe(p => {
      this.provider = p;
      if (p) {
        this.catalogService.getServicesByProvider(p.id).subscribe(list => {
          this.services = list;
          this.isLoading = false;
        });
      } else {
        this.isLoading = false;
      }
    });
  }

  confirmDelete(serviceId: number): void {
    this.deleteTargetId = serviceId;
  }

  onDeleteConfirmed(): void {
    if (this.deleteTargetId === null) return;
    this.catalogService.deleteService(this.deleteTargetId).subscribe({
      next: () => {
        this.services = this.services.filter(s => s.id !== this.deleteTargetId);
        this.successMessage = 'Servicio eliminado correctamente.';
        this.deleteTargetId = null;
      },
      error: () => {
        this.errorMessage = 'Error al eliminar el servicio.';
        this.deleteTargetId = null;
      }
    });
  }

  onDeleteCancelled(): void {
    this.deleteTargetId = null;
  }
}
