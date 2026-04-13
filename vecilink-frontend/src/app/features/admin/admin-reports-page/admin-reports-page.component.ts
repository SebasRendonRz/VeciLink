import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ReportService } from '../../../core/services/report.service';
import { ReportItem } from '../../../core/models/report-item.model';

@Component({
  selector: 'app-admin-reports-page',
  templateUrl: './admin-reports-page.component.html',
  styleUrls: ['./admin-reports-page.component.css'],
  standalone: false
})
export class AdminReportsPageComponent implements OnInit {
  reports: ReportItem[] = [];
  isLoading = true;
  alertMessage = '';
  alertType: 'success' | 'danger' = 'success';

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.reportService.listReports().pipe(finalize(() => this.isLoading = false)).subscribe(data => {
      this.reports = data;
    });
  }

  changeStatus(report: ReportItem, status: 'pending' | 'reviewed' | 'closed'): void {
    this.reportService.changeReportStatus(report.id, status).subscribe(ok => {
      if (ok) {
        report.status = status;
        this.alertMessage = 'Estado del reporte actualizado.';
        this.alertType = 'success';
      }
    });
  }

  reportType(report: ReportItem): string {
    if (report.reportedServiceId) return 'Servicio';
    if (report.reportedUserId) return 'Usuario';
    return 'General';
  }
}
