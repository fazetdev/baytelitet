'use client';

import { useState } from 'react';
import PropertyCard from './components/PropertyCard';
import PropertyFilters from './components/PropertyFilters';
import { Search, Filter, MapPin, Bed, Bath, Square } from 'lucide-react';

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

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 20000000]);

  const propertyTypes = ['All', 'Villa', 'Apartment', 'Penthouse', 'Townhouse'];
  const cities = ['All', 'Dubai', 'Abu Dhabi', 'Sharjah', 'Jeddah', 'Riyadh', 'Doha'];

  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || property.type === selectedType.toLowerCase();
    const matchesCity = selectedCity === 'all' || property.location.includes(selectedCity);
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];

    return matchesSearch && matchesType && matchesCity && matchesPrice;
  });

  return (
    // Background uses light color from homepage
    <div className="min-h-screen bg-bayt-light">
      {/* Hero Section */}
      {/* Hero uses the dark primary color from homepage */}
      <div className="bg-bayt-dark text-white">
        <div className="container mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium Properties</h1>
          {/* Accent text uses the cool color */}
          <p className="text-xl text-bayt-cool max-w-3xl">
            Discover exclusive real estate opportunities across the Gulf region
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="container mx-auto px-6 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-bayt-cool/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bayt-cool w-5 h-5" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                // Input borders and focus use the cool/warm accents
                className="w-full pl-10 pr-4 py-3 border border-bayt-cool/50 rounded-xl focus:ring-2 focus:ring-bayt-warm focus:border-transparent"
              />
            </div>

            {/* Property Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border border-bayt-cool/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-bayt-warm focus:border-transparent"
            >
              {propertyTypes.map(type => (
                <option key={type} value={type.toLowerCase()}>{type}</option>
              ))}
            </select>

            {/* City Filter */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="border border-bayt-cool/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-bayt-warm focus:border-transparent"
            >
              {cities.map(city => (
                <option key={city} value={city.toLowerCase()}>{city}</option>
              ))}
            </select>

            {/* Price Range */}
            <div>
              <select
                value={priceRange[1] === 20000000 ? 'all' : 'custom'}
                onChange={(e) => {
                  if (e.target.value === 'all') setPriceRange([0, 20000000]);
                }}
                className="w-full border border-bayt-cool/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-bayt-warm focus:border-transparent"
              >
                <option value="all">All Prices</option>
                <option value="custom">Custom Range</option>
                <option value="0-2m">Up to 2M AED</option>
                <option value="2m-5m">2M - 5M AED</option>
                <option value="5m+">5M+ AED</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
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
                AED {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
                <button onClick={() => setPriceRange([0, 20000000])}>×</button>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-bayt-dark">
            {filteredProperties.length} Properties Found
          </h2>
          <div className="flex items-center gap-4">
            {/* Sort Button uses cool accent border */}
            <button className="flex items-center gap-2 px-4 py-2 border border-bayt-cool/50 rounded-xl hover:bg-bayt-light/50">
              <Filter className="w-4 h-4 text-bayt-dark" />
              Sort By
            </button>
          </div>
        </div>

        {/* Properties Grid (PropertyCard component will need styling, but the grid is fine) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* No Results */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <div className="text-bayt-cool mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-bayt-dark mb-2">No properties found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow border border-bayt-cool/50">
            <div className="text-2xl font-bold text-bayt-cool">500+</div>
            <div className="text-gray-600">Total Listings</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-bayt-cool/50">
            <div className="text-2xl font-bold text-bayt-cultural">AED 2.5B</div>
            <div className="text-gray-600">Transaction Volume</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-bayt-cool/50">
            <div className="text-2xl font-bold text-bayt-warm">98%</div>
            <div className="text-gray-600">Client Satisfaction</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-bayt-cool/50">
            <div className="text-2xl font-bold text-bayt-dark">50+</div>
            <div className="text-gray-600">Developers</div>
          </div>
        </div>
      </div>
    </div>
  );
}
