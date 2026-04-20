import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AdvertisementService } from '../../../core/services/advertisement.service';
import { Advertisement } from '../../../core/models/advertisement.model';

@Component({
  selector: 'app-admin-ads-page',
  templateUrl: './admin-ads-page.component.html',
  styleUrls: ['./admin-ads-page.component.css'],
  standalone: false
})
export class AdminAdsPageComponent implements OnInit {
  ads: Advertisement[] = [];
  isLoading = true;
  showForm = false;
  editingId: number | null = null;
  formData: Partial<Advertisement> = {};
  alertMessage = '';
  alertType: 'success' | 'danger' = 'success';
  imagePreview: string | null = null;
  selectedImageFile: File | null = null;

  constructor(private adService: AdvertisementService) {}

  ngOnInit(): void {
    this.loadAds();
  }

  loadAds(): void {
    this.isLoading = true;
    this.adService.listAllAds().pipe(finalize(() => this.isLoading = false)).subscribe(data => {
      this.ads = data;
    });
  }

  openCreate(): void {
    this.editingId = null;
    this.formData = { isActive: true };
    this.imagePreview = null;
    this.selectedImageFile = null;
    this.showForm = true;
  }

  openEdit(ad: Advertisement): void {
    this.editingId = ad.id;
    this.formData = { ...ad };
    this.imagePreview = ad.imageUrl || null;
    this.selectedImageFile = null;
    this.showForm = true;
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.selectedImageFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.formData.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  saveForm(): void {
    if (!this.formData.title || !this.formData.imageUrl) return;
    if (this.editingId !== null) {
      this.adService.editAd(this.editingId, this.formData).subscribe(updated => {
        if (updated) {
          const idx = this.ads.findIndex(a => a.id === updated!.id);
          if (idx > -1) this.ads[idx] = updated!;
        }
        this.alertMessage = 'Anuncio actualizado.';
        this.alertType = 'success';
        this.showForm = false;
      });
    } else {
      this.adService.createAd(this.formData as Advertisement).subscribe(created => {
        this.ads.push(created);
        this.alertMessage = 'Anuncio creado.';
        this.alertType = 'success';
        this.showForm = false;
      });
    }
  }

  deactivate(ad: Advertisement): void {
    this.adService.deactivateAd(ad.id).subscribe(ok => {
      if (ok) {
        ad.isActive = false;
        this.alertMessage = 'Anuncio desactivado.';
        this.alertType = 'success';
      }
    });
  }
}
