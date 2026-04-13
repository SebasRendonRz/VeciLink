import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ReportService } from '../../../core/services/report.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-report-user-form',
  templateUrl: './report-user-form.component.html',
  styleUrls: ['./report-user-form.component.css'],
  standalone: false
})
export class ReportUserFormComponent implements OnInit {
  form!: FormGroup;
  targetUserId!: number;
  isSaving = false;
  successMessage = '';
  errorMessage = '';

  reasons = [
    'Comportamiento inapropiado',
    'Suplantación de identidad',
    'Lenguaje ofensivo',
    'Acoso o amenazas',
    'Información falsa',
    'Otro'
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public location: Location,
    private reportService: ReportService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.targetUserId = Number(this.route.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      reason: ['', Validators.required],
      detail: ['']
    });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const user = this.authService.getCurrentUser();
    if (!user) { this.router.navigate(['/login']); return; }

    this.isSaving = true;
    this.reportService.createReport({
      reporterUserId: user.id,
      reportedUserId: this.targetUserId,
      reason: this.form.value.detail
        ? `${this.form.value.reason}: ${this.form.value.detail}`
        : this.form.value.reason
    }).subscribe({
      next: () => {
        this.successMessage = 'Reporte enviado correctamente. Nuestro equipo lo revisará pronto.';
        this.isSaving = false;
        this.form.reset();
      },
      error: () => {
        this.errorMessage = 'Error al enviar el reporte.';
        this.isSaving = false;
      }
    });
  }
}
