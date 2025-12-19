export const translations = {
  en: {
    title: 'Premium Properties',
    subtitle: 'Discover exclusive real estate opportunities',
    searchPlaceholder: 'Search properties...',
    all: 'All',
    villa: 'Villa',
    apartment: 'Apartment',
    penthouse: 'Penthouse',
    townhouse: 'Townhouse',
    allPrices: 'All Prices',
    upTo: 'Up to',
    currency: 'AED',
    propertiesFound: 'Properties Found',
    sortBy: 'Sort By',
    noProperties: 'No properties found',
    tryAdjusting: 'Try adjusting your search criteria',
    dubai: 'Dubai',
    abuDhabi: 'Abu Dhabi',
    sharjah: 'Sharjah',
    jeddah: 'Jeddah',
    riyadh: 'Riyadh',
    doha: 'Doha'
  },
  ar: {
    title: 'العقارات المميزة',
    subtitle: 'اكتشف فرص عقارية حصرية',
    searchPlaceholder: 'ابحث عن عقارات...',
    all: 'الكل',
    villa: 'فيلا',
    apartment: 'شقة',
    penthouse: 'بنتهاوس',
    townhouse: 'تاون هاوس',
    allPrices: 'جميع الأسعار',
    upTo: 'حتى',
    currency: 'درهم',
    propertiesFound: 'عقار تم العثور عليه',
    sortBy: 'فرز حسب',
    noProperties: 'لم يتم العثور على عقارات',
    tryAdjusting: 'حاول تعديل معايير البحث',
    dubai: 'دبي',
    abuDhabi: 'أبو ظبي',
    sharjah: 'الشارقة',
    jeddah: 'جدة',
    riyadh: 'الرياض',
    doha: 'الدوحة'
  }
};

export const useTranslations = (lang: 'en' | 'ar') => {
  return translations[lang];
};
