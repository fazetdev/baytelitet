'use client';

import React from 'react';
import { X, Bed, Bath, Maximize, MapPin, TrendingUp } from 'lucide-react';
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
      <div className="bg-white rounded-3xl w-full max-max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white z-10">
          <X className="w-6 h-6 text-bayt-dark" />
        </button>
        
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-2">{property.title}</h2>
          <p className="flex items-center text-gray-500 mb-6">
            <MapPin className="w-4 h-4 mr-1" /> {property.location}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center">
              <Bed className="w-6 h-6 text-bayt-warm mb-1" />
              <span className="font-bold">{property.bedrooms}</span>
              <span className="text-xs text-gray-500 uppercase">{isRTL ? 'غرف' : 'Beds'}</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center">
              <Bath className="w-6 h-6 text-bayt-warm mb-1" />
              <span className="font-bold">{property.bathrooms}</span>
              <span className="text-xs text-gray-500 uppercase">{isRTL ? 'حمام' : 'Baths'}</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center">
              <TrendingUp className="w-6 h-6 text-bayt-warm mb-1" />
              <span className="font-bold">{property.rentalYield || '7.2%'}</span>
              <span className="text-xs text-gray-500 uppercase">{isRTL ? 'عائد' : 'Yield'}</span>
            </div>
          </div>

          <div className="text-3xl font-bold text-bayt-dark mb-6">
            {formatCurrency(property.price)}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {property.description}
          </p>

          <button className="w-full bg-bayt-dark text-white py-4 rounded-2xl font-bold hover:bg-bayt-warm hover:text-bayt-dark transition-colors">
            {isRTL ? 'تواصل معنا الآن' : 'Contact Agent Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
