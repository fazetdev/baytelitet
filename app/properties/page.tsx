'use client';

import { useState } from 'react';
import PropertyCard from './components/PropertyCard';
import { Search, Filter } from 'lucide-react';

const mockProperties = [
  {
    id: 1,
    title: 'Palm Jumeirah Luxury Villa',
    description: '5-bedroom villa with private beach access and panoramic sea views. Smart home automation, infinity pool, and private cinema.',
    price: 8500000,
    location: 'Palm Jumeirah, Dubai',
    type: 'villa',
    bedrooms: 5,
    bathrooms: 6,
    area: 8500,
    yearBuilt: 2023,
    features: ['Private Pool', 'Beach Access', 'Smart Home', 'Home Theater', 'Gym', 'Maid Room', 'Guest House'],
    images: ['/images/property1.jpg'],
    developer: 'Emaar Properties',
    reraNumber: 'RERA-12345',
    status: 'Ready to Move',
    parking: 4,
    amenities: ['Swimming Pool', 'Gym', 'Kids Play Area', 'Security', 'Concierge'],
    paymentPlan: '40/60 Construction Linked',
    completionDate: 'December 2023',
    virtualTour: true,
    goldenVisaEligible: true,
    rentalYield: '6.5%'
  },
  {
    id: 2,
    title: 'Downtown Dubai Sky Villa',
    description: 'Penthouse with breathtaking views of Burj Khalifa. Floor-to-ceiling windows, private elevator, and rooftop terrace.',
    price: 12500000,
    location: 'Downtown Dubai',
    type: 'penthouse',
    bedrooms: 4,
    bathrooms: 5,
    area: 6200,
    yearBuilt: 2024,
    features: ['Burj Khalifa View', 'Private Elevator', 'Rooftop Terrace', 'Wine Cellar', 'Smart Kitchen'],
    images: ['/images/property2.jpg'],
    developer: 'Dubai Properties',
    reraNumber: 'RERA-67890',
    status: 'Under Construction',
    parking: 3,
    amenities: ['Infinity Pool', 'Spa', 'Business Center', 'Valet Parking'],
    paymentPlan: '30/70 Post Handover',
    completionDate: 'June 2024',
    virtualTour: true,
    goldenVisaEligible: true,
    rentalYield: '7.2%'
  },
  {
    id: 3,
    title: 'Arabian Ranches Family Home',
    description: 'Spacious family villa in gated community with golf course views. Perfect for families with children.',
    price: 4200000,
    location: 'Arabian Ranches, Dubai',
    type: 'villa',
    bedrooms: 6,
    bathrooms: 7,
    area: 7500,
    yearBuilt: 2022,
    features: ['Golf Course View', 'Maid Room', 'Driver Room', 'Landscaped Garden', 'BBQ Area'],
    images: ['/images/property3.jpg'],
    developer: 'Emaar Properties',
    reraNumber: 'RERA-54321',
    status: 'Ready to Move',
    parking: 4,
    amenities: ['Golf Course', 'Clubhouse', 'Tennis Courts', 'Schools', 'Supermarkets'],
    paymentPlan: 'Cash or Installment',
    completionDate: 'Immediate',
    virtualTour: false,
    goldenVisaEligible: true,
    rentalYield: '5.8%'
  },
  {
    id: 4,
    title: 'Marina Bay Luxury Apartment',
    description: 'Modern 3-bedroom apartment with marina views. High-end finishes and prime location.',
    price: 2800000,
    location: 'Dubai Marina',
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    yearBuilt: 2023,
    features: ['Marina View', 'Balcony', 'Walk-in Closet', 'Smart Features'],
    images: ['/images/property4.jpg'],
    developer: 'Damac Properties',
    reraNumber: 'RERA-98765',
    status: 'Ready to Move',
    parking: 2,
    amenities: ['Gym', 'Pool', 'Beach Access', 'Retail Outlets'],
    paymentPlan: 'Bank Finance Available',
    completionDate: 'Immediate',
    virtualTour: true,
    goldenVisaEligible: false,
    rentalYield: '8.1%'
  },
  {
    id: 5,
    title: 'Al Reem Island Penthouse',
    description: 'Luxury penthouse with Abu Dhabi skyline views. Exclusive amenities and premium finishes.',
    price: 9500000,
    location: 'Al Reem Island, Abu Dhabi',
    type: 'penthouse',
    bedrooms: 5,
    bathrooms: 6,
    area: 5800,
    yearBuilt: 2024,
    features: ['Skyline View', 'Private Pool', 'Home Office', 'Library', 'Bar'],
    images: ['/images/property5.jpg'],
    developer: 'Aldar Properties',
    reraNumber: 'RERA-13579',
    status: 'Under Construction',
    parking: 4,
    amenities: ['Private Beach', 'Yacht Club', 'Helipad', 'Fine Dining'],
    paymentPlan: '20/80 Construction Linked',
    completionDate: 'September 2024',
    virtualTour: true,
    goldenVisaEligible: true,
    rentalYield: '6.9%'
  },
  {
    id: 6,
    title: 'Jeddah Corniche Villa',
    description: 'Traditional Saudi villa with modern amenities and Red Sea views.',
    price: 6800000,
    location: 'Corniche, Jeddah',
    type: 'villa',
    bedrooms: 7,
    bathrooms: 8,
    area: 9200,
    yearBuilt: 2021,
    features: ['Sea View', 'Majlis', 'Family Quarters', 'Garden', 'Pool'],
    images: ['/images/property6.jpg'],
    developer: 'Kingdom Holding',
    reraNumber: 'RERA-24680',
    status: 'Ready to Move',
    parking: 6,
    amenities: ['Private Beach', 'Mosque', 'Playground', 'Security'],
    paymentPlan: 'Islamic Finance Available',
    completionDate: 'Immediate',
    virtualTour: false,
    goldenVisaEligible: false,
    rentalYield: '5.2%'
  }
];

export default function PropertiesPage({ language = 'en' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 20000000]);

  // Bilingual content
  const content = {
    en: {
      title: 'Premium Properties',
      subtitle: 'Discover exclusive real estate opportunities across the Gulf region',
      searchPlaceholder: 'Search properties...',
      all: 'All',
      villa: 'Villa',
      apartment: 'Apartment',
      penthouse: 'Penthouse',
      townhouse: 'Townhouse',
      dubai: 'Dubai',
      abuDhabi: 'Abu Dhabi',
      sharjah: 'Sharjah',
      jeddah: 'Jeddah',
      riyadh: 'Riyadh',
      doha: 'Doha',
      allPrices: 'All Prices',
      customRange: 'Custom Range',
      upTo2M: 'Up to 2M',
      twoTo5M: '2M - 5M',
      fiveMPlus: '5M+',
      propertiesFound: 'Properties Found',
      sortBy: 'Sort By',
      noProperties: 'No properties found',
      tryAdjusting: 'Try adjusting your search criteria',
      totalListings: 'Total Listings',
      transactionVolume: 'Transaction Volume',
      clientSatisfaction: 'Client Satisfaction',
      developers: 'Developers',
      currency: 'AED'
    },
    ar: {
      title: 'العقارات المميزة',
      subtitle: 'اكتشف فرص عقارية حصرية في جميع أنحاء منطقة الخليج',
      searchPlaceholder: 'ابحث عن عقارات...',
      all: 'الكل',
      villa: 'فيلا',
      apartment: 'شقة',
      penthouse: 'بنتهاوس',
      townhouse: 'تاون هاوس',
      dubai: 'دبي',
      abuDhabi: 'أبوظبي',
      sharjah: 'الشارقة',
      jeddah: 'جدة',
      riyadh: 'الرياض',
      doha: 'الدوحة',
      allPrices: 'جميع الأسعار',
      customRange: 'نطاق مخصص',
      upTo2M: 'حتى 2 مليون',
      twoTo5M: '2-5 مليون',
      fiveMPlus: '5 مليون+',
      propertiesFound: 'عقار تم العثور عليه',
      sortBy: 'فرز حسب',
      noProperties: 'لم يتم العثور على عقارات',
      tryAdjusting: 'حاول تعديل معايير البحث',
      totalListings: 'إجمالي القوائم',
      transactionVolume: 'حجم المعاملات',
      clientSatisfaction: 'رضا العملاء',
      developers: 'المطورين',
      currency: 'درهم'
    }
  };

  const t = content[language];
  const isRTL = language === 'ar';

  const propertyTypes = [t.all, t.villa, t.apartment, t.penthouse, t.townhouse];
  const cities = [t.all, t.dubai, t.abuDhabi, t.sharjah, t.jeddah, t.riyadh, t.doha];

  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || property.type === selectedType.toLowerCase();
    const matchesCity = selectedCity === 'all' || property.location.includes(selectedCity);
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];

    return matchesSearch && matchesType && matchesCity && matchesPrice;
  });

  const getTypeValue = (type) => {
    const typeMap = {
      [t.all]: 'all',
      [t.villa]: 'villa',
      [t.apartment]: 'apartment',
      [t.penthouse]: 'penthouse',
      [t.townhouse]: 'townhouse'
    };
    return typeMap[type] || type.toLowerCase();
  };

  const getCityValue = (city) => {
    const cityMap = {
      [t.all]: 'all',
      [t.dubai]: 'Dubai',
      [t.abuDhabi]: 'Abu Dhabi',
      [t.sharjah]: 'Sharjah',
      [t.jeddah]: 'Jeddah',
      [t.riyadh]: 'Riyadh',
      [t.doha]: 'Doha'
    };
    return cityMap[city] || city;
  };

  return (
    // Background uses light color from homepage
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-bayt-light">
      {/* Hero Section */}
      <div className="bg-bayt-dark text-white">
        <div className="container mx-auto px-6 py-16">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isRTL ? 'text-right' : ''}`}>
            {t.title}
          </h1>
          <p className={`text-xl text-bayt-cool max-w-3xl ${isRTL ? 'text-right' : ''}`}>
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="container mx-auto px-6 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-bayt-cool/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
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

            {/* Property Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={`border border-bayt-cool/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-bayt-warm focus:border-transparent ${isRTL ? 'text-right' : ''}`}
            >
              {propertyTypes.map(type => (
                <option key={type} value={getTypeValue(type)}>
                  {type}
                </option>
              ))}
            </select>

            {/* City Filter */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className={`border border-bayt-cool/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-bayt-warm focus:border-transparent ${isRTL ? 'text-right' : ''}`}
            >
              {cities.map(city => (
                <option key={city} value={getCityValue(city)}>
                  {city}
                </option>
              ))}
            </select>

            {/* Price Range */}
            <div>
              <select
                value={priceRange[1] === 20000000 ? 'all' : 'custom'}
                onChange={(e) => {
                  if (e.target.value === 'all') setPriceRange([0, 20000000]);
                }}
                className={`w-full border border-bayt-cool/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-bayt-warm focus:border-transparent ${isRTL ? 'text-right' : ''}`}
              >
                <option value="all">{t.allPrices}</option>
                <option value="custom">{t.customRange}</option>
                <option value="0-2m">{t.upTo2M} {t.currency}</option>
                <option value="2m-5m">{t.twoTo5M} {t.currency}</option>
                <option value="5m+">{t.fiveMPlus} {t.currency}</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          <div className={`flex flex-wrap gap-2 mt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Type Filter Chip: Uses Cool Accent */}
            {selectedType !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-bayt-cool/20 text-bayt-dark px-3 py-1 rounded-full text-sm">
                {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
                <button onClick={() => setSelectedType('all')}>×</button>
              </span>
            )}
            {/* City Filter Chip: Uses Cultural Green Accent */}
            {selectedCity !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-bayt-cultural/20 text-bayt-dark px-3 py-1 rounded-full text-sm">
                {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}
                <button onClick={() => setSelectedCity('all')}>×</button>
              </span>
            )}
            {/* Price Filter Chip: Uses Warm Gold Accent */}
            {priceRange[1] !== 20000000 && (
              <span className="inline-flex items-center gap-1 bg-bayt-warm/20 text-bayt-dark px-3 py-1 rounded-full text-sm">
                {t.currency} {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
                <button onClick={() => setPriceRange([0, 20000000])}>×</button>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className={`flex justify-between items-center mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <h2 className={`text-2xl font-bold text-bayt-dark ${isRTL ? 'text-right' : ''}`}>
            {filteredProperties.length} {t.propertiesFound}
          </h2>
          <div className="flex items-center gap-4">
            <button className={`flex items-center gap-2 px-4 py-2 border border-bayt-cool/50 rounded-xl hover:bg-bayt-light/50 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Filter className="w-4 h-4 text-bayt-dark" />
              {t.sortBy}
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} language={language} />
          ))}
        </div>

        {/* No Results */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <div className="text-bayt-cool mb-4">🏠</div>
            <h3 className={`text-xl font-semibold text-bayt-dark mb-2 ${isRTL ? 'text-right' : ''}`}>
              {t.noProperties}
            </h3>
            <p className={`text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.tryAdjusting}</p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className={`bg-white p-6 rounded-xl shadow border border-bayt-cool/50 ${isRTL ? 'text-right' : ''}`}>
            <div className="text-2xl font-bold text-bayt-cool">500+</div>
            <div className="text-gray-600">{t.totalListings}</div>
          </div>
          <div className={`bg-white p-6 rounded-xl shadow border border-bayt-cool/50 ${isRTL ? 'text-right' : ''}`}>
            <div className="text-2xl font-bold text-bayt-cultural">{t.currency} 2.5B</div>
            <div className="text-gray-600">{t.transactionVolume}</div>
          </div>
          <div className={`bg-white p-6 rounded-xl shadow border border-bayt-cool/50 ${isRTL ? 'text-right' : ''}`}>
            <div className="text-2xl font-bold text-bayt-warm">98%</div>
            <div className="text-gray-600">{t.clientSatisfaction}</div>
          </div>
          <div className={`bg-white p-6 rounded-xl shadow border border-bayt-cool/50 ${isRTL ? 'text-right' : ''}`}>
            <div className="text-2xl font-bold text-bayt-dark">50+</div>
            <div className="text-gray-600">{t.developers}</div>
          </div>
        </div>
      </div>
    </div>
  );
}