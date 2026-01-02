'use client';                        
import { useState, useEffect } from 'react';
import {
  Search, Filter, MapPin, Bed, Bath, Maximize, Heart,
  Grid, List, Loader2, Building2, Home, TrendingUp
} from 'lucide-react';
import { useProperties } from '@/app/context/useProperties';

export default function PropertiesPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    filteredProperties,
    searchQuery: contextSearchQuery,
    setSearchQuery: setContextSearchQuery,
    selectedType: contextSelectedType,
    setSelectedType: setContextSelectedType,
    selectedCity: contextSelectedCity,
    setSelectedCity: setContextSelectedCity,
    loading
  } = useProperties();

  // Calculate unique property types from the properties data
  const uniqueTypes = ['all', ...Array.from(
    new Set((filteredProperties || []).map(property => property.type).filter(Boolean))
  )];

  // Calculate unique cities from the properties data
  const uniqueCities = ['all', ...Array.from(
    new Set((filteredProperties || []).map(property => property.city).filter(Boolean))
  )];

  const filtered = (filteredProperties || []).filter(property => {
    // Apply price filters
    if (minPrice && property.price < parseInt(minPrice)) return false;
    if (maxPrice && property.price > parseInt(maxPrice)) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Dream Property
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Browse our curated selection of premium properties across the Gulf region
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location, property name, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-6 py-3.5 border border-gray-300 rounded-xl hover:bg-gray-50 flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
            <div className="flex border border-gray-300 rounded-xl overflow-hidden">
              <button
                onClick={() => setView('grid')}
                className={`p-3.5 ${view === 'grid' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-3.5 ${view === 'list' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filter Options */}
          {isFilterOpen && (
            <div className="border-t border-gray-200 pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                  >
                    {uniqueTypes.map(type => (
                      <option key={type} value={type}>
                        {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                  >
                    {uniqueCities.map(city => (
                      <option key={city} value={city}>
                        {city === 'all' ? 'All Cities' : city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Min Price
                    </label>
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Price
                    </label>
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setSelectedType('all');
                    setSelectedCity('all');
                    setMinPrice('');
                    setMaxPrice('');
                    setSearchQuery('');
                  }}
                  className="px-6 py-2.5 text-gray-700 hover:text-gray-900"
                >
                  Clear all
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {filtered.length} Properties Found
            </h2>
            <div className="text-gray-600">
              Sorted by: <span className="font-medium">Newest</span>
            </div>
          </div>
        </div>

        {/* Properties Grid/List */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search filters or browse all properties
            </p>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property) => (
              <div key={property.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 bg-gray-200">
                  {property.heroImage ? (
                    <img
                      src={property.heroImage}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Home className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white">
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>
                  {property.premium && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                      PREMIUM
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                      {property.title}
                    </h3>
                    <span className="text-lg font-bold text-blue-600">
                      AED {property.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.city}, {property.country || 'UAE'}</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600 mb-6">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span className="text-sm">{property.bedrooms || property.beds || 0} beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span className="text-sm">{property.bathrooms || property.baths || 0} baths</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize className="w-4 h-4" />
                      <span className="text-sm">{property.area ? `${property.area} ${property.areaUnit || 'sqft'}` : 'N/A'}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                      {property.type}
                    </span>
                    <a
                      href={`/properties/${property.id}`}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((property) => (
              <div key={property.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-48 h-48 bg-gray-200 rounded-xl overflow-hidden">
                    {property.heroImage ? (
                      <img
                        src={property.heroImage}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Home className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {property.title}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{property.city}, {property.country || 'UAE'}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          AED {property.price.toLocaleString()}
                        </div>
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                          {property.type}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {property.description || 'No description available'}
                    </p>
                    <div className="flex items-center gap-6 text-gray-600 mb-6">
                      <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4" />
                        <span>{property.bedrooms || property.beds || 0} beds</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bath className="w-4 h-4" />
                        <span>{property.bathrooms || property.baths || 0} baths</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Maximize className="w-4 h-4" />
                        <span>{property.area ? `${property.area} ${property.areaUnit || 'sqft'}` : 'N/A'}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {property.premium && (
                          <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                            PREMIUM
                          </span>
                        )}
                        {property.complianceStatus === 'verified' && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Heart className="w-5 h-5" />
                        </button>
                        <a
                          href={`/properties/${property.id}`}
                          className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                        >
                          View Property
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {(filteredProperties || []).length}
              </div>
              <div className="text-gray-600">Total Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {uniqueCities.length - 1}
              </div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {(filteredProperties || []).filter(p => p.complianceStatus === 'verified').length}
              </div>
              <div className="text-gray-600">Verified Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                24/7
              </div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
