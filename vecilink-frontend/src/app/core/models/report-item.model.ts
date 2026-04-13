export interface ReportItem {
  id: number;
  reporterUserId: number;
  reportedUserId?: number;
  reportedServiceId?: number;
  reason: string;
  createdAt: string;
  status: 'pending' | 'reviewed' | 'closed';
}
