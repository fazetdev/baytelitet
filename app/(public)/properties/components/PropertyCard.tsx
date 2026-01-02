'use client';

import { useState, useEffect } from 'react';
import { MapPin, Bed, Bath, Square, Heart, Home } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/formatters';

interface PropertyCardProps {
  property: {
    id: string | number;
    title: string;
    price: number;
    location: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    description?: string;
    area?: number;
    status?: string;
    rentalYield?: string;
    images?: string[];
  };
  language?: 'ar' | 'en';
}

export default function PropertyCard({ property, language = 'en' }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle image cycling with proper null checks
  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const images = property.images || [];
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  // Handle previous image with proper null checks
  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const images = property.images || [];
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  if (!mounted) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 animate-pulse">
        <div className="h-48 bg-gray-200"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  const images = property.images || [];
  const currentImage = images[currentImageIndex];
  const totalImages = images.length;

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        {currentImage ? (
          <div className="relative w-full h-full">
            <img
              src={currentImage}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="%239ca3af" text-anchor="middle" dy=".3em">No Image</text></svg>';
              }}
            />
            
            {/* Image navigation buttons if multiple images */}
            {totalImages > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full"
                >
                  ←
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full"
                >
                  →
                </button>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Home className="w-12 h-12 text-gray-400" />
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsFavorite(!isFavorite); }}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>

        {/* Property type badge */}
        <div className="absolute top-3 left-3">
          <div className="bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded-full">
            {property.type}
          </div>
        </div>

        {/* Image counter */}
        {totalImages > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {currentImageIndex + 1}/{totalImages}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Price and Title */}
        <div className="mb-3">
          <div className="text-lg font-bold text-gray-900 mb-1 truncate">{property.title}</div>
          <div className="text-blue-600 font-bold text-xl">{formatCurrency(property.price)}</div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-600 text-sm mb-4">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{property.location}</span>
        </div>

        {/* Property Features */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{property.bedrooms}</span>
            <span className="text-xs text-gray-500 ml-1">Beds</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{property.bathrooms}</span>
            <span className="text-xs text-gray-500 ml-1">Baths</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{property.area?.toLocaleString() || '0'}</span>
            <span className="text-xs text-gray-500 ml-1">sqft</span>
          </div>
        </div>

        {/* Action Button */}
        <Link 
          href={`/properties/${property.id}`}
          className="mt-4 block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-2.5 rounded-lg transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
