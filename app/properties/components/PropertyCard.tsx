'use client';

import { useState } from 'react';
import { MapPin, Bed, Bath, Square, Eye, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/formatters';

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    features: string[];
    status: string;
    virtualTour: boolean;
    goldenVisaEligible: boolean;
    rentalYield: string;
    images?: string[];
  };
  language?: 'ar' | 'en';
}

export default function PropertyCard({ property, language = 'en' }: PropertyCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

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
      type: {
        villa: 'Villa',
        apartment: 'Apartment',
        penthouse: 'Penthouse',
        townhouse: 'Townhouse'
      },
      status: {
        ready: 'Ready to Move',
        construction: 'Under Construction'
      }
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
      type: {
        villa: 'فيلا',
        apartment: 'شقة',
        penthouse: 'بنتهاوس',
        townhouse: 'تاون هاوس'
      },
      status: {
        ready: 'جاهز للسكن',
        construction: 'قيد الإنشاء'
      }
    }
  };

  const t = content[language];
  const isRTL = language === 'ar';

  const getTypeDisplay = (type: string) => {
    const typeMap: Record<string, string> = {
      villa: t.type.villa,
      apartment: t.type.apartment,
      penthouse: t.type.penthouse,
      townhouse: t.type.townhouse
    };
    return typeMap[type.toLowerCase()] || type;
  };

  const getStatusDisplay = (status: string) => {
    if (status.toLowerCase().includes('ready')) return t.status.ready;
    if (status.toLowerCase().includes('construction')) return t.status.construction;
    return status;
  };

  const formatArea = (area: number) => {
    if (language === 'ar') {
      return area.toLocaleString('ar-EG');
    }
    return area.toLocaleString();
  };

  // Toggle favorite
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Save to localStorage
    const favorites = JSON.parse(localStorage.getItem('baytelite-favorites') || '[]');
    if (!isFavorite) {
      favorites.push(property.id);
    } else {
      const index = favorites.indexOf(property.id);
      if (index > -1) favorites.splice(index, 1);
    }
    localStorage.setItem('baytelite-favorites', JSON.stringify(favorites));
  };

  // Share property
  const handleShare = async () => {
    setIsSharing(true);
    const shareUrl = `${window.location.origin}/properties/${property.id}`;
    const shareText = `${property.title} - ${property.location} - ${formatCurrency(property.price)}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: property.title,
          text: shareText,
          url: shareUrl,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareUrl);
        alert(t.linkCopied);
      }
    } catch (error) {
      console.error('Share failed:', error);
    } finally {
      setIsSharing(false);
    }
  };

  // Load favorite status from localStorage on mount
  useState(() => {
    const favorites = JSON.parse(localStorage.getItem('baytelite-favorites') || '[]');
    setIsFavorite(favorites.includes(property.id));
  });

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-bayt-cool/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-64 bg-gradient-to-br from-bayt-dark to-bayt-warm">
        {/* Image or Placeholder */}
        {property.images?.[0] && !imageError ? (
          <>
            <img 
              src={property.images[0]}
              alt={property.title}
              className={`w-full h-full object-cover ${!imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-4xl">🏠</div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-bayt-dark/70 to-transparent"></div>
        
        <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
          <span className="bg-bayt-dark text-white px-3 py-1 rounded-full text-sm font-semibold">
            {getTypeDisplay(property.type)}
          </span>
        </div>
        
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} flex gap-2`}>
          <button 
            onClick={toggleFavorite}
            className={`p-2 rounded-full transition-colors ${isFavorite ? 'bg-red-500/80' : 'bg-white/20 backdrop-blur-sm hover:bg-white/30'}`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'text-white fill-white' : 'text-white'}`} />
          </button>
          <button 
            onClick={handleShare}
            disabled={isSharing}
            className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 disabled:opacity-50"
            aria-label="Share property"
          >
            <Share2 className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'} text-white`}>
          <div className="text-2xl font-bold text-bayt-warm">{formatCurrency(property.price)}</div>
          <div className="text-sm opacity-90 text-bayt-light">{getStatusDisplay(property.status)}</div>
        </div>
      </div>

      {/* Content Section (same as before) */}
      <div className="p-6">
        <h3 className={`text-xl font-bold text-bayt-dark mb-2 hover:text-bayt-warm cursor-pointer ${isRTL ? 'text-right' : ''}`}>
          {property.title}
        </h3>

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

        <div className={`flex flex-wrap gap-2 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {property.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="bg-bayt-light text-bayt-dark px-3 py-1 rounded-full text-sm">
              {feature}
            </span>
          ))}
          {property.features.length > 3 && (
            <span className="bg-bayt-light text-bayt-dark px-3 py-1 rounded-full text-sm">
              +{property.features.length - 3} {t.more}
            </span>
          )}
        </div>

        <div className={`flex flex-wrap gap-2 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {property.virtualTour && (
            <span className={`inline-flex items-center gap-1 bg-bayt-cool/20 text-bayt-dark px-3 py-1 rounded-full text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Eye className="w-3 h-3" />
              {t.virtualTour}
            </span>
          )}
          {property.goldenVisaEligible && (
            <span className="inline-flex items-center gap-1 bg-bayt-warm/20 text-bayt-dark px-3 py-1 rounded-full text-sm">
              🏆 {t.goldenVisa}
            </span>
          )}
          <span className={`inline-flex items-center gap-1 bg-bayt-cultural/20 text-bayt-dark px-3 py-1 rounded-full text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
            📈 {property.rentalYield} {t.yield}
          </span>
        </div>

        <p className={`text-gray-600 text-sm mb-6 line-clamp-2 ${isRTL ? 'text-right' : ''}`}>
          {property.description}
        </p>

        <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Link 
            href={`/properties/${property.id}`}
            className={`flex-1 bg-gradient-to-r from-bayt-warm to-yellow-700 text-bayt-dark text-center py-3 rounded-xl font-semibold hover:from-yellow-700 hover:to-bayt-warm transition-all ${isRTL ? 'text-right' : ''}`}
          >
            {t.viewDetails}
          </Link>
          <Link 
            href={`/calculator?property=${property.id}`}
            className={`flex-1 border-2 border-bayt-cool text-bayt-dark text-center py-3 rounded-xl font-semibold hover:bg-bayt-light transition-all ${isRTL ? 'text-right' : ''}`}
          >
            {t.calculatePayment}
          </Link>
        </div>
      </div>
    </div>
  );
}
