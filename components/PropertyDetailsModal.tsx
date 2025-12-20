'use client';

import { X } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  description: string;
  lat: number;
  lng: number;
}

interface Props {
  property: Property | null;
  onClose: () => void;
}

export default function PropertyDetailsModal({ property, onClose }: Props) {
  if (!property) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-modal">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-bayt-dark">
            {property.title}
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="text-lg text-bayt-warm font-bold">
            {property.price}
          </div>

          <div className="text-sm text-gray-600">
            {property.location}
          </div>

          <p className="text-sm text-gray-700">
            {property.description}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-bayt-dark text-white text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
