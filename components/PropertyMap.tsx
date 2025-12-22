'use client';

import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  title?: string;
}

export default function PropertyMap({ 
  latitude = 25.2048, 
  longitude = 55.2708, 
  zoom = 14, 
  title = 'Property Location' 
}: PropertyMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !mapContainer.current || mapRef.current) return;

    const initMap = async () => {
      try {
        setIsLoading(true);
        
        // Ensure Leaflet is available
        if (typeof window === 'undefined' || !L) {
          throw new Error('Leaflet not available');
        }

        // Create map instance
        mapRef.current = L.map(mapContainer.current!).setView([latitude, longitude], zoom);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        }).addTo(mapRef.current);

        // Add marker
        const marker = L.marker([latitude, longitude]).addTo(mapRef.current);
        marker.bindPopup(`<b>${title}</b><br>${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);

        setIsLoading(false);
        setError(null);
      } catch (err: any) {
        console.error('Map initialization error:', err);
        setError(err.message || 'Failed to load map');
        setIsLoading(false);
      }
    };

    initMap();

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mounted, latitude, longitude, zoom, title]);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-gray-100 animate-pulse rounded-3xl flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-bayt-warm mb-2"></div>
          <p className="text-sm text-gray-500">Initializing map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex flex-col items-center justify-center p-6 text-center">
        <div className="text-4xl mb-4">🗺️</div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">Interactive Map</h3>
        <p className="text-gray-600">Coordinates: {latitude.toFixed(6)}, {longitude.toFixed(6)}</p>
        <p className="text-gray-600 mb-4">Zoom: {zoom}</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-2">
          <p className="text-sm text-yellow-700">Mapbox/Google Maps integration coming soon</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative rounded-3xl overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-bayt-warm mb-2"></div>
            <p className="text-sm text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      
      <div 
        ref={mapContainer} 
        className="w-full h-full rounded-3xl"
        style={{ minHeight: '400px' }}
      />
      
      {/* Map attribution */}
      <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm text-xs text-gray-600 px-2 py-1 rounded">
        © OpenStreetMap
      </div>
    </div>
  );
}
