'use client';

import React from 'react';
import { X, MapPin, Bed, Bath, Maximize, TrendingUp, ExternalLink } from 'lucide-react';
import { Property } from '@/context/useProperties';
import { formatCurrency } from '@/lib/formatters';

interface PropertyDetailsModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'ar';
}

export default function PropertyDetailsModal({ property, isOpen, onClose, language }: PropertyDetailsModalProps) {
  if (!isOpen) return null;
  const isRTL = language === 'ar';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        dir={isRTL ? 'rtl' : 'ltr'}
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl relative flex flex-col"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-white/90 p-2 rounded-full shadow-lg hover:bg-bayt-warm transition-colors"
        >
          <X className="w-6 h-6 text-bayt-dark" />
        </button>

        <div className="overflow-y-auto">
          {/* Image/Tour Header */}
          <div className="relative h-64 md:h-96 bg-gray-200">
            <img 
              src={property.images[0]} 
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold text-bayt-dark">{property.title}</h2>
                <p className="flex items-center text-gray-500 text-sm mt-1">
                  <MapPin className="w-4 h-4 mr-1 ml-1" /> {property.location}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="flex gap-6 py-4 border-y border-gray-100">
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-bayt-warm" />
                  <span className="font-bold">{property.bedrooms}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5 text-bayt-warm" />
                  <span className="font-bold">{property.bathrooms}</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">{isRTL ? 'وصف العقار' : 'Description'}</h3>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-3xl space-y-6">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                  {isRTL ? 'السعر' : 'Price'}
                </p>
                <p className="text-3xl font-bold text-bayt-dark">
                  {formatCurrency(property.price)}
                </p>
              </div>
              
              <button 
                onClick={() => window.location.href = `/properties/${property.id}`}
                className="w-full bg-bayt-dark text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-bayt-warm transition-all"
              >
                {isRTL ? 'ابدأ الجولة الافتراضية' : 'Start Virtual Tour'}
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
