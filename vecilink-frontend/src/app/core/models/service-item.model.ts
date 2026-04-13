export interface ServiceItem {
  id: number;
  providerId: number;
  serviceName: string;
  categoryId: number;
  categoryName?: string;
  description: string;
  neighborhood: string;
  zone?: string;
  whatsapp: string;
  schedule: string;
  availability: string;
  price?: number;
  photos?: string[];
  latitude?: number;
  longitude?: number;
  isFeatured: boolean;
  averageRating?: number;
  totalRatings?: number;
  createdAt?: string;
}
