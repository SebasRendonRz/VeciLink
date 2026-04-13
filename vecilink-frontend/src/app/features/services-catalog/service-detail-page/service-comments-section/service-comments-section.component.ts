import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RatingService } from '../../../../core/services/rating.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Rating } from '../../../../core/models';

@Component({
  standalone: false,
  selector: 'app-service-comments-section',
  templateUrl: './service-comments-section.component.html',
  styleUrls: ['./service-comments-section.component.css']
})
export class ServiceCommentsSectionComponent implements OnInit {
  @Input() serviceId!: number;

  ratings: Rating[] = [];
  ratingForm!: FormGroup;
  selectedStars = 0;
  isLoggedIn = false;
  isSubmitting = false;
  successMessage = '';

  constructor(
    private ratingService: RatingService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.loadRatings();
    this.ratingForm = this.fb.group({
      comment: ['']
    });
  }

  loadRatings(): void {
    this.ratingService.listRatings(this.serviceId).subscribe(r => this.ratings = r);
  }

  setStars(stars: number): void {
    this.selectedStars = stars;
  }

  onSubmitRating(): void {
    if (this.selectedStars === 0) return;
    this.isSubmitting = true;
    const user = this.authService.getCurrentUser();
    this.ratingService.addRating({
      serviceId: this.serviceId,
      userId: user?.id ?? 0,
      stars: this.selectedStars,
      comment: this.ratingForm.value.comment,
      createdAt: new Date().toISOString(),
      userName: user?.fullName ?? 'Anónimo'
    }).subscribe(() => {
      this.isSubmitting = false;
      this.successMessage = '¡Calificación enviada correctamente!';
      this.selectedStars = 0;
      this.ratingForm.reset();
      this.loadRatings();
    });
  }
}
