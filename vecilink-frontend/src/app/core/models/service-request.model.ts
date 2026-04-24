export interface ServiceRequest {
  id: number;
  userId: number;
  userFullName?: string;
  serviceId: number;
  serviceName?: string;
  providerName?: string;
  categoryId?: number;
  categoryName?: string;
  status: 'Pending' | 'Contacted' | 'Closed';
  createdAt: string;
  updatedAt?: string;
}
