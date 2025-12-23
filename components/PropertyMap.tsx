'use client';

import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface PropertyMapProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  title?: string;
  className?: string;
}

export default function PropertyMap({
  latitude = 25.2048,
  longitude = 55.2708,
  zoom = 13,
  title = "Asset Location",
  className = '',
}: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [mounted, setMounted] = useState(false);

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

    // Fix for Leaflet default icon issues in Next.js
    const DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    // Initialize Map with Executive Dark Theme
    mapInstance.current = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([latitude, longitude], zoom);

    // CartoDB Dark Matter tiles for the 7-star aesthetic
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(mapInstance.current);

    // Add High-Contrast Gold Marker
    L.circle([latitude, longitude], {
      color: '#D4AF37',
      fillColor: '#D4AF37',
      fillOpacity: 0.2,
      radius: 300
    }).addTo(mapInstance.current);

    L.marker([latitude, longitude]).addTo(mapInstance.current)
      .bindPopup(`<b style="color: #050505;">${title}</b>`)
      .openPopup();

  }, [mounted, latitude, longitude, zoom, title]);

  if (!mounted) {
    return (
      <div className={`h-[450px] bg-bayt-dark flex flex-col items-center justify-center gap-4 ${className}`}>
        <div className="w-8 h-8 border-2 border-bayt-gold border-t-transparent animate-spin rounded-full" />
        <p className="text-bayt-gold text-[10px] font-black italic tracking-[0.3em]">CALIBRATING GEOSPATIAL DATA</p>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* HUD Border Overlay */}
      <div className="absolute inset-0 border-2 border-bayt-gold/20 pointer-events-none z-10 group-hover:border-bayt-gold/40 transition-colors" />
      
      {/* Map Container */}
      <div 
        ref={mapRef} 
        className={`w-full h-[450px] bg-bayt-dark grayscale-[0.5] contrast-[1.2] ${className}`}
      />

      {/* Tactical HUD Elements */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-bayt-dark/80 backdrop-blur-md border border-bayt-gold/30 p-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-white font-black italic text-[9px] tracking-widest uppercase">GPS SIGNAL: SECURE</span>
          </div>
          <span className="text-bayt-gold font-mono text-[9px]">LAT: {latitude.toFixed(4)} / LNG: {longitude.toFixed(4)}</span>
        </div>
      </div>
    </div>
  );
}
