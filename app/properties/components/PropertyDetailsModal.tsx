'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Property } from '@/context/useProperties'; // Import the correct type

interface PropertyDetailsModalProps {
  property: Property; // Use the imported type
  isOpen: boolean;
  onClose: () => void;
}

export default function PropertyDetailsModal({ property, isOpen, onClose }: PropertyDetailsModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-4xl p-6 relative overflow-y-auto max-h-[90vh] mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 z-10"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4">{property.title}</h2>
        <p className="text-gray-700 mb-4">{property.description || 'No description available'}</p>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {property.images && property.images.length > 0 ? (
            property.images.map((img, idx) => (
              <div key={idx} className="relative h-48 w-full rounded-lg overflow-hidden">
                <Image
                  src={img}
                  alt={`${property.title} image ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))
          ) : (
            <div className="col-span-2 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              No images available
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {property.type && (
            <span className="px-3 py-1 bg-bayt-warm text-bayt-dark rounded-full text-sm font-medium">
              {property.type}
            </span>
          )}
          {property.city && (
            <span className="px-3 py-1 bg-bayt-cool text-bayt-dark rounded-full text-sm font-medium">
              {property.city}
            </span>
          )}
          {property.price && (
            <span className="px-3 py-1 bg-bayt-cultural text-bayt-dark rounded-full text-sm font-medium">
              AED {property.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
