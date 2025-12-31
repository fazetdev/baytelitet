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

  // Agent fields
  agentId?: string; // Added agentId for database reference
  agentName?: string;
  agentLicense?: string;
  agentPhone?: string;
  agentEmail?: string;
  agentPicture?: string; // Added agent picture
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
