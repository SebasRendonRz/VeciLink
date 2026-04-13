export interface User {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  role: 'citizen' | 'provider' | 'admin';
  neighborhood?: string;
  isActive: boolean;
  createdAt: string;
}
