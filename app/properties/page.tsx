'use client';

import { useProperties } from '../../context/useProperties';
import { useLanguage } from '../../context/useLanguage';
import { useTranslations } from '../../hooks/useTranslations';
import PropertyCard from './components/PropertyCard';
import { Search } from 'lucide-react';

export default function PropertiesPage() {
  const { 
    filteredProperties, 
    searchQuery, 
    setSearchQuery, 
    selectedType, 
    setSelectedType, 
    selectedCity, 
    setSelectedCity, 
    priceRange, 
    setPriceRange 
  } = useProperties();
  
  const { lang } = useLanguage();
  const t = useTranslations(lang);

  const isRTL = lang === 'ar';

  // Predefined options
  const propertyTypes = [
    { value: 'all', label: t.all },
    { value: 'villa', label: t.villa },
    { value: 'apartment', label: t.apartment },
    { value: 'penthouse', label: t.penthouse },
    { value: 'townhouse', label: t.townhouse }
  ];

  const cities = [
    { value: 'all', label: t.all },
    { value: 'Dubai', label: t.dubai },
    { value: 'Abu Dhabi', label: t.abuDhabi },
    { value: 'Sharjah', label: t.sharjah },
    { value: 'Jeddah', label: t.jeddah },
    { value: 'Riyadh', label: t.riyadh },
    { value: 'Doha', label: t.doha }
  ];

  const priceRanges = [
    { value: [0, 20000000], label: t.allPrices },
    { value: [0, 2000000], label: `${t.upTo} 2M ${t.currency}` },
    { value: [2000000, 5000000], label: `2M - 5M ${t.currency}` },
    { value: [5000000, 20000000], label: `5M+ ${t.currency}` }
  ];

  // Find current price range index
  const currentPriceRangeIndex = priceRanges.findIndex(range => 
    range.value[0] === priceRange[0] && range.value[1] === priceRange[1]
  );

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-bayt-light">
      {/* Search & Filters Section */}
      <div className="bg-white shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-bayt-cool w-5 h-5`} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-bayt-cool/50 rounded-xl focus:ring-2 focus:ring-bayt-warm focus:border-transparent`}
            />
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className={`border border-bayt-cool/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-bayt-warm focus:border-transparent ${isRTL ? 'text-right' : ''}`}
          >
            {propertyTypes.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          {/* City Filter */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className={`border border-bayt-cool/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-bayt-warm focus:border-transparent ${isRTL ? 'text-right' : ''}`}
          >
            {cities.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          {/* Price Range */}
          <select
            value={currentPriceRangeIndex}
            onChange={(e) => {
              const selectedIndex = Number(e.target.value);
              const selectedRange = priceRanges[selectedIndex];
              setPriceRange(selectedRange.value as [number, number]);
            }}
            className={`border border-bayt-cool/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-bayt-warm focus:border-transparent ${isRTL ? 'text-right' : ''}`}
          >
            {priceRanges.map(({ label }, index) => (
              <option key={index} value={index}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <div className={`flex justify-between items-center mt-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <h2 className={`text-2xl font-bold text-bayt-dark ${isRTL ? 'text-right' : ''}`}>
            {filteredProperties.length} {t.propertiesFound}
          </h2>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} language={lang} />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <div className="text-bayt-cool mb-4">🏠</div>
            <h3 className={`text-xl font-semibold text-bayt-dark mb-2 ${isRTL ? 'text-right' : ''}`}>
              {t.noProperties}
            </h3>
            <p className={`text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.tryAdjusting}</p>
          </div>
        )}
      </div>
    </div>
  );
}
