'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Bed, Bath, Square, Eye, Heart, Share2 } from 'lucide-react';
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
    features?: string[];
    status?: string;
    virtualTour?: boolean;
    goldenVisaEligible?: boolean;
    rentalYield?: string;
    images?: string[];
    latitude?: number;
    longitude?: number;
  };
  language?: 'ar' | 'en';
}

export default function PropertyCard({ property, language = 'en' }: PropertyCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only render interactive elements after mount (SSR safety)
  useEffect(() => {
    setMounted(true);
    // FIX: Use 'in' operator to check for the share function
    if (typeof navigator !== 'undefined' && 'share' in navigator) setCanShare(true);
  }, []);

  const content = {
    en: {
      beds: 'Beds',
      baths: 'Baths',
      sqft: 'sqft',
      virtualTour: 'Virtual Tour',
      goldenVisa: 'Golden Visa',
      yield: 'Yield',
      viewDetails: 'View Details',
      calculatePayment: 'Calculate Payment',
      more: 'more',
      linkCopied: 'Link copied!',
      type: { villa: 'Villa', apartment: 'Apartment', penthouse: 'Penthouse', townhouse: 'Townhouse' },
      status: { ready: 'Ready to Move', construction: 'Under Construction' },
    },
    ar: {
      beds: 'غرف',
      baths: 'حمامات',
      sqft: 'قدم مربع',
      virtualTour: 'جولة افتراضية',
      goldenVisa: 'فيزا ذهبية',
      yield: 'عائد',
      viewDetails: 'عرض التفاصيل',
      calculatePayment: 'حساب السداد',
      more: 'المزيد',
      linkCopied: 'تم نسخ الرابط!',
      type: { villa: 'فيلا', apartment: 'شقة', penthouse: 'بنتهاوس', townhouse: 'تاون هاوس' },
      status: { ready: 'جاهز للسكن', construction: 'قيد الإنشاء' },
    },
  };

  const t = content[language] || content['en'];
  const isRTL = language === 'ar';

  const formatArea = (area?: number) => (area ? area.toLocaleString(language === 'ar' ? 'ar-EG' : undefined) : '0');

  const toggleFavorite = () => {
    if (typeof window === 'undefined') return;
    setIsFavorite(!isFavorite);
    const favorites = JSON.parse(localStorage.getItem('baytelite-favorites') || '[]');
    if (!isFavorite) favorites.push(property.id);
    else {
      const index = favorites.indexOf(property.id);
      if (index > -1) favorites.splice(index, 1);
    }
    localStorage.setItem('baytelite-favorites', JSON.stringify(favorites));
  };

  const handleShare = async () => {
    if (typeof window === 'undefined') return;
    setIsSharing(true);
    const shareUrl = `${window.location.origin}/properties/${property.id}`;
    const shareText = `${property.title} - ${property.location} - ${formatCurrency(property.price)}`;

    try {
      if (navigator.share) {
        await navigator.share({ title: property.title, text: shareText, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert(t.linkCopied);
      }
    } catch (error) {
      console.error('Share failed:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-bayt-cool/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-64 bg-gradient-to-br from-bayt-dark to-bayt-warm">
        {property.images?.[0] && !imageError ? (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className={`object-cover ${!imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-4xl">🏠</div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-bayt-dark/70 to-transparent"></div>

        <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
          <span className="bg-bayt-dark text-white px-3 py-1 rounded-full text-sm font-semibold">{t.type[property.type.toLowerCase()] || property.type}</span>
        </div>

        {mounted && (
          <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} flex gap-2`}>
            <button onClick={toggleFavorite} className={`p-2 rounded-full transition-colors ${isFavorite ? 'bg-red-500/80' : 'bg-white/20 backdrop-blur-sm hover:bg-white/30'}`}>
              <Heart className={`w-5 h-5 ${isFavorite ? 'text-white fill-white' : 'text-white'}`} />
            </button>
            <button onClick={handleShare} disabled={isSharing} className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 disabled:opacity-50">
              <Share2 className="w-5 h-5 text-white" />
            </button>
          </div>
        )}

        <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'} text-white`}>
          <div className="text-2xl font-bold text-bayt-warm">{formatCurrency(property.price)}</div>
          <div className="text-sm opacity-90 text-bayt-light">{property.status ? t.status[property.status.toLowerCase()] || property.status : ''}</div>
        </div>
      </div>

      <div className="p-6">
        <h3 className={`text-xl font-bold text-bayt-dark mb-2 hover:text-bayt-warm cursor-pointer ${isRTL ? 'text-right' : ''}`}>{property.title}</h3>

        <div className={`flex items-center text-bayt-cool mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <MapPin className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
          <span className={`text-sm ${isRTL ? 'text-right' : ''}`}>{property.location}</span>
        </div>

        <div className={`flex items-center gap-6 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Bed className="w-5 h-5 text-bayt-warm" />
            <span className="font-semibold text-bayt-dark">{property.bedrooms}</span>
            <span className="text-bayt-cool text-sm">{t.beds}</span>
          </div>
          <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Bath className="w-5 h-5 text-bayt-warm" />
            <span className="font-semibold text-bayt-dark">{property.bathrooms}</span>
            <span className="text-bayt-cool text-sm">{t.baths}</span>
          </div>
          <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Square className="w-5 h-5 text-bayt-warm" />
            <span className="font-semibold text-bayt-dark">{formatArea(property.area)}</span>
            <span className="text-bayt-cool text-sm">{t.sqft}</span>
          </div>
        </div>

        <p className={`text-gray-600 text-sm mb-6 line-clamp-2 ${isRTL ? 'text-right' : ''}`}>{property.description}</p>

        <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Link href={`/properties/${property.id}`} className="flex-1 bg-gradient-to-r from-bayt-warm to-yellow-700 text-bayt-dark text-center py-3 rounded-xl font-semibold hover:from-yellow-700 hover:to-bayt-warm transition-all">{t.viewDetails}</Link>
          <Link href={`/calculator?property=${property.id}`} className="flex-1 border-2 border-bayt-cool text-bayt-dark text-center py-3 rounded-xl font-semibold hover:bg-bayt-light transition-all">{t.calculatePayment}</Link>
        </div>
      </div>
    </div>
  );
}
