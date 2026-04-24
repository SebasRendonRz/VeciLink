import { Component, OnInit } from '@angular/core';
import { RequestHistoryService } from '../../../core/services/request-history.service';
import { CategoryService } from '../../../core/services/category.service';
import { ServiceRequest } from '../../../core/models/service-request.model';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-my-requests-page',
  standalone: false,
  templateUrl: './my-requests-page.component.html',
  styleUrl: './my-requests-page.component.css'
})
export class MyRequestsPageComponent implements OnInit {
  requests: ServiceRequest[] = [];
  categories: Category[] = [];
  selectedCategoryId: number | null = null;
  loading = false;

  constructor(
    private requestHistoryService: RequestHistoryService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.listCategories().subscribe(cats => {
      this.categories = cats.filter(c => c.isActive);
    });
    this.loadRequests();
  }

  loadRequests(): void {
    this.loading = true;
    const catId = this.selectedCategoryId ?? undefined;
    this.requestHistoryService.getMyHistory(catId).subscribe({
      next: data => {
        this.requests = data;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  onCategoryChange(value: string): void {
    this.selectedCategoryId = value ? +value : null;
    this.loadRequests();
  }

  getStatusLabel(status: ServiceRequest['status']): string {
    const labels: Record<ServiceRequest['status'], string> = {
      Pending: 'Pendiente',
      Contacted: 'Contactado',
      Closed: 'Cerrado'
    };
    return labels[status] ?? status;
  }

  getStatusClass(status: ServiceRequest['status']): string {
    const classes: Record<ServiceRequest['status'], string> = {
      Pending: 'badge bg-warning text-dark',
      Contacted: 'badge bg-primary',
      Closed: 'badge bg-secondary'
    };
    return classes[status] ?? 'badge bg-secondary';
  }
}
