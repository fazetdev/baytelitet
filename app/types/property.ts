export interface Property {
  id: string;
  title: string;
  price: number;
  type: string;
  city: string;
  beds?: number;
  baths?: number;
  area?: number;
  image?: string;
  lat?: number;
  lng?: number;
  
  // Gulf-specific fields
  reraNumber?: string;
  escrowRequired?: boolean;
  complianceStatus?: string;
  isPublished?: boolean;
}
