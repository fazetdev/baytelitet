'use client';

import { Search, Filter, MapPin, Bed, Bath, Square, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface PropertyFiltersProps {
  onFilterChange?: (filters: any) => void;
}

export default function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
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

  return (
    // Component container uses white BG and cool accent border/shadow
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-bayt-cool/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-bayt-dark">Filter Properties</h2>
        <Filter className="text-bayt-warm" size={24} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location Search */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bayt-cool">
            <MapPin size={20} />
          </div>
          <input
            type="text"
            placeholder="Location"
            // Input styling uses cool accent border and warm accent focus
            className="w-full pl-10 pr-4 py-3 border border-bayt-cool/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-bayt-warm focus:border-transparent"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Property Type */}
        <div className="relative">
          <select
            // Select styling uses cool accent border and warm accent focus
            className="w-full px-4 py-3 border border-bayt-cool/50 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-bayt-warm focus:border-transparent"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="townhouse">Townhouse</option>
            <option value="penthouse">Penthouse</option>
            <option value="commercial">Commercial</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bayt-cool" size={20} />
        </div>

        {/* Bedrooms */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bayt-cool">
            <Bed size={20} />
          </div>
          <select
            // Select styling uses cool accent border and warm accent focus
            className="w-full pl-10 pr-4 py-3 border border-bayt-cool/50 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-bayt-warm focus:border-transparent"
            value={bedrooms || ''}
            onChange={(e) => setBedrooms(e.target.value ? parseInt(e.target.value) : null)}
          >
            <option value="">Any Bedrooms</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bayt-cool" size={20} />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          // Button uses the warm gold accent as the primary CTA
          className="bg-gradient-to-r from-bayt-warm to-yellow-700 text-bayt-dark font-semibold py-3 px-6 rounded-xl hover:from-yellow-700 hover:to-bayt-warm transition-all duration-300 flex items-center justify-center"
        >
          <Search className="mr-2" size={20} />
          Search Properties
        </button>
      </div>

      {/* Price Range */}
      <div className="mt-6">
        <label className="block text-bayt-dark mb-2 font-medium">Price Range</label>
        <div className="flex items-center space-x-4">
          {/* Range values use warm accent color */}
          <div className="text-bayt-warm font-semibold">
            AED {priceRange[0].toLocaleString()}
          </div>
          <input
            type="range"
            min="0"
            max="10000000"
            step="100000"
            // Range slider color styling - needs custom CSS or a different approach for track color if not using default browser styles.
            // Keeping the track gray-300 for clean look, focus uses standard hover/focus states.
            className="flex-grow h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-bayt-warm [&::-webkit-slider-thumb]:hover:bg-yellow-700 [&::-moz-range-thumb]:bg-bayt-warm [&::-moz-range-thumb]:hover:bg-yellow-700"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          />
          <div className="text-bayt-warm font-semibold">
            AED {priceRange[1].toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
