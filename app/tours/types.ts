export interface VirtualTour {
  id: number;
  title: string;
  titleAr: string;
  property: string;
  propertyAr: string;
  description?: string;
  descriptionAr?: string;
  duration: string;
  type: string;
  typeAr: string;
  features: string[];
  featuresAr: string[];
  videoUrl?: string;
  tourUrl?: string;
  thumbnail: string;
  latitude?: number;
  longitude?: number;
  price?: number;
  priceAr?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  areaUnit?: 'sqft' | 'sqm';
  status?: 'available' | 'sold' | 'rented';
  createdAt: Date;
  updatedAt: Date;
}

export interface TourRecording {
  id: string;
  tourId: number;
  videoBlob?: Blob;
  videoUrl?: string;
  duration: number;
  createdAt: Date;
}

export interface TourViewMode {
  mode: 'day' | 'dusk' | 'night';
  brightness: number;
  season: 'winter' | 'spring' | 'summer' | 'autumn';
}
