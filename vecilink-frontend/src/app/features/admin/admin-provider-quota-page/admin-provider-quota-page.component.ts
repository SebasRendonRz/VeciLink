import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ProviderService } from '../../../core/services/provider.service';
import { ProviderProfile } from '../../../core/models';

@Component({
  selector: 'app-admin-provider-quota-page',
  templateUrl: './admin-provider-quota-page.component.html',
  styleUrls: ['./admin-provider-quota-page.component.css'],
  standalone: false
})
export class AdminProviderQuotaPageComponent implements OnInit {
  providers: ProviderProfile[] = [];
  filtered: ProviderProfile[] = [];
  isLoading = true;
  filterName = '';

  /** Mapa profileId → activeServicesCount cargado al expandir */
  quotaMap: Record<number, { active: number; remaining: number } | null> = {};
  loadingQuota: Record<number, boolean> = {};

  editingId: number | null = null;
  editValue: number = 1;

  alertMessage = '';
  alertType: 'success' | 'danger' = 'success';

  constructor(private providerService: ProviderService) {}

  ngOnInit(): void {
    this.providerService.getAllProviders()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(data => {
        this.providers = data;
        this.applyFilter();
      });
  }

  applyFilter(): void {
    const q = this.filterName.toLowerCase().trim();
    this.filtered = q
      ? this.providers.filter(p => (p.providerName ?? '').toLowerCase().includes(q))
      : [...this.providers];
  }

  loadQuota(profileId: number): void {
    if (this.quotaMap[profileId] !== undefined) return;
    this.loadingQuota[profileId] = true;
    this.providerService.getProviderQuota(profileId).subscribe(q => {
      this.quotaMap[profileId] = q
        ? { active: q.activeServicesCount, remaining: q.remainingSlots }
        : null;
      this.loadingQuota[profileId] = false;
    });
  }

  startEdit(provider: ProviderProfile): void {
    this.editingId = provider.id;
    this.editValue = provider.maxServicesAllowed ?? 1;
  }

  cancelEdit(): void {
    this.editingId = null;
  }

  saveQuota(provider: ProviderProfile): void {
    if (this.editValue < 1) return;
    this.providerService.updateMaxServicesAllowed(provider.id, this.editValue).subscribe(ok => {
      if (ok) {
        const idx = this.providers.findIndex(p => p.id === provider.id);
        if (idx > -1) this.providers[idx] = { ...this.providers[idx], maxServicesAllowed: this.editValue };
        // Invalidate cached quota so it reloads on next expand
        delete this.quotaMap[provider.id];
        this.applyFilter();
        this.alertMessage = `Cupo de "${provider.providerName}" actualizado a ${this.editValue}.`;
        this.alertType = 'success';
      } else {
        this.alertMessage = 'No se pudo actualizar el cupo.';
        this.alertType = 'danger';
      }
      this.editingId = null;
    });
  }
}
