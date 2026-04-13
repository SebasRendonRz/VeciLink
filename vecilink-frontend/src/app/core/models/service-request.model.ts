export interface ServiceRequest {
  id: number;
  userId: number;
  serviceId: number;
  status: 'pending' | 'contacted' | 'closed';
  createdAt: string;
}
