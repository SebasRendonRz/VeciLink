import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ProviderService } from '../../../core/services/provider.service';
import { ProviderProfile } from '../../../core/models/provider-profile.model';

@Component({
  selector: 'app-admin-featured-page',
  templateUrl: './admin-featured-page.component.html',
  styleUrls: ['./admin-featured-page.component.css'],
  standalone: false
})
export class AdminFeaturedPageComponent implements OnInit {
  providers: ProviderProfile[] = [];
  isLoading = true;
  alertMessage = '';
  alertType: 'success' | 'danger' = 'success';

  constructor(private providerService: ProviderService) {}

  ngOnInit(): void {
    this.providerService.getAllProviders().pipe(finalize(() => this.isLoading = false)).subscribe(data => {
      this.providers = data;
    });
  }

  toggleFeatured(provider: ProviderProfile): void {
    const newVal = !provider.isFeatured;
    this.providerService.setFeatured(provider.id, newVal).subscribe(ok => {
      if (ok) {
        provider.isFeatured = newVal;
        this.alertMessage = `Prestador ${newVal ? 'marcado como destacado' : 'desmarcado'}.`;
        this.alertType = 'success';
      } else {
        this.alertMessage = 'No se pudo actualizar el estado.';
        this.alertType = 'danger';
      }
    });
  }
}
