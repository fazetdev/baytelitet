'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Bed, Bath, Square, Heart, Share2, ShieldCheck, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/formatters';

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    price: number;
    location: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    description?: string;
    area?: number;
    status?: string;
    rentalYield?: string;
    images?: string[];
  };
  language?: 'ar' | 'en';
}

export default function PropertyCard({ property, language = 'en' }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isRTL = language === 'ar';

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = {
    en: { beds: 'BD', baths: 'BA', sqft: 'SQFT', yield: 'YIELD', details: 'VIEW ASSET' },
    ar: { beds: 'غرف', baths: 'حمام', sqft: 'قدم', yield: 'عائد', details: 'عرض الأصول' }
  }[language];

  if (!mounted) return <div className="h-[500px] bg-bayt-dark/10 rounded-3xl animate-pulse" />;

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="group bg-bayt-dark border border-white/10 overflow-hidden transition-all duration-500 hover:border-bayt-gold/50 shadow-2xl active:scale-[0.98]">
      {/* Visual Asset Container */}
      <div className="relative h-72 overflow-hidden">
        {property.images?.[0] ? (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-bayt-dark flex items-center justify-center">
            <span className="text-bayt-gold/20 font-black italic uppercase">No Visuals</span>
          </div>
        )}
        
        {/* Brutalist Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-bayt-dark via-transparent to-transparent opacity-80" />
        
        <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
          <div className="bg-bayt-gold text-bayt-dark px-3 py-1 text-[10px] font-black italic uppercase tracking-tighter">
            {property.type}
          </div>
        </div>

        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} flex gap-2`}>
          <button onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }} className="bg-bayt-dark/60 backdrop-blur-md p-2 hover:bg-bayt-gold transition-colors">
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white text-white' : 'text-white'}`} />
          </button>
        </div>

        <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'} flex items-center gap-2`}>
          <div className="flex items-center gap-1 bg-green-500/20 backdrop-blur-md px-2 py-1 border border-green-500/30">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-green-400 text-[10px] font-black italic">{property.rentalYield || '7.2%'} {t.yield}</span>
          </div>
        </div>
      </div>

      {/* Financial Data Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-black italic uppercase text-white tracking-tighter group-hover:text-bayt-gold transition-colors truncate max-w-[200px]">
              {property.title}
            </h3>
            <p className="text-bayt-cool text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1">
              <MapPin className="w-3 h-3 text-bayt-gold" /> {property.location}
            </p>
          </div>
          <div className="text-right">
            <p className="text-bayt-gold font-black text-xl leading-none">{formatCurrency(property.price)}</p>
            <p className="text-[9px] text-bayt-cool font-bold uppercase mt-1">Investment Value</p>
          </div>
        </div>

        {/* Tactical Specs Strip */}
        <div className="grid grid-cols-3 gap-2 border-y border-white/5 py-4 mb-6">
          <div className="text-center">
            <p className="text-bayt-gold font-black italic text-lg">{property.bedrooms}</p>
            <p className="text-[9px] text-bayt-cool font-bold uppercase tracking-widest">{t.beds}</p>
          </div>
          <div className="text-center border-x border-white/5">
            <p className="text-bayt-gold font-black italic text-lg">{property.bathrooms}</p>
            <p className="text-[9px] text-bayt-cool font-bold uppercase tracking-widest">{t.baths}</p>
          </div>
          <div className="text-center">
            <p className="text-bayt-gold font-black italic text-lg">{property.area}</p>
            <p className="text-[9px] text-bayt-cool font-bold uppercase tracking-widest">{t.sqft}</p>
          </div>
        </div>

        <Link 
          href={`/properties/${property.id}`}
          className="w-full bg-white hover:bg-bayt-gold text-bayt-dark font-black italic uppercase text-center block py-4 transition-all duration-300 active:scale-95"
        >
          {t.details}
        </Link>
      </div>
    </div>
  );
}
