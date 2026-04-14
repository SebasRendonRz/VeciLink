export interface ServiceItem {
  id: number;
  serviceName: string;
  neighborhood: string;
  zone?: string;
  price?: number;
  isFeatured: boolean;
  isActive?: boolean;
  categoryName?: string;
  providerProfileId?: number;
  providerId?: number;
  providerUserId?: number;
  providerName?: string;
  providerRatingAverage?: number;
  createdAt?: string;

  // Campos opcionales para otros endpoints/usos
  categoryId?: number;
  description?: string;
  whatsapp?: string;
  schedule?: string;
  availability?: string;
  photos?: string[];
  latitude?: number;
  longitude?: number;
  averageRating?: number;
  totalRatings?: number;
}
