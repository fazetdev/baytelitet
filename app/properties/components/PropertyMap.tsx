'use client';

import { useState, useEffect } from 'react';

interface PropertyMapProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  className?: string;
}

export default function PropertyMap({
  latitude = 25.276987,
  longitude = 55.296249,
  zoom = 12,
  className = '',
}: PropertyMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Simulate loading delay for map library
  useEffect(() => {
    const timer = setTimeout(() => setMapLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!mapLoaded) {
    return <div className={`h-64 md:h-96 bg-gray-100 animate-pulse rounded-xl ${className}`} />;
  }

  return (
    <div className={`w-full h-64 md:h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex flex-col items-center justify-center text-gray-700 rounded-xl ${className}`}>
      <div className="text-center p-4">
        <div className="text-lg font-semibold mb-2">Interactive Map</div>
        <div className="text-sm">Coordinates: {latitude.toFixed(6)}, {longitude.toFixed(6)}</div>
        <div className="text-sm mt-1">Zoom: {zoom}</div>
        <div className="text-xs mt-4 text-gray-500">
          (Mapbox/Google Maps integration coming soon)
        </div>
      </div>
    </div>
  );
}
