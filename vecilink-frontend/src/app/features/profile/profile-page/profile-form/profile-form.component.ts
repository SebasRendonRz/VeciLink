import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css'],
  standalone: false
})
export class ProfileFormComponent implements OnInit {
  @Input() user!: User;
  @Output() profileUpdated = new EventEmitter<User>();

  form!: FormGroup;
  isSaving = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fullName: [this.user.fullName || '', Validators.required],
      phone: [this.user.phone || ''],
      neighborhood: [this.user.neighborhood || '']
    });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.userService.updateProfile(this.user.id, this.form.value).subscribe({
      next: updated => {
        this.successMessage = 'Perfil actualizado correctamente.';
        this.isSaving = false;
        if (updated) this.profileUpdated.emit(updated);
      },
      error: () => {
        this.errorMessage = 'Error al actualizar el perfil.';
        this.isSaving = false;
      }
    });
  }
}
