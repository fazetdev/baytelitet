'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useGulfAssetStore } from '@/lib/stores/gulfAssetStore';

export default function PropertiesPage() {
  const { properties, loadProperties } = useGulfAssetStore();

  useEffect(() => {
    // This connects to the same 'gulf-properties' storage the admin uses
    loadProperties();
  }, [loadProperties]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-black mb-8 italic uppercase tracking-widest text-gray-900 border-b-4 border-blue-600 inline-block">
        Available Assets
      </h1>

      {properties.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-20 text-center">
          <p className="text-gray-400 font-bold uppercase tracking-widest">No assets found in the portfolio.</p>
          <p className="text-xs text-gray-400 mt-2">Add properties via the Admin Onboarding panel.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Link
              key={property.id}
              href={`/properties/${property.id}`}
              className="group border border-gray-100 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white"
            >
              <div className="relative h-56 overflow-hidden bg-gray-100">
                {property.heroImage ? (
                  <img
                    src={property.heroImage}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 font-black uppercase text-xs">No Image</div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase">
                  {property.propertyType}
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="font-black text-xl uppercase italic truncate text-gray-900 group-hover:text-blue-600 transition-colors">
                  {property.title}
                </h2>
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Guide Price</p>
                    <p className="text-lg font-black text-gray-900">
                      {property.currency} {Number(property.price).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Location</p>
                    <p className="text-sm font-bold text-gray-600">{property.city}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
