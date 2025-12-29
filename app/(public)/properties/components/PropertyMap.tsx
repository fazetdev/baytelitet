'use client';

import React from 'react';
import { MapPin } from 'lucide-react';

interface PropertyMapProps {
  latitude?: any;
  longitude?: any;
  title?: string;
  zoom?: number;
}

export default function PropertyMap({ latitude, longitude, title, zoom = 15 }: PropertyMapProps) {
  // Ensure coordinates are treated as numbers
  const lat = typeof latitude === 'string' ? parseFloat(latitude) : Number(latitude);
  const lng = typeof longitude === 'string' ? parseFloat(longitude) : Number(longitude);

  // Check if we have valid numeric coordinates
  const isValid = !isNaN(lat) && !isNaN(lng) && latitude !== undefined && longitude !== undefined;

  return (
    <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center relative min-h-[300px] border-2 border-dashed border-gray-200 rounded-xl">
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
        backgroundSize: '40px 40px' 
      }} />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="bg-blue-100 p-3 rounded-full mb-4">
          <MapPin className="w-8 h-8 text-blue-600" />
        </div>
        
        <div className="text-center px-6">
          <div className="text-lg font-bold text-gray-900 mb-1">{title || 'Property Location'}</div>
          <div className="text-sm font-mono text-gray-500 bg-white px-3 py-1 rounded-md border inline-block">
            {isValid 
              ? `${lat.toFixed(6)}, ${lng.toFixed(6)}` 
              : 'Location data pending'}
          </div>
          <p className="text-xs text-gray-400 mt-6 uppercase tracking-widest font-medium">
            Interactive Map Interface
          </p>
        </div>
      </div>
    </div>
  );
}
