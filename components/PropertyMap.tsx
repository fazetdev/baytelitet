'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// 1. Create a placeholder to show while the map is loading
const MapPlaceholder = () => (
  <div className="h-[420px] w-full rounded-2xl bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">
    Loading Map...
  </div>
);

// 2. Define the internal map component
interface Property {
  id: string | number;
  title: string;
  price: string | number;
  lat: number;
  lng: number;
}

interface Props {
  properties: Property[];
  onSelect: (property: Property) => void;
}

function MapComponent({ properties, onSelect }: Props) {
  // We import Leaflet inside a useEffect or ensuring it's client-side
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    import('leaflet').then((leaflet) => {
      delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
      setL(leaflet);
    });
  }, []);

  // Dynamically import react-leaflet components
  const { MapContainer, TileLayer, Marker, Popup } = require('react-leaflet');

  if (!properties.length || !L) return <MapPlaceholder />;

  return (
    <div className="h-[420px] rounded-2xl overflow-hidden shadow-md">
      <MapContainer
        center={[properties[0].lat, properties[0].lng]}
        zoom={12}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {properties.map((p) => (
          <Marker
            key={p.id}
            position={[p.lat, p.lng]}
            eventHandlers={{
              click: () => onSelect(p),
            }}
          >
            <Popup>
              <div className="p-1">
                <div className="font-bold text-bayt-dark">{p.title}</div>
                <div className="text-bayt-warm font-semibold">
                  {typeof p.price === 'number' ? p.price.toLocaleString() : p.price}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

// 3. Export as a dynamic component with SSR disabled
export default dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
  loading: () => <MapPlaceholder />
});
