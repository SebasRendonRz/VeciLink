export interface Rating {
  id: number;
  serviceId: number;
  userId: number;
  stars: number;
  comment: string;
  createdAt: string;
  userName?: string;
  userFullName?: string;
}
