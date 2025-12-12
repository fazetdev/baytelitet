'use client';

import { MapPin, Bed, Bath, Square, Eye, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';
// Assuming formatCurrency is available in this path
import { formatCurrency } from '@/lib/formatters'; 

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    features: string[];
    status: string;
    virtualTour: boolean;
    goldenVisaEligible: boolean;
    rentalYield: string;
  };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    // Card uses cool accent border on hover
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-bayt-cool/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Section */}
      {/* Image background uses a gradient blend of bayt-dark and the warm accent for a rich look */}
      <div className="relative h-64 bg-gradient-to-br from-bayt-dark to-bayt-warm">
        <div className="absolute inset-0 bg-gradient-to-t from-bayt-dark/70 to-transparent"></div>
        <div className="absolute top-4 left-4">
          {/* Type Badge uses bayt-dark background */}
          <span className="bg-bayt-dark text-white px-3 py-1 rounded-full text-sm font-semibold">
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          {/* Action buttons use white/dark blur */}
          <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30">
            <Heart className="w-5 h-5 text-white" />
          </button>
          <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30">
            <Share2 className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          {/* Price uses the warm gold accent color for emphasis */}
          <div className="text-2xl font-bold text-bayt-warm">{formatCurrency(property.price)}</div>
          <div className="text-sm opacity-90 text-bayt-light">{property.status}</div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-bayt-dark mb-2 hover:text-bayt-warm cursor-pointer">
          {property.title}
        </h3>

        <div className="flex items-center text-bayt-cool mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Property Features (Beds, Baths, Area) */}
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-1">
            <Bed className="w-5 h-5 text-bayt-warm" />
            <span className="font-semibold text-bayt-dark">{property.bedrooms}</span>
            <span className="text-bayt-cool text-sm">Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-5 h-5 text-bayt-warm" />
            <span className="font-semibold text-bayt-dark">{property.bathrooms}</span>
            <span className="text-bayt-cool text-sm">Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-5 h-5 text-bayt-warm" />
            <span className="font-semibold text-bayt-dark">{property.area.toLocaleString()}</span>
            <span className="text-bayt-cool text-sm">sqft</span>
          </div>
        </div>

        {/* Key Features Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {property.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="bg-bayt-light text-bayt-dark px-3 py-1 rounded-full text-sm">
              {feature}
            </span>
          ))}
          {property.features.length > 3 && (
            <span className="bg-bayt-light text-bayt-dark px-3 py-1 rounded-full text-sm">
              +{property.features.length - 3} more
            </span>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {/* Virtual Tour Badge uses Cool Accent */}
          {property.virtualTour && (
            <span className="inline-flex items-center gap-1 bg-bayt-cool/20 text-bayt-dark px-3 py-1 rounded-full text-sm">
              <Eye className="w-3 h-3" />
              Virtual Tour
            </span>
          )}
          {/* Golden Visa Badge uses Warm Gold Accent */}
          {property.goldenVisaEligible && (
            <span className="inline-flex items-center gap-1 bg-bayt-warm/20 text-bayt-dark px-3 py-1 rounded-full text-sm">
              🏆 Golden Visa
            </span>
          )}
          {/* Rental Yield Badge uses Cultural Green Accent */}
          <span className="inline-flex items-center gap-1 bg-bayt-cultural/20 text-bayt-dark px-3 py-1 rounded-full text-sm">
            📈 {property.rentalYield} Yield
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-6 line-clamp-2">
          {property.description}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          {/* View Details Button (Primary Action) uses warm gold accent */}
          <Link 
            href={`/properties/${property.id}`}
            className="flex-1 bg-gradient-to-r from-bayt-warm to-yellow-700 text-bayt-dark text-center py-3 rounded-xl font-semibold hover:from-yellow-700 hover:to-bayt-warm transition-all"
          >
            View Details
          </Link>
          {/* Calculate Payment Button (Secondary Action) uses cool accent border */}
          <Link 
            href={`/calculator?property=${property.id}`}
            className="flex-1 border-2 border-bayt-cool text-bayt-dark text-center py-3 rounded-xl font-semibold hover:bg-bayt-light transition-all"
          >
            Calculate Payment
          </Link>
        </div>
      </div>
    </div>
  );
}
