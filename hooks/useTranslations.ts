import { useMemo } from 'react';

export const useTranslations = (lang: 'en' | 'ar') => {
  const translations = useMemo(() => ({
    en: {
      nav: {
        buy: 'Buy',
        tours: 'Tours',
        admin: 'Admin Panel'
      },
      title: 'Find Your Elite Home',
      subtitle: 'Discover premium properties in the most prestigious locations.',
      searchPlaceholder: 'Search properties...',
      all: 'All',
      villa: 'Villa',
      apartment: 'Apartment',
      penthouse: 'Penthouse',
      townhouse: 'Townhouse',
      allPrices: 'All Prices',
      upTo: 'Up to',
      currency: 'AED',
      dubai: 'Dubai',
      abuDhabi: 'Abu Dhabi',
      sharjah: 'Sharjah',
      ajman: 'Ajman',
      rasAlKhaimah: 'RAK',
      fujairah: 'Fujairah',
      ummAlQuwain: 'UAQ',
      riyadh: 'Riyadh',
      jeddah: 'Jeddah',
      doha: 'Doha',
    },
    ar: {
      nav: {
        buy: 'شراء',
        tours: 'جولات',
        admin: 'لوحة التحكم'
      },
      title: 'اعثر على منزلك النخبة',
      subtitle: 'اكتشف العقارات الفاخرة في أرقى المواقع.',
      searchPlaceholder: 'البحث عن العقارات...',
      all: 'الكل',
      villa: 'فيلا',
      apartment: 'شقة',
      penthouse: 'بنتهاوس',
      townhouse: 'تاون هاوس',
      allPrices: 'جميع الأسعار',
      upTo: 'يصل إلى',
      currency: 'درهم',
      dubai: 'دبي',
      abuDhabi: 'أبو ظبي',
      sharjah: 'الشارقة',
      ajman: 'عجمان',
      rasAlKhaimah: 'رأس الخيمة',
      fujairah: 'الفجيرة',
      ummAlQuwain: 'أم القيوين',
      riyadh: 'الرياض',
      jeddah: 'جدة',
      doha: 'الدوحة',
    }
  }), []);

  return translations[lang];
};
