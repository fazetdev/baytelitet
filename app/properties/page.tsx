'use client';

import { useState, useEffect } from 'react';
import { PropertiesProvider, useProperties, Property } from '@/context/useProperties';
import { useLanguage } from '@/context/useLanguage';
import { useTranslations } from '@/hooks/useTranslations';
import PropertyCard from './components/PropertyCard';
import PropertyDetailsModal from './components/PropertyDetailsModal';
import PropertyMap from './components/PropertyMap';
import { Search } from 'lucide-react';

// REMOVED: The old conflicting Property interface
// USE INSTEAD: The Property type imported from '@/context/useProperties'

export default function PropertiesPage() {
  return (
    <PropertiesProvider>
      <PropertiesContent />
    </PropertiesProvider>
  );
}

function PropertiesContent() {
  const { 
    filteredProperties = [], 
    searchQuery = '', 
    setSearchQuery, 
    selectedType = 'all', 
    setSelectedType, 
    selectedCity = 'all', 
    setSelectedCity, 
    priceRange = [0, 20000000], 
    setPriceRange 
  } = useProperties() || {};

  const { lang } = useLanguage();
  const currentLang = lang === 'ar' ? 'ar' : 'en';
  const t = useTranslations(currentLang);

  const [mounted, setMounted] = useState(false);
  // FIX: Use the imported Property type from context
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!t) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const propertyTypes = [
    { value: 'all', label: t.all || 'All' },
    { value: 'villa', label: t.villa || 'Villa' },
    { value: 'apartment', label: t.apartment || 'Apartment' },
    { value: 'penthouse', label: t.penthouse || 'Penthouse' },
    { value: 'townhouse', label: t.townhouse || 'Townhouse' }
  ];

  const cities = [
    { value: 'all', label: t.all || 'All' },
    { value: 'Dubai', label: t.dubai || 'Dubai' },
    { value: 'Abu Dhabi', label: t.abuDhabi || 'Abu Dhabi' },
    { value: 'Sharjah', label: t.sharjah || 'Sharjah' },
    { value: 'Jeddah', label: t.jeddah || 'Jeddah' },
    { value: 'Riyadh', label: t.riyadh || 'Riyadh' },
    { value: 'Doha', label: t.doha || 'Doha' }
  ];

  const priceRanges = [
    { value: [0, 20000000], label: t.allPrices || 'All Prices' },
    { value: [0, 2000000], label: `0 - 2M ${t.currency || 'AED'}` },
    { value: [2000000, 5000000], label: `2M - 5M ${t.currency || 'AED'}` },
    { value: [5000000, 20000000], label: `5M+ ${t.currency || 'AED'}` }
  ];

  const currentPriceRangeIndex = priceRanges.findIndex(
    range => range.value[0] === priceRange[0] && range.value[1] === priceRange[1]
  );

  const isRTL = currentLang === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-bayt-light">
      {/* Search & Filters */}
      <div className="bg-white shadow-lg p-6 mb-8 border-b border-bayt-cool/20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-bayt-cool w-5 h-5`} />
            <input
              type="text"
              placeholder={t.searchPlaceholder || 'Search properties'}
              value={searchQuery}
              onChange={(e) => setSearchQuery?.(e.target.value)}
              className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-bayt-cool/50 rounded-xl focus:ring-2 focus:ring-bayt-warm outline-none transition-all`}
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType?.(e.target.value)}
            className="border border-bayt-cool/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-bayt-warm outline-none"
          >
            {propertyTypes.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity?.(e.target.value)}
            className="border border-bayt-cool/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-bayt-warm outline-none"
          >
            {cities.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          <select
            value={currentPriceRangeIndex !== -1 ? currentPriceRangeIndex : 0}
            onChange={(e) => {
              const index = Number(e.target.value);
              setPriceRange?.(priceRanges[index].value as [number, number]);
            }}
            className="border border-bayt-cool/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-bayt-warm outline-none"
          >
            {priceRanges.map(({ label }, idx) => (
              <option key={idx} value={idx}>{label}</option>
            ))}
          </select>
        </div>

        <div className="container mx-auto flex justify-between items-center mt-6">
          <h2 className="text-2xl font-bold text-bayt-dark">
            {filteredProperties.length} {t.propertiesFound || 'properties found'}
          </h2>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="container mx-auto px-6 py-6">
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map(property => (
              <div key={property.id} onClick={() => setSelectedProperty(property)}>
                <PropertyCard property={property} language={currentLang} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-bayt-cool/40">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-bayt-dark mb-2">
              {t.noProperties || 'No properties found'}
            </h3>
            <p className="text-gray-500">{t.tryAdjusting || 'Try adjusting your filters'}</p>
          </div>
        )}
      </div>

      {/* Property Details Modal */}
      {mounted && selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          isOpen={!!selectedProperty}
          onClose={() => setSelectedProperty(null)}
        >
          <PropertyMap 
            latitude={25.276987} 
            longitude={55.296249} 
            zoom={12} 
          />
        </PropertyDetailsModal>
      )}
    </div>
  );
}
