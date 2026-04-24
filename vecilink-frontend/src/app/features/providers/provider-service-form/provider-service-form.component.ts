import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCatalogService } from '../../../core/services/service-catalog.service';
import { CategoryService } from '../../../core/services/category.service';
import { ProviderService } from '../../../core/services/provider.service';
import { AuthService } from '../../../core/services/auth.service';
import { Category, ProviderProfile, ProviderQuota } from '../../../core/models';

@Component({
  selector: 'app-provider-service-form',
  templateUrl: './provider-service-form.component.html',
  styleUrls: ['./provider-service-form.component.css'],
  standalone: false
})
export class ProviderServiceFormComponent implements OnInit {
  form!: FormGroup;
  categories: Category[] = [];
  provider: ProviderProfile | undefined;
  quota: ProviderQuota | null = null;
  isEditMode = false;
  editServiceId: number | null = null;
  isLoading = true;
  isSaving = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private catalogService: ServiceCatalogService,
    private categoryService: CategoryService,
    private providerService: ProviderService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (!user) { this.router.navigate(['/login']); return; }

    const idParam = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!idParam;
    this.editServiceId = idParam ? +idParam : null;

    this.form = this.fb.group({
      serviceName: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: ['', Validators.required],
      neighborhood: ['', Validators.required],
      zone: [''],
      whatsapp: ['', Validators.required],
      schedule: ['', Validators.required],
      availability: ['', Validators.required],
      price: [null],
      photoUrl: ['']
    });

    this.categoryService.listCategories().subscribe(cats => {
      this.categories = cats;
    });

    this.providerService.getProviderProfileByUserId(user.id).subscribe(p => {
      this.provider = p ?? undefined;
      if (p) {
        // Pre-fill common fields from provider profile
        this.form.patchValue({
          neighborhood: p.neighborhood,
          zone: p.zone || '',
          whatsapp: p.whatsapp,
          schedule: p.schedule,
          availability: p.availability
        });

        // Load quota info for non-edit mode
        if (!this.isEditMode) {
          this.providerService.getProviderQuota(p.id).subscribe(q => {
            this.quota = q;
          });
        }

        if (this.isEditMode && this.editServiceId !== null) {
          this.catalogService.getServiceDetail(this.editServiceId).subscribe(svc => {
            const firstPhoto = svc.photos && svc.photos.length > 0
              ? ((svc.photos[0] as any).imageUrl ?? svc.photos[0])
              : '';
            this.form.patchValue({
              serviceName: svc.serviceName,
              categoryId: svc.categoryId,
              description: svc.description,
              neighborhood: svc.neighborhood,
              zone: svc.zone || '',
              whatsapp: svc.whatsapp,
              schedule: svc.schedule,
              availability: svc.availability,
              price: svc.price ?? null,
              photoUrl: firstPhoto
            });
            this.isLoading = false;
          });
        } else {
          this.isLoading = false;
        }
      } else {
        this.isLoading = false;
      }
    });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    if (this.form.invalid || !this.provider) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';

    const raw = this.form.value;
    const categoryName = this.categories.find(c => c.id === +raw.categoryId)?.name || '';
    const payload = {
      providerId: this.provider.id,
      providerProfileId: this.provider.id,
      serviceName: raw.serviceName,
      categoryId: +raw.categoryId,
      categoryName,
      description: raw.description,
      neighborhood: raw.neighborhood,
      zone: raw.zone,
      whatsapp: raw.whatsapp,
      schedule: raw.schedule,
      availability: raw.availability,
      price: raw.price ? +raw.price : undefined,
      photos: raw.photoUrl ? [raw.photoUrl] : [],
      isFeatured: false,
      isActive: true
    };

    if (this.isEditMode && this.editServiceId !== null) {
      this.catalogService.editService(this.editServiceId, payload).subscribe({
        next: () => {
          this.successMessage = 'Servicio actualizado correctamente.';
          this.isSaving = false;
          setTimeout(() => this.router.navigate(['/provider/services']), 1200);
        },
        error: () => {
          this.errorMessage = 'Error al actualizar el servicio.';
          this.isSaving = false;
        }
      });
    } else {
      this.catalogService.createService(payload).subscribe({
        next: () => {
          this.successMessage = 'Servicio creado correctamente.';
          this.isSaving = false;
          setTimeout(() => this.router.navigate(['/provider/services']), 1200);
        },
        error: (err) => {
          const msg: string = err?.error?.message ?? '';
          this.errorMessage = msg || 'Error al crear el servicio.';
          this.isSaving = false;
        }
      });
    }
  }
}
