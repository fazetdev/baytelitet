'use client';

import { MapPin, Globe, Building, Navigation } from 'lucide-react';

interface LocationStepProps {
  lang: 'en' | 'ar';
  property: any;
  onChange: (e: any) => void;
  errors: any;
}

// Gulf Countries with their states/provinces and cities - FIXED FOR API COMPATIBILITY
const GULF_REGIONS = {
  UAE: {
    name: { en: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة' },
    states: {
      // Using proper API enum values as keys
      'Dubai': {
        name: { en: 'Dubai', ar: 'دبي' },
        cities: ['Dubai', 'Jumeirah', 'Marina', 'Downtown', 'Business Bay', 'Palm Jumeirah']
      },
      'Abu Dhabi': {
        name: { en: 'Abu Dhabi', ar: 'أبو ظبي' },
        cities: ['Abu Dhabi', 'Al Ain', 'Al Raha', 'Yas Island', 'Saadiyat Island']
      },
      'Sharjah': {
        name: { en: 'Sharjah', ar: 'الشارقة' },
        cities: ['Sharjah', 'Al Khan', 'Al Majaz', 'University City']
      },
      'Ajman': { name: { en: 'Ajman', ar: 'عجمان' }, cities: ['Ajman'] },
      'Ras Al Khaimah': { 
        name: { en: 'Ras Al Khaimah', ar: 'رأس الخيمة' }, 
        cities: ['Ras Al Khaimah'] 
      },
      'Fujairah': { name: { en: 'Fujairah', ar: 'الفجيرة' }, cities: ['Fujairah'] },
      'Umm Al Quwain': { 
        name: { en: 'Umm Al Quwain', ar: 'أم القيوين' }, 
        cities: ['Umm Al Quwain'] 
      }
    }
  },
  Saudi: {
    name: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
    states: {
      // For Saudi, we'll use province names that match typical real estate usage
      'Riyadh Province': {
        name: { en: 'Riyadh Province', ar: 'منطقة الرياض' },
        cities: ['Riyadh', 'Diriyah', 'Al Kharj', 'Al Majma\'ah']
      },
      'Makkah Province': {
        name: { en: 'Makkah Province', ar: 'منطقة مكة' },
        cities: ['Jeddah', 'Makkah', 'Ta\'if', 'Al Lith']
      },
      'Eastern Province': {
        name: { en: 'Eastern Province', ar: 'المنطقة الشرقية' },
        cities: ['Dammam', 'Khobar', 'Dhahran', 'Jubail', 'Al Ahsa']
      },
      'Medina Province': { 
        name: { en: 'Medina Province', ar: 'منطقة المدينة' }, 
        cities: ['Medina', 'Yanbu'] 
      },
      'Al-Qassim Province': { 
        name: { en: 'Al-Qassim Province', ar: 'منطقة القصيم' }, 
        cities: ['Buraidah', 'Unaizah'] 
      }
    }
  },
  Qatar: {
    name: { en: 'Qatar', ar: 'قطر' },
    states: {
      'Doha': {
        name: { en: 'Doha', ar: 'الدوحة' },
        cities: ['Doha', 'West Bay', 'Al Waab', 'Al Sadd', 'Al Dafna']
      },
      'Al Rayyan': { name: { en: 'Al Rayyan', ar: 'الريان' }, cities: ['Al Rayyan', 'Al Wajbah'] },
      'Al Wakrah': { name: { en: 'Al Wakrah', ar: 'الوكرة' }, cities: ['Al Wakrah'] },
      'Al Khor': { name: { en: 'Al Khor', ar: 'الخور' }, cities: ['Al Khor'] },
      'Umm Salal': { name: { en: 'Umm Salal', ar: 'أم صلال' }, cities: ['Umm Salal'] }
    }
  },
  Kuwait: {
    name: { en: 'Kuwait', ar: 'الكويت' },
    states: {
      'Kuwait City': {
        name: { en: 'Kuwait City', ar: 'مدينة الكويت' },
        cities: ['Kuwait City', 'Sharq', 'Salmiya', 'Hawalli']
      },
      'Al Ahmadi': { name: { en: 'Al Ahmadi', ar: 'الأحمدي' }, cities: ['Al Ahmadi', 'Fahaheel'] },
      'Al Jahra': { name: { en: 'Al Jahra', ar: 'الجهراء' }, cities: ['Al Jahra'] },
      'Al Farwaniya': { name: { en: 'Al Farwaniya', ar: 'الفروانية' }, cities: ['Al Farwaniya'] },
      'Mubarak Al-Kabeer': { 
        name: { en: 'Mubarak Al-Kabeer', ar: 'مبارك الكبير' }, 
        cities: ['Mubarak Al-Kabeer'] 
      }
    }
  },
  Oman: {
    name: { en: 'Oman', ar: 'سلطنة عمان' },
    states: {
      'Muscat': {
        name: { en: 'Muscat', ar: 'مسقط' },
        cities: ['Muscat', 'Ruwi', 'Al Khuwair', 'Al Ghubra', 'Qurum']
      },
      'Dhofar': { name: { en: 'Dhofar', ar: 'ظفار' }, cities: ['Salalah'] },
      'Al Batinah': { name: { en: 'Al Batinah', ar: 'الباطنة' }, cities: ['Sohar', 'Barka'] },
      'Al Dakhiliyah': { name: { en: 'Al Dakhiliyah', ar: 'الداخلية' }, cities: ['Nizwa', 'Bahla'] }
    }
  },
  Bahrain: {
    name: { en: 'Bahrain', ar: 'مملكة البحرين' },
    states: {
      'Manama': {
        name: { en: 'Manama', ar: 'المنامة' },
        cities: ['Manama', 'Diplomatic Area', 'Juffair', 'Adliya']
      },
      'Muharraq': { name: { en: 'Muharraq', ar: 'المحرق' }, cities: ['Muharraq'] },
      'Northern': { name: { en: 'Northern', ar: 'الشمالية' }, cities: ['Seef', 'Budaiya'] },
      'Southern': { name: { en: 'Southern', ar: 'الجنوبية' }, cities: ['Riffa', 'Isa Town'] }
    }
  }
};

export default function LocationStep({
  lang,
  property,
  onChange,
  errors
}: LocationStepProps) {

  const selectedCountry = property.country || 'UAE';
  const selectedState = property.state || '';
  const selectedCity = property.city || '';

  const handleCountryChange = (e: any) => {
    const newCountry = e.target.value;
    onChange({ target: { name: 'country', value: newCountry } });
    onChange({ target: { name: 'state', value: '' } });
    onChange({ target: { name: 'city', value: '' } });
  };

  const handleStateChange = (e: any) => {
    const newState = e.target.value;
    onChange({ target: { name: 'state', value: newState } });
    onChange({ target: { name: 'city', value: '' } });
  };

  const handleCityChange = (e: any) => {
    onChange({ target: { name: 'city', value: e.target.value } });
  };

  const getCurrentStates = () => {
    const region = GULF_REGIONS[selectedCountry as keyof typeof GULF_REGIONS];
    return region?.states || {};
  };

  const getCurrentCities = () => {
    if (!selectedState) return [];
    const states = getCurrentStates();
    const stateData = (states as Record<string, any>)[selectedState];
    return stateData?.cities || [];
  };

  return (
    <div className="space-y-6">
      {/* Location Hierarchy Header */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="font-medium text-blue-900">
              {lang === 'en' ? 'Gulf Region Location' : 'موقع منطقة الخليج'}
            </h3>
            <p className="text-blue-700 text-sm">
              {lang === 'en'
                ? 'Select country, then state/province, then city'
                : 'اختر الدولة، ثم المنطقة/المحافظة، ثم المدينة'}
            </p>
          </div>
        </div>
      </div>

      {/* Country Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {lang === 'en' ? 'Country *' : 'الدولة *'}
        </label>
        <div className="relative">
          <select
            name="country"
            value={selectedCountry}
            onChange={handleCountryChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
          >
            {Object.entries(GULF_REGIONS).map(([key, country]) => (
              <option key={key} value={key}>
                {country.name[lang]}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* State/Province Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {lang === 'en' ? 'State / Province *' : 'المنطقة / المحافظة *'}
        </label>
        <div className="relative">
          <select
            name="state"
            value={selectedState}
            onChange={handleStateChange}
            disabled={!selectedCountry}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${
              !selectedCountry ? 'bg-gray-50 text-gray-400' : 'bg-white'
            }`}
          >
            <option value="">
              {lang === 'en' ? '-- Select State/Province --' : '-- اختر المنطقة/المحافظة --'}
            </option>
            {Object.entries(getCurrentStates()).map(([key, state]) => (
              <option key={key} value={key}>
                {(state as any).name[lang]}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <Building className="w-4 h-4" />
          </div>
        </div>
        {!selectedState && selectedCountry && (
          <p className="text-amber-600 text-sm mt-2">
            {lang === 'en'
              ? 'Please select a state/province to continue'
              : 'يرجى اختيار منطقة/محافظة للمتابعة'}
          </p>
        )}
      </div>

      {/* City Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {lang === 'en' ? 'City *' : 'المدينة *'}
        </label>
        <div className="relative">
          <select
            name="city"
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedState}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${
              !selectedState ? 'bg-gray-50 text-gray-400' : 'bg-white'
            }`}
          >
            <option value="">
              {lang === 'en' ? '-- Select City --' : '-- اختر المدينة --'}
            </option>
            {getCurrentCities().map((city: string) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <MapPin className="w-4 h-4" />
          </div>
        </div>
        {!selectedCity && selectedState && (
          <p className="text-amber-600 text-sm mt-2">
            {lang === 'en'
              ? 'Please select a city to continue'
              : 'يرجى اختيار مدينة للمتابعة'}
          </p>
        )}
      </div>

      {/* Address Details */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {lang === 'en' ? 'Full Address *' : 'العنوان التفصيلي *'}
        </label>
        <textarea
          name="address"
          value={property.address || ''}
          onChange={onChange}
          placeholder={lang === 'en'
            ? 'Building name, street, district, landmark...'
            : 'اسم المبنى، الشارع، الحي، معلم بارز...'
          }
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-2">{errors.address}</p>
        )}
      </div>

      {/* Coordinates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Navigation className="w-4 h-4" />
            {lang === 'en' ? 'Latitude' : 'خط العرض'}
          </label>
          <input
            type="text"
            name="lat"
            value={property.lat || ''}
            onChange={onChange}
            placeholder="25.2048"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Navigation className="w-4 h-4" />
            {lang === 'en' ? 'Longitude' : 'خط الطول'}
          </label>
          <input
            type="text"
            name="long"
            value={property.long || ''}
            onChange={onChange}
            placeholder="55.2708"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Coordinate Help */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-600 mb-2">
          {lang === 'en'
            ? '💡 Need coordinates? Use:'
            : '💡 تحتاج إحداثيات؟ استخدم:'}
        </p>
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Google Maps: Right-click → "What's here?" → Copy coordinates</p>
          <p>• أو إحداثيات: انقر بزر الماوس الأيمن → "ما هذا؟" → نسخ الإحداثيات</p>
        </div>
      </div>
    </div>
  );
}
