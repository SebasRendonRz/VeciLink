import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RatingService } from '../../../core/services/rating.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.css'],
  standalone: false
})
export class RatingFormComponent implements OnInit {
  @Input() serviceId!: number;
  @Output() ratingSubmitted = new EventEmitter<void>();

  form!: FormGroup;
  hoveredStar = 0;
  isSaving = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private ratingService: RatingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      stars: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['']
    });
  }

  setStars(value: number): void {
    this.form.patchValue({ stars: value });
  }

  onSubmit(): void {
    if (this.form.invalid || this.form.value.stars === 0) {
      this.errorMessage = 'Por favor selecciona una calificación de 1 a 5 estrellas.';
      return;
    }
    const user = this.authService.getCurrentUser();
    if (!user) return;

    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.ratingService.addRating({
      serviceId: this.serviceId,
      userId: user.id,
      stars: this.form.value.stars,
      comment: this.form.value.comment || '',
      createdAt: new Date().toISOString(),
      userName: user.fullName
    }).subscribe({
      next: () => {
        this.successMessage = '¡Calificación enviada correctamente!';
        this.isSaving = false;
        this.form.reset({ stars: 0, comment: '' });
        this.ratingSubmitted.emit();
      },
      error: () => {
        this.errorMessage = 'Error al enviar la calificación.';
        this.isSaving = false;
      }
    });
  }
}
