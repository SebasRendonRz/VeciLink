import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ProviderService } from '../../../core/services/provider.service';
import { ProviderProfile } from '../../../core/models';

@Component({
  standalone: false,
  selector: 'app-provider-profile-form',
  templateUrl: './provider-profile-form.component.html',
  styleUrls: ['./provider-profile-form.component.css']
})
export class ProviderProfileFormComponent implements OnInit {
  form!: FormGroup;
  provider: ProviderProfile | null = null;
  isLoading = true;
  isSaving = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private providerService: ProviderService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      providerName: ['', Validators.required],
      whatsapp: ['', Validators.required],
      neighborhood: ['', Validators.required],
      zone: [''],
      schedule: ['', Validators.required],
      availability: ['', Validators.required],
      description: [''],
      photoUrl: ['']
    });

    const user = this.authService.getCurrentUser();
    if (user) {
      this.providerService.getProviderProfileByUserId(user.id).subscribe(profile => {
        this.provider = profile ?? null;
        if (profile) {
          this.form.patchValue(profile);
        }
        this.isLoading = false;
      });
    }
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (!this.provider) return;

    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.providerService.updateProviderProfile(this.provider.id, this.form.value).subscribe({
      next: () => {
        this.isSaving = false;
        this.successMessage = 'Perfil actualizado correctamente.';
      },
      error: () => {
        this.isSaving = false;
        this.errorMessage = 'Error al guardar los cambios.';
      }
    });
  }
}
