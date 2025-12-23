'use client';

import React, { useState, useEffect } from 'react';
import PropertyCard from './components/PropertyCard';
import PropertyDetailsModal from './components/PropertyDetailsModal';
import { useProperties, Property } from '@/context/useProperties';
import { useLanguage } from '@/context/useLanguage';
import { Search, Filter, LayoutGrid } from 'lucide-react';

export default function PropertiesPage() {
  const { filteredProperties, searchQuery, setSearchQuery, setSelectedType, selectedType, setSelectedCity } = useProperties();
  const { lang } = useLanguage();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const isRTL = lang === 'ar';

  return (
    <div className="min-h-screen bg-bayt-dark pb-20">
      {/* Search & Intelligence Header */}
      <div className="border-b border-white/10 bg-bayt-dark/50 backdrop-blur-xl sticky top-0 z-30">
        <main className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative w-full lg:w-2/3">
              <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-bayt-gold w-5 h-5`} />
              <input
                type="text"
                placeholder={isRTL ? 'ابحث في محفظة الأصول...' : 'SEARCH ASSET PORTFOLIO...'}
                className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 focus:border-bayt-gold/50 outline-none transition-all font-black italic uppercase tracking-widest text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 w-full lg:w-1/3 overflow-x-auto no-scrollbar">
              {['all', 'villa', 'apartment', 'penthouse'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-6 py-3 border transition-all whitespace-nowrap font-black italic text-[10px] tracking-[0.2em] uppercase ${
                    selectedType === type 
                      ? 'bg-bayt-gold text-bayt-dark border-bayt-gold' 
                      : 'bg-transparent text-white border-white/10 hover:border-bayt-gold/50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* Market Status Strip */}
        <div className="flex justify-between items-end mb-10 border-b border-bayt-gold/20 pb-4">
          <div>
            <h2 className="text-bayt-gold font-black italic uppercase tracking-tighter text-3xl">
              {isRTL ? 'القائمة الحصرية' : 'EXCLUSIVE INVENTORY'}
            </h2>
            <p className="text-bayt-cool text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
              Showing {filteredProperties.length} Verified High-Yield Assets
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4 text-white/40">
            <LayoutGrid className="w-5 h-5 text-bayt-gold" />
            <Filter className="w-5 h-5" />
          </div>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="text-center py-40 border-2 border-dashed border-white/5 rounded-3xl">
            <p className="text-bayt-cool font-black italic uppercase tracking-widest mb-4">No assets match your criteria</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedType('all'); setSelectedCity('all');}} 
              className="px-8 py-3 bg-bayt-gold text-bayt-dark font-black italic uppercase text-xs active:scale-95 transition-transform"
            >
              Reset Terminal
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProperties.map((property) => (
              <div 
                key={property.id} 
                onClick={() => setSelectedProperty(property)}
                className="cursor-pointer"
              >
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
    </div>
  );
}
