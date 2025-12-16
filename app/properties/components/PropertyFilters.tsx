'use client';

import { Search, Filter, MapPin, Bed, Bath, Square, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface PropertyFiltersProps {
  onFilterChange?: (filters: any) => void;
  language?: 'ar' | 'en';
}

export default function PropertyFilters({ onFilterChange, language = 'en' }: PropertyFiltersProps) {
  // Bilingual content
  const content = {
    en: {
      filterProperties: 'Filter Properties',
      location: 'Location',
      locationPlaceholder: 'Enter location...',
      allTypes: 'All Types',
      apartment: 'Apartment',
      villa: 'Villa',
      townhouse: 'Townhouse',
      penthouse: 'Penthouse',
      commercial: 'Commercial',
      anyBedrooms: 'Any Bedrooms',
      bedroom: 'Bedroom',
      bedrooms: 'Bedrooms',
      searchProperties: 'Search Properties',
      priceRange: 'Price Range',
      minPrice: 'Min',
      maxPrice: 'Max',
      currency: 'AED'
    },
    ar: {
      filterProperties: 'تصفية العقارات',
      location: 'الموقع',
      locationPlaceholder: 'أدخل الموقع...',
      allTypes: 'جميع الأنواع',
      apartment: 'شقة',
      villa: 'فيلا',
      townhouse: 'تاون هاوس',
      penthouse: 'بنتهاوس',
      commercial: 'تجاري',
      anyBedrooms: 'أي عدد غرف',
      bedroom: 'غرفة',
      bedrooms: 'غرف',
      searchProperties: 'بحث عن عقارات',
      priceRange: 'نطاق السعر',
      minPrice: 'الحد الأدنى',
      maxPrice: 'الحد الأقصى',
      currency: 'درهم'
    }
  };

  const t = content[language];
  const isRTL = language === 'ar';

  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [propertyType, setPropertyType] = useState<string>('all');
  const [location, setLocation] = useState<string>('');

  const handleSearch = () => {
    if (onFilterChange) {
      onFilterChange({
        priceRange,
        bedrooms,
        propertyType,
        location
      });
    }
  };

  // Get bedroom display text
  const getBedroomDisplay = (value: string) => {
    if (!value) return t.anyBedrooms;
    
    const num = parseInt(value);
    const bedroomText = num === 1 ? t.bedroom : t.bedrooms;
    
    if (value === '4') return `4+ ${bedroomText}`;
    return `${num} ${bedroomText}`;
  };

  // Format price with Arabic numerals if needed
  const formatPrice = (price: number) => {
    if (language === 'ar') {
      // Convert to Arabic numerals
      return price.toLocaleString('ar-EG');
    }
    return price.toLocaleString();
  };

  return (
    // Component container uses white BG and cool accent border/shadow
    <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-bayt-cool/50">
      <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h2 className={`text-xl font-bold text-bayt-dark ${isRTL ? 'text-right' : ''}`}>
          {t.filterProperties}
        </h2>
        <Filter className="text-bayt-warm" size={24} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location Search */}
        <div className="relative">
          <div className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-bayt-cool`}>
            <MapPin size={20} />
          </div>
          <input
            type="text"
            placeholder={t.locationPlaceholder}
            className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-bayt-cool/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-bayt-warm focus:border-transparent ${isRTL ? 'text-right' : ''}`}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Property Type */}
        <div className="relative">
          <select
            className={`w-full px-4 py-3 border border-bayt-cool/50 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-bayt-warm focus:border-transparent ${isRTL ? 'text-right' : ''}`}
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="all">{t.allTypes}</option>
            <option value="apartment">{t.apartment}</option>
            <option value="villa">{t.villa}</option>
            <option value="townhouse">{t.townhouse}</option>
            <option value="penthouse">{t.penthouse}</option>
            <option value="commercial">{t.commercial}</option>
          </select>
          <ChevronDown className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-bayt-cool`} size={20} />
        </div>

        {/* Bedrooms */}
        <div className="relative">
          <div className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-bayt-cool`}>
            <Bed size={20} />
          </div>
          <select
            className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-bayt-cool/50 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-bayt-warm focus:border-transparent ${isRTL ? 'text-right' : ''}`}
            value={bedrooms || ''}
            onChange={(e) => setBedrooms(e.target.value ? parseInt(e.target.value) : null)}
          >
            <option value="">{t.anyBedrooms}</option>
            <option value="1">1 {t.bedroom}</option>
            <option value="2">2 {t.bedrooms}</option>
            <option value="3">3 {t.bedrooms}</option>
            <option value="4">4+ {t.bedrooms}</option>
          </select>
          <ChevronDown className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-bayt-cool`} size={20} />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className={`bg-gradient-to-r from-bayt-warm to-yellow-700 text-bayt-dark font-semibold py-3 px-6 rounded-xl hover:from-yellow-700 hover:to-bayt-warm transition-all duration-300 flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <Search className={isRTL ? 'ml-2' : 'mr-2'} size={20} />
          {t.searchProperties}
        </button>
      </div>

      {/* Price Range */}
      <div className="mt-6">
        <label className={`block text-bayt-dark mb-2 font-medium ${isRTL ? 'text-right' : ''}`}>
          {t.priceRange}
        </label>
        <div className={`flex items-center space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
          {/* Range values use warm accent color */}
          <div className={`text-bayt-warm font-semibold ${isRTL ? 'text-left' : ''}`}>
            {t.currency} {formatPrice(priceRange[0])}
          </div>
          <input
            type="range"
            min="0"
            max="10000000"
            step="100000"
            className={`flex-grow h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-bayt-warm [&::-webkit-slider-thumb]:hover:bg-yellow-700 [&::-moz-range-thumb]:bg-bayt-warm [&::-moz-range-thumb]:hover:bg-yellow-700 ${isRTL ? '[&::-webkit-slider-thumb]:mr-0' : ''}`}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          />
          <div className={`text-bayt-warm font-semibold ${isRTL ? 'text-right' : ''}`}>
            {t.currency} {formatPrice(priceRange[1])}
          </div>
        </div>
        <div className={`flex justify-between text-sm text-gray-500 mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span>{t.minPrice}</span>
          <span>{t.maxPrice}</span>
        </div>
      </div>
    </div>
  );
}