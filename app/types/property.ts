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
  complianceStatus?: 'pending' | 'verified' | 'rejected' | 'draft';
  isPublished?: boolean;

  // Agent fields
  agentId?: string;
  agentName?: string;
  agentLicense?: string;
  agentPhone?: string;
  agentEmail?: string;
  agentPicture?: string;
  commissionRate?: number;

  // Additional fields from form/store
  currency?: string;
  address?: string;
  jurisdiction?: string;
  propertyType?: string;
  areaUnit?: 'sqft' | 'sqm';
  heroImage?: string;
  gallery?: string[];
  offPlan?: boolean;
  description?: string;
  country?: string;
  state?: string;
}

export interface PropertyFilters {
  type?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
}
