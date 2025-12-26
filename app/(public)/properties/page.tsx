'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Property {
  id: string;
  title: string;
  price: string | number;
  image?: string;
  city?: string;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem('properties') || '[]'
    ) as Property[];
    setProperties(stored);
    setLoading(false);
  }, []);

  if (loading) return <div className="p-6">Loading Assets...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 italic uppercase tracking-widest">Available Assets</h1>
      
      {properties.length === 0 ? (
        <p className="text-gray-500">No properties found in local storage.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Link 
              key={property.id} 
              href={`/properties/${property.id}`}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white"
            >
              {property.image && (
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="font-bold text-lg truncate">{property.title}</h2>
                <p className="text-bayt-gold font-bold mt-2">
                  ₦ {Number(property.price).toLocaleString()}
                </p>
                {property.city && <p className="text-sm text-gray-500">{property.city}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
