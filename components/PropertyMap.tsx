'use client';

import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { Home, Building, Hotel, MapPin } from 'lucide-react';

// Install needed packages: pnpm add leaflet.markercluster

interface Property {
  id: number;
  title: string;
  description: string;
  location: string;
  lat?: number;
  lng?: number;
  price: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  status: 'sale' | 'rent' | 'sold';
  images?: string[];
}

interface PropertyMapProps {
  properties: Property[];
  language?: 'ar' | 'en';
  onPropertySelect?: (property: Property) => void;
  selectedPropertyId?: number;
}

// Custom icon creator based on property type
const createPropertyIcon = (type: string, isSelected: boolean = false) => {
  const size = isSelected ? 40 : 32;
  const iconColor = isSelected ? '#D97706' : getTypeColor(type);
  
  return L.divIcon({
    html: `
      <div style="
        background: ${iconColor};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        color: white;
        font-weight: bold;
        font-size: ${isSelected ? '14px' : '12px'};
      ">
        ${getTypeIcon(type)}
      </div>
    `,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
  });
};

const getTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    'villa': '#059669',    // Green
    'apartment': '#3B82F6', // Blue
    'townhouse': '#8B5CF6', // Purple
    'commercial': '#DC2626', // Red
    'land': '#F59E0B',     // Yellow
    'default': '#6B7280'   // Gray
  };
  return colors[type.toLowerCase()] || colors.default;
};

const getTypeIcon = (type: string): string => {
  const icons: Record<string, string> = {
    'villa': '🏠',
    'apartment': '🏢',
    'townhouse': '🏘️',
    'commercial': '🏬',
    'land': '📍',
    'default': '🏡'
  };
  return icons[type.toLowerCase()] || icons.default;
};

// Component to auto-fit map bounds
function FitBounds({ properties }: { properties: Property[] }) {
  const map = useMap();
  
  useEffect(() => {
    const validProperties = properties.filter(p => p.lat && p.lng);
    if (validProperties.length > 0) {
      const bounds = L.latLngBounds(
        validProperties.map(p => [p.lat!, p.lng!])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, properties]);
  
  return null;
}

// Component to handle marker clusters (you'll need to install leaflet.markercluster)
// pnpm add leaflet.markercluster @types/leaflet.markercluster

export default function PropertyMap({ 
  properties, 
  language = 'en', 
  onPropertySelect,
  selectedPropertyId 
}: PropertyMapProps) {
  const [map, setMap] = useState<L.Map | null>(null);
  const isRTL = language === 'ar';
  
  // Filter properties with valid coordinates
  const validProperties = useMemo(() => 
    properties.filter(p => p.lat && p.lng), 
    [properties]
  );
  
  // Default center (Dubai)
  const defaultCenter: [number, number] = [25.2048, 55.2708];
  
  // Fix Leaflet marker icon issue
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/icons/marker-icon-2x.png',
      iconUrl: '/icons/marker-icon.png',
      shadowUrl: '/icons/marker-shadow.png',
    });
  }, []);
  
  // Handle marker click
  const handleMarkerClick = (property: Property) => {
    if (onPropertySelect) {
      onPropertySelect(property);
    }
    
    // Center map on clicked property
    if (map && property.lat && property.lng) {
      map.setView([property.lat, property.lng], 15);
    }
  };
  
  // Get map tile URL based on language (Arabic maps might need RTL tiles)
  const getTileUrl = () => {
    if (language === 'ar') {
      // You can use a different tile provider for Arabic labels
      return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }
    return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  };
  
  if (validProperties.length === 0) {
    return (
      <div className={`w-full h-96 rounded-2xl bg-gray-100 flex flex-col items-center justify-center ${isRTL ? 'rtl' : 'ltr'}`}>
        <MapPin className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-gray-500 text-lg">
          {language === 'ar' ? 'لا توجد عقارات متاحة على الخريطة' : 'No properties available on map'}
        </p>
        <p className="text-gray-400 text-sm">
          {language === 'ar' ? 'أضف إحداثيات للعقارات لعرضها' : 'Add coordinates to properties to display'}
        </p>
      </div>
    );
  }
  
  return (
    <div className={`w-full h-96 rounded-2xl overflow-hidden shadow-lg relative ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Map controls info */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md">
        <div className="text-sm font-medium mb-2">
          {language === 'ar' ? 'أنواع العقارات' : 'Property Types'}
        </div>
        <div className="flex flex-wrap gap-2">
          {['villa', 'apartment', 'townhouse', 'commercial', 'land'].map(type => (
            <div key={type} className="flex items-center gap-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: getTypeColor(type) }}
              />
              <span className="text-xs capitalize">
                {type === 'villa' && (language === 'ar' ? 'فيلا' : 'Villa')}
                {type === 'apartment' && (language === 'ar' ? 'شقة' : 'Apartment')}
                {type === 'townhouse' && (language === 'ar' ? 'تاون هاوس' : 'Townhouse')}
                {type === 'commercial' && (language === 'ar' ? 'تجاري' : 'Commercial')}
                {type === 'land' && (language === 'ar' ? 'أرض' : 'Land')}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <MapContainer
        center={defaultCenter}
        zoom={12}
        className="w-full h-full"
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url={getTileUrl()}
        />
        
        <FitBounds properties={validProperties} />
        
        {/* Individual markers */}
        {validProperties.map(property => (
          <Marker
            key={property.id}
            position={[property.lat!, property.lng!]}
            icon={createPropertyIcon(property.type, property.id === selectedPropertyId)}
            eventHandlers={{
              click: () => handleMarkerClick(property),
            }}
          >
            <Popup>
              <div className={`min-w-64 ${isRTL ? 'text-right' : 'text-left'}`}>
                <h3 className="font-bold text-lg mb-1">{property.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-bayt-warm">
                    {property.price.toLocaleString(language === 'ar' ? 'ar-EG' : undefined)} AED
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    property.status === 'sale' ? 'bg-green-100 text-green-800' :
                    property.status === 'rent' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {property.status === 'sale' ? (language === 'ar' ? 'بيع' : 'Sale') :
                     property.status === 'rent' ? (language === 'ar' ? 'إيجار' : 'Rent') :
                     language === 'ar' ? 'مباع' : 'Sold'}
                  </span>
                </div>
                
                <div className="flex gap-3 text-sm text-gray-700 mb-3">
                  <span>{property.bedrooms} {language === 'ar' ? 'غرف' : 'Beds'}</span>
                  <span>{property.bathrooms} {language === 'ar' ? 'حمامات' : 'Baths'}</span>
                  <span>{property.area} {language === 'ar' ? 'قدم²' : 'sqft'}</span>
                </div>
                
                <button
                  onClick={() => onPropertySelect?.(property)}
                  className="w-full py-2 bg-bayt-warm text-bayt-dark font-medium rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Map attribution */}
      <div className="absolute bottom-2 left-2 z-[1000] bg-white/80 px-3 py-1 rounded text-xs">
        {language === 'ar' ? '© خريطة OpenStreetMap' : '© OpenStreetMap'}
      </div>
    </div>
  );
}
