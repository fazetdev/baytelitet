'use client';

import { useEffect, useState } from 'react';
import { useGulfAssetStore } from '@/lib/stores/gulfAssetStore';
import PropertyCard from './components/PropertyCard';
import { Loader2, AlertCircle, Filter, Grid, List, Search, Home, Building2, Building, TreePine } from 'lucide-react';

export default function PropertiesPage() {
  const { properties, loadProperties } = useGulfAssetStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000000);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);

  // Property type options for filter
  const propertyTypes = [
    { value: 'all', label: 'All Types', icon: <Home className="w-4 h-4" /> },
    { value: 'apartment', label: 'Apartments', icon: <Home className="w-4 h-4" /> },
    { value: 'villa', label: 'Villas', icon: <Home className="w-4 h-4" /> },
    { value: 'townhouse', label: 'Townhouses', icon: <Building2 className="w-4 h-4" /> },
    { value: 'office', label: 'Offices', icon: <Building className="w-4 h-4" /> },
    { value: 'retail', label: 'Retail', icon: <Building className="w-4 h-4" /> },
    { value: 'land', label: 'Land', icon: <TreePine className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await loadProperties();
      } catch (err) {
        setError('Failed to load properties. Please try again.');
        console.error('Error loading properties:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [loadProperties]);

  // Apply filters whenever properties, filters, or search change
  useEffect(() => {
    if (!properties.length) {
      setFilteredProperties([]);
      return;
    }

    let filtered = [...properties];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(property => 
        property.title?.toLowerCase().includes(query) ||
        property.city?.toLowerCase().includes(query) ||
        property.address?.toLowerCase().includes(query) ||
        property.description?.toLowerCase().includes(query)
      );
    }

    // Apply property type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(property => property.propertyType === selectedType);
    }

    // Apply price filter
    filtered = filtered.filter(property => {
      const price = Number(property.price) || 0;
      return price >= minPrice && price <= maxPrice;
    });

    setFilteredProperties(filtered);
  }, [properties, searchQuery, selectedType, minPrice, maxPrice]);

  // Calculate max price for range slider
  const maxPropertyPrice = properties.length > 0 
    ? Math.max(...properties.map(p => Number(p.price) || 0))
    : 10000000;

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading premium properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Unable to Load Properties</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Gulf Real Estate Portfolio
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Exclusive verified properties with complete legal compliance and market insights
            </p>
            <div className="flex flex-wrap gap-4 items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{properties.length} Verified Listings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>RERA Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span>Direct Agent Contact</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search properties by location, title, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Property Type Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedType === type.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.icon}
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="lg:w-96">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: {minPrice.toLocaleString()} - {maxPrice.toLocaleString()} AED
              </label>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max={maxPropertyPrice}
                  step="100000"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="range"
                  min="0"
                  max={maxPropertyPrice}
                  step="100000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-end">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
                  title="Grid view"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                  title="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredProperties.length}</span> of{' '}
              <span className="font-semibold">{properties.length}</span> properties
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('all');
                setMinPrice(0);
                setMaxPrice(maxPropertyPrice);
              }}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        </div>

        {/* Properties Grid/List */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Properties Found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || selectedType !== 'all' || minPrice > 0 || maxPrice < maxPropertyPrice
                  ? 'Try adjusting your filters or search criteria.'
                  : 'Properties will appear here once they are added via the admin panel.'}
              </p>
              {(searchQuery || selectedType !== 'all' || minPrice > 0 || maxPrice < maxPropertyPrice) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedType('all');
                    setMinPrice(0);
                    setMaxPrice(maxPropertyPrice);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => {
              // Convert property data to match PropertyCard interface
              const cardProperty = {
                id: property.id,
                title: property.title,
                price: property.price,
                location: `${property.address}, ${property.city}`,
                type: property.propertyType,
                bedrooms: property.beds,
                bathrooms: property.baths,
                description: property.description,
                area: property.area,
                status: property.status,
                rentalYield: '7.2%', // Default or calculate from property data
                images: property.heroImage ? [property.heroImage] : [],
              };

              return (
                <PropertyCard
                  key={property.id}
                  property={cardProperty}
                  language="en"
                />
              );
            })}
          </div>
        ) : (
          // List View
          <div className="space-y-4">
            {filteredProperties.map((property) => {
              const cardProperty = {
                id: property.id,
                title: property.title,
                price: property.price,
                location: `${property.address}, ${property.city}`,
                type: property.propertyType,
                bedrooms: property.beds,
                bathrooms: property.baths,
                description: property.description,
                area: property.area,
                status: property.status,
                rentalYield: '7.2%',
                images: property.heroImage ? [property.heroImage] : [],
              };

              return (
                <div key={property.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Property Image */}
                    <div className="md:w-64 md:h-48">
                      <div className="w-full h-48 md:h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                        {property.heroImage ? (
                          <img
                            src={property.heroImage}
                            alt={property.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="%239ca3af" text-anchor="middle" dy=".3em">No Image</text></svg>';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Home className="w-12 h-12" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Property Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{property.title}</h3>
                          <p className="text-gray-600 flex items-center gap-1">
                            <Search className="w-4 h-4" />
                            {property.address}, {property.city}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {property.propertyType?.charAt(0).toUpperCase() + property.propertyType?.slice(1)}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{property.beds || 0}</div>
                          <div className="text-sm text-gray-600">Bedrooms</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{property.baths || 0}</div>
                          <div className="text-sm text-gray-600">Bathrooms</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{property.area || 0}</div>
                          <div className="text-sm text-gray-600">{property.areaUnit || 'sqft'}</div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-lg font-bold text-gray-900">
                            {property.currency} {Number(property.price || 0).toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">Total Price</div>
                        </div>
                        <a
                          href={`/properties/${property.id}`}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Note */}
        {filteredProperties.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center text-gray-600 text-sm">
              <p className="mb-2">All properties are verified and comply with local regulations.</p>
              <p>Need assistance? Contact our support team for personalized guidance.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
