import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ServiceCatalogService } from '../../../core/services/service-catalog.service';
import { ServiceItem } from '../../../core/models/service-item.model';

@Component({
  selector: 'app-admin-services-page',
  templateUrl: './admin-services-page.component.html',
  styleUrls: ['./admin-services-page.component.css'],
  standalone: false
})
export class AdminServicesPageComponent implements OnInit {
  services: ServiceItem[] = [];
  filtered: ServiceItem[] = [];
  categories: string[] = [];
  filterCategory = '';
  isLoading = true;
  confirmDeleteId: number | null = null;
  alertMessage = '';
  alertType: 'success' | 'danger' = 'success';

  constructor(private serviceCatalog: ServiceCatalogService) {}

  ngOnInit(): void {
    this.serviceCatalog.listServices().pipe(finalize(() => this.isLoading = false)).subscribe(data => {
      this.services = data;
      this.categories = [...new Set(data.map(s => s.categoryName ?? '').filter(Boolean))];
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filtered = this.filterCategory
      ? this.services.filter(s => s.categoryName === this.filterCategory)
      : [...this.services];
  }

  requestDelete(id: number): void {
    this.confirmDeleteId = id;
  }

  confirmDelete(): void {
    if (this.confirmDeleteId === null) return;
    this.serviceCatalog.deleteService(this.confirmDeleteId).subscribe(ok => {
      if (ok) {
        this.services = this.services.filter(s => s.id !== this.confirmDeleteId);
        this.applyFilters();
        this.alertMessage = 'Servicio eliminado correctamente.';
        this.alertType = 'success';
      } else {
        this.alertMessage = 'No se pudo eliminar el servicio.';
        this.alertType = 'danger';
      }
      this.confirmDeleteId = null;
    });
  }

  cancelDelete(): void {
    this.confirmDeleteId = null;
  }
}
