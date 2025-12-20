'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Property {
  id: string;
  title: string;
  price: string;
  lat: number;
  lng: number;
}

interface Props {
  properties: Property[];
  onSelect: (property: Property) => void;
}

export default function PropertyMap({ properties, onSelect }: Props) {
  if (!properties.length) return null;

  return (
    <div className="h-[420px] rounded-2xl overflow-hidden shadow-card">
      <MapContainer
        center={[properties[0].lat, properties[0].lng]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
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
              <div className="text-sm">
                <div className="font-semibold">{p.title}</div>
                <div className="text-bayt-warm">{p.price}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
