import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const pass = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pass === confirm ? null : { passwordsMismatch: true };
}

@Component({
  standalone: false,
  selector: 'app-register-provider-form',
  templateUrl: './register-provider-form.component.html',
  styleUrls: ['./register-provider-form.component.css']
})
export class RegisterProviderFormComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      neighborhood: ['', Validators.required],
      phone: ['', Validators.required],
      providerName: ['', Validators.required],
      schedule: ['', Validators.required],
      availability: ['', Validators.required],
      description: ['']
    }, { validators: passwordsMatch });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    const { fullName, email, password, neighborhood, phone, providerName, schedule, availability, description } = this.form.value;

    this.authService.register({ fullName, email, password, neighborhood, phone, providerName, schedule, availability, description, role: 'provider' }).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/provider']);
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Ocurrió un error al registrarse. Intenta de nuevo.';
      }
    });
  }
}
