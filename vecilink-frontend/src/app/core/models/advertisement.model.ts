export interface Advertisement {
  id: number;
  title: string;
  imageUrl: string;
  redirectUrl?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}
