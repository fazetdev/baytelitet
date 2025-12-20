'use client';

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

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

// Map logic separated into a component that is ONLY loaded on the client
const MapContainerComponent = ({ properties, onSelect }: Props) => {
  const { MapContainer, TileLayer, Marker, Popup } = require('react-leaflet');
  const L = require('leaflet');

  // Fix Leaflet icon issue
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });

  if (!properties.length) return null;

  return (
    <div className="h-[420px] rounded-2xl overflow-hidden shadow-md border border-gray-100">
      <MapContainer
        center={[properties[0].lat, properties[0].lng]}
        zoom={12}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {properties.map((p) => (
          <Marker
            key={p.id}
            position={[p.lat, p.lng]}
            eventHandlers={{ click: () => onSelect(p) }}
          >
            <Popup>
              <div className="p-1">
                <div className="font-bold text-gray-900">{p.title}</div>
                <div className="text-bayt-warm">{p.price}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// Exporting with ssr: false is the crucial part
export default dynamic(() => Promise.resolve(MapContainerComponent), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] w-full rounded-2xl bg-gray-50 animate-pulse flex items-center justify-center text-gray-400">
      Initializing Map...
    </div>
  ),
});
