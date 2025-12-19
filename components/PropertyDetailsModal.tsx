'use client';

import { useState, useEffect } from 'react';
import { Heart, Share2, X, Eye, Calendar, Calculator, Phone } from 'lucide-react';
import Slider from '@/components/Slider';
import { useProperties } from '@/context/useProperties';
import { useCalculator } from '@/context/useCalculator';
import { useLeads } from '@/context/useLeads';

interface PropertyDetailsModalProps {
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
  onClose: () => void;
  language?: 'ar' | 'en';
}

export default function PropertyDetailsModal({ property, onClose, language = 'en' }: PropertyDetailsModalProps) {
  const { favorites, toggleFavorite } = useProperties();
  const { setPropertyPrice } = useCalculator();
  const { contactLead, scheduleTour } = useLeads();
  const [isSharing, setIsSharing] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  const t = {
    en: {
      close: 'Close',
      virtualTour: '360° Virtual Tour',
      goldenVisa: 'Golden Visa',
      yield: 'Yield',
      contactAgent: 'Contact Agent',
      scheduleTour: 'Schedule Tour',
      calculatePayment: 'Calculate Mortgage',
      linkCopied: 'Link copied!',
      launchTour: 'Launch 360° Tour',
      features: 'Features'
    },
    ar: {
      close: 'إغلاق',
      virtualTour: 'جولة 360° افتراضية',
      goldenVisa: 'فيزا ذهبية',
      yield: 'عائد',
      contactAgent: 'اتصل بالوكيل',
      scheduleTour: 'جدولة زيارة',
      calculatePayment: 'حساب الرهن العقاري',
      linkCopied: 'تم نسخ الرابط!',
      launchTour: 'تشغيل جولة 360°',
      features: 'المميزات'
    }
  }[language];

  const isFavorite = favorites.includes(property.id);
  const isRTL = language === 'ar';

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleShare = async () => {
    setIsSharing(true);
    const shareUrl = `${window.location.origin}/properties/${property.id}`;
    const shareText = `${property.title} - ${property.location}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: property.title, text: shareText, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert(t.linkCopied);
      }
    } catch (err) {
      console.error('Share failed:', err);
    } finally {
      setIsSharing(false);
    }
  };

  const handleMortgage = () => {
    setPropertyPrice(property.price);
    onClose();
    // Navigate to calculator page
    window.location.href = '/calculator';
  };

  const handleContact = () => {
    const name = prompt('Enter your name:');
    const email = prompt('Enter your email:');
    const phone = prompt('Enter your phone:');
    
    if (name && email && phone) {
      contactLead(property.id, name, email, phone);
      alert('Contact request submitted!');
    }
  };

  const handleScheduleTour = () => {
    const dateStr = prompt('Enter preferred date (YYYY-MM-DD):');
    if (dateStr) {
      const date = new Date(dateStr);
      scheduleTour(property.id, date);
      alert('Tour scheduled!');
    }
  };

  const handleVirtualTour = () => {
    // Open virtual tour page or component
    window.open(`/tours/${property.id}`, '_blank');
  };

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'} 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          aria-label={t.close} 
          className={`absolute top-4 z-10 ${isRTL ? 'left-4' : 'right-4'} p-2 rounded-full hover:bg-gray-200`}
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        {/* Image Slider */}
        {property.images?.length ? (
          <Slider images={property.images} />
        ) : (
          <div className="h-64 flex items-center justify-center bg-gray-200 text-4xl">🏠</div>
        )}

        <div className="p-6">
          {/* Title & Location */}
          <h2 id="modal-title" className={`text-2xl font-bold text-bayt-dark mb-2 ${isRTL ? 'text-right' : ''}`}>
            {property.title}
          </h2>
          <p className={`text-bayt-cool mb-4 ${isRTL ? 'text-right' : ''}`}>
            {property.location}
          </p>

          {/* Price & Status */}
          <div className={`flex justify-between items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="text-2xl font-bold text-bayt-warm">
              {property.price.toLocaleString(language === 'ar' ? 'ar-EG' : undefined)} AED
            </div>
            <div className="text-sm text-gray-500">{property.status}</div>
          </div>

          {/* Features */}
          <div className={`flex gap-4 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span>{property.bedrooms} 🛏</span>
            <span>{property.bathrooms} 🛁</span>
            <span>{property.area} sqft</span>
          </div>

          {/* Interactive Badges */}
          <div className={`flex flex-wrap gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {property.virtualTour && (
              <button 
                onClick={handleVirtualTour}
                className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-purple-200 transition-colors"
              >
                <Eye className="w-4 h-4" /> 
                {t.launchTour}
              </button>
            )}
            {property.goldenVisaEligible && (
              <span className="bg-bayt-warm/20 text-bayt-dark px-3 py-1 rounded-full">🏆 {t.goldenVisa}</span>
            )}
            <span className="bg-bayt-cultural/20 text-bayt-dark px-3 py-1 rounded-full">📈 {property.rentalYield} {t.yield}</span>
          </div>

          {/* Description */}
          <p className={`text-gray-600 mb-4 ${isRTL ? 'text-right' : ''}`}>
            {property.description}
          </p>

          {/* Features List */}
          {property.features && property.features.length > 0 && (
            <div className={`mb-6 ${isRTL ? 'text-right' : ''}`}>
              <h3 className="font-bold text-lg mb-2">{t.features}:</h3>
              <div className="flex flex-wrap gap-2">
                {property.features.map((feature, index) => (
                  <span 
                    key={index} 
                    className="bg-bayt-light px-3 py-1 rounded-full text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className={`flex gap-3 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Favorite */}
            <button 
              onClick={() => toggleFavorite(property.id)} 
              className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-bayt-dark'}`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              {isFavorite ? 'Saved' : 'Save'}
            </button>

            {/* Share */}
            <button 
              onClick={handleShare} 
              disabled={isSharing} 
              className="flex-1 py-3 rounded-xl bg-gray-200 font-semibold hover:bg-gray-300 flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              {isSharing ? '...' : 'Share'}
            </button>

            {/* Contact Agent */}
            <button 
              onClick={handleContact} 
              className="flex-1 py-3 rounded-xl bg-bayt-warm text-bayt-dark font-semibold hover:bg-yellow-700 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              {t.contactAgent}
            </button>

            {/* Schedule Tour */}
            <button 
              onClick={handleScheduleTour}
              className="flex-1 py-3 rounded-xl bg-bayt-cool text-white font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              {t.scheduleTour}
            </button>

            {/* Mortgage Calculator */}
            <button 
              onClick={handleMortgage} 
              className="flex-1 py-3 rounded-xl border-2 border-bayt-cool text-bayt-dark font-semibold hover:bg-bayt-light flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              {t.calculatePayment}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
