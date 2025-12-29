'use client';
import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet default icon in Next.js
const markerIcon = require('leaflet/dist/images/marker-icon.png');
const markerShadow = require('leaflet/dist/images/marker-shadow.png');

interface PropertyMapProps {
  latitude?: number | string;
  longitude?: number | string;
  zoom?: number;
  title?: string;
  className?: string;
}

export default function PropertyMap({
  latitude,
  longitude,
  zoom = 13,
  title = "Property Location",
  className = '',
}: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Parse coordinates
  const parseCoordinate = (coord: number | string | undefined): number | null => {
    if (coord === undefined || coord === null || coord === '') {
      return null;
    }
    const num = typeof coord === 'string' ? parseFloat(coord) : coord;
    return isNaN(num) ? null : num;
  };

  const lat = parseCoordinate(latitude);
  const lng = parseCoordinate(longitude);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mounted || !mapRef.current || mapInstance.current) return;

    if (lat === null || lng === null) {
      setError('Coordinates not provided');
      return;
    }

    try {
      // Fix Leaflet icon
      const DefaultIcon = L.icon({
        iconUrl: markerIcon.default?.src || markerIcon.default || markerIcon,
        shadowUrl: markerShadow.default?.src || markerShadow.default || markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });
      L.Marker.prototype.options.icon = DefaultIcon;

      // Create map
      mapInstance.current = L.map(mapRef.current).setView([lat, lng], zoom);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance.current);

      // Add marker
      L.marker([lat, lng])
        .addTo(mapInstance.current)
        .bindPopup(`<b>${title}</b>`)
        .openPopup();

      setError(null);
    } catch (err) {
      console.error('Map error:', err);
      setError('Failed to load map');
    }

  }, [mounted, lat, lng, zoom, title]);

  if (!mounted) {
    return (
      <div className={`h-[450px] bg-gray-100 flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-bayt-gold border-t-transparent animate-spin rounded-full mx-auto mb-2" />
          <p className="text-gray-600 text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`h-[450px] bg-gray-100 flex items-center justify-center ${className}`}>
        <div className="text-center">
          <p className="text-red-500 font-semibold mb-2">Map Error</p>
          <p className="text-gray-600 text-sm">{error}</p>
          <p className="text-gray-500 text-xs mt-2">
            Coordinates: {lat === null ? 'No lat' : lat.toFixed(6)}, {lng === null ? 'No lng' : lng.toFixed(6)}
          </p>
        </div>
      </div>
    );
  }

  if (lat === null || lng === null) {
    return (
      <div className={`h-[450px] bg-gray-100 flex items-center justify-center ${className}`}>
        <div className="text-center">
          <p className="text-amber-600 font-semibold mb-2">No Coordinates</p>
          <p className="text-gray-600 text-sm">This property has no location coordinates.</p>
          <p className="text-gray-500 text-xs mt-2">
            Please add latitude and longitude in the property form.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={mapRef}
        className={`w-full h-[450px] rounded-lg ${className}`}
      />
      <div className="absolute bottom-4 left-4 bg-black/70 text-white p-2 rounded text-xs">
        <div>Lat: {lat.toFixed(6)}</div>
        <div>Lng: {lng.toFixed(6)}</div>
      </div>
    </div>
  );
}
