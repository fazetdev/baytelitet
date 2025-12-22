'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from './components/PropertyCard';
import PropertyDetailsModal from './components/PropertyDetailsModal';
import { useProperties, Property } from '@/context/useProperties';
import { useLanguage } from '@/context/useLanguage';
import { Search } from 'lucide-react';

export default function PropertiesPage() {
  const { 
    filteredProperties, // This is the logic-heavy list from Context
    searchQuery, 
    setSearchQuery,
    selectedType,
    setSelectedType,
    setSelectedCity
  } = useProperties();
  
  const { lang } = useLanguage();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6 mb-8">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={lang === 'ar' ? 'بحث...' : 'Search properties or cities...'}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-bayt-warm outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Type Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['all', 'villa', 'apartment', 'penthouse'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                  selectedType === type ? 'bg-bayt-dark text-white shadow-md' : 'bg-white text-gray-600'
                }`}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
            <p className="text-gray-500">No properties found. Try clearing filters or adding one in Admin.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedType('all'); setSelectedCity('all');}} 
              className="mt-2 text-bayt-warm font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <div key={property.id} onClick={() => setSelectedProperty(property)}>
                <PropertyCard property={property} language={lang} />
              </div>
            ))}
          </div>
        )}
      </main>

      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          isOpen={!!selectedProperty}
          onClose={() => setSelectedProperty(null)}
          language={lang}
        />
      )}
      <Footer />
    </div>
  );
}
