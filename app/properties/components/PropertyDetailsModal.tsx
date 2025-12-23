'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, MapPin, Bed, Bath, TrendingUp, Zap, ShieldCheck, Loader2 } from 'lucide-react';
import { Property } from '@/context/useProperties';
import { formatCurrency } from '@/lib/formatters';

interface PropertyDetailsModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'ar';
}

export default function PropertyDetailsModal({ property, isOpen, onClose, language }: PropertyDetailsModalProps) {
  const [mounted, setMounted] = useState(false);
  const isRTL = language === 'ar';

  // 1. Handle Mounting for SSR Safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Prevent Background Scroll & Handle Escape Key
  useEffect(() => {
    if (!isOpen || !mounted) return;

    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, mounted, onClose]);

  if (!mounted || !isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bayt-dark/95 backdrop-blur-md transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
    >
      <div 
        dir={isRTL ? 'rtl' : 'ltr'}
        className="bg-bayt-dark w-full max-w-5xl max-h-[90vh] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.15)] relative flex flex-col animate-in fade-in zoom-in duration-300"
      >
        {/* Dossier Header Strip */}
        <div className="flex justify-between items-center px-8 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-bayt-gold rounded-full animate-pulse" />
            <span className="text-[10px] text-bayt-gold font-black italic uppercase tracking-[0.3em]">
              {isRTL ? 'ملف الأصول السري' : 'CONFIDENTIAL ASSET DOSSIER'}
            </span>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close dossier"
            className="text-white/40 hover:text-bayt-gold transition-colors flex items-center gap-2 font-black italic text-[10px] tracking-widest outline-none focus:text-bayt-gold"
          >
            {isRTL ? 'إغلاق' : 'CLOSE'} <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto custom-scrollbar">
          {/* Hero Visual Section */}
          <div className="relative h-72 md:h-[450px] bg-black">
            {property.images?.[0] ? (
              <Image 
                src={property.images[0]} 
                alt={property.title}
                fill
                priority
                className="object-cover opacity-60 grayscale-[0.2]"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-bayt-dark">
                <Loader2 className="w-8 h-8 text-bayt-gold/20 animate-spin" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-bayt-dark via-transparent to-transparent" />
            
            <div className={`absolute bottom-8 ${isRTL ? 'right-8' : 'left-8'} max-w-2xl`}>
              <div className="bg-bayt-gold text-bayt-dark inline-block px-3 py-1 text-[10px] font-black italic uppercase mb-4">
                {property.type}
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-2 leading-none">
                {property.title}
              </h2>
              <p className="flex items-center text-bayt-gold font-bold text-sm tracking-widest uppercase">
                <MapPin className="w-4 h-4 mr-2 ml-2" /> {property.location}
              </p>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-3 space-y-12">
              {/* Tactical Specs Strip */}
              <div className="grid grid-cols-3 gap-8 py-8 border-y border-white/10">
                <div className="text-center md:text-start">
                  <p className="text-bayt-gold font-black italic text-3xl">{property.bedrooms}</p>
                  <p className="text-[10px] text-bayt-cool font-black uppercase tracking-widest">{isRTL ? 'غرف النوم' : 'Bedrooms'}</p>
                </div>
                <div className="border-x border-white/10 px-8 text-center md:text-start">
                  <p className="text-bayt-gold font-black italic text-3xl">{property.bathrooms}</p>
                  <p className="text-[10px] text-bayt-cool font-black uppercase tracking-widest">{isRTL ? 'حمامات' : 'Bathrooms'}</p>
                </div>
                <div className="text-center md:text-start">
                  <p className="text-bayt-gold font-black italic text-3xl">{property.area || 'TBD'}</p>
                  <p className="text-[10px] text-bayt-cool font-black uppercase tracking-widest">SQFT</p>
                </div>
              </div>

              <div>
                <h3 className="text-bayt-gold font-black italic text-sm tracking-[0.2em] uppercase mb-4">
                  {isRTL ? 'التحليل الاستراتيجي' : 'STRATEGIC ANALYSIS'}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed font-medium">
                  {property.description}
                </p>
              </div>
            </div>

            {/* Side Action Panel */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white/5 border border-white/10 p-6">
                <p className="text-[10px] text-bayt-cool font-black uppercase tracking-widest mb-2">
                  {isRTL ? 'القيمة السوقية' : 'MARKET VALUE'}
                </p>
                <p className="text-3xl font-black text-white italic tracking-tighter">
                  {formatCurrency(property.price)}
                </p>
              </div>

              <div className="bg-bayt-gold/10 border border-bayt-gold/20 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-bayt-gold" />
                  <span className="text-[10px] text-bayt-gold font-black uppercase tracking-widest">Target ROI</span>
                </div>
                <p className="text-3xl font-black text-white italic">{property.rentalYield || '7.2%'}</p>
              </div>

              <Link 
                href={`/properties/${property.id}`}
                className="w-full bg-bayt-gold hover:bg-white text-bayt-dark py-5 font-black italic uppercase text-xs flex items-center justify-center gap-2 transition-all active:scale-95 group"
              >
                <Zap className="w-4 h-4 fill-current group-hover:animate-pulse" />
                {isRTL ? 'بدء التنفيذ' : 'EXECUTE VIEW'}
              </Link>

              <div className="flex items-center gap-2 text-[9px] text-bayt-cool font-bold uppercase tracking-tighter text-center justify-center pt-4">
                <ShieldCheck className="w-3 h-3" /> VERIFIED BY BAYTELITE MGMT
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
