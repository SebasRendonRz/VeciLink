import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReportItem } from '../models';
import { ApiBaseService, ApiResponse } from './api-base.service';

@Injectable({ providedIn: 'root' })
export class ReportService extends ApiBaseService {
  constructor(http: HttpClient) { super(http); }

  private normalizeReport(report: ReportItem): ReportItem {
    return {
      ...report,
      status: String(report.status).toLowerCase() as ReportItem['status']
    };
  }

  createReport(report: Omit<ReportItem, 'id' | 'status' | 'createdAt'>): Observable<ReportItem> {
    return this.unwrap(this.http.post<ApiResponse<ReportItem>>(`${this.baseUrl}/reports`, report)).pipe(
      map(created => this.normalizeReport(created))
    );
  }

  listReports(): Observable<ReportItem[]> {
    return this.unwrap(this.http.get<ApiResponse<ReportItem[]>>(`${this.baseUrl}/reports`)).pipe(
      map(reports => reports.map(report => this.normalizeReport(report)))
    );
  }

  changeReportStatus(id: number, status: ReportItem['status']): Observable<boolean> {
    return this.http.put(`${this.baseUrl}/reports/${id}/status`, { status }).pipe(map(() => true));
  }
}
