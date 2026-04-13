export interface ProviderProfile {
  id: number;
  userId: number;
  providerName: string;
  whatsapp: string;
  neighborhood: string;
  zone?: string;
  schedule: string;
  availability: string;
  description?: string;
  ratingAverage?: number;
  isFeatured: boolean;
  photoUrl?: string;
}
