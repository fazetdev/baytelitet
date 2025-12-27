'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  LayoutGrid, 
  List as ListIcon,
  Building2,
  FileText
} from 'lucide-react';
// FIXED: Wrapped useGulfComplianceStore in curly braces
import { useGulfComplianceStore } from '@/lib/stores/compliance/gulfComplianceStore';
import { useGulfAssetStore } from '@/lib/stores/gulfAssetStore';
import PropertyForm from '@/components/PropertyForm';

export default function AssetOnboardingPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isAdding, setIsAdding] = useState(false);
  const { properties } = useGulfAssetStore();
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {lang === 'en' ? 'Property Onboarding' : 'تسجيل العقارات'}
          </h1>
          <p className="text-gray-500">
            {lang === 'en' ? 'Manage and verify new listings' : 'إدارة والتحقق من القوائم الجديدة'}
          </p>
        </div>
        <div className="flex gap-2">
           <button 
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="px-4 py-2 bg-white border rounded-lg shadow-sm font-medium"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-blue-700 transition-all"
          >
            <Plus size={18} />
            {isAdding ? (lang === 'en' ? 'View Listings' : 'عرض القوائم') : (lang === 'en' ? 'Add Property' : 'إضافة عقار')}
          </button>
        </div>
      </div>

      {isAdding ? (
        <div className="max-w-4xl mx-auto">
          <PropertyForm lang={lang} />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex gap-4 items-center bg-white p-4 rounded-xl border shadow-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={lang === 'en' ? "Search properties..." : "بحث عن العقارات..."}
              />
            </div>
            <div className="flex border rounded-lg overflow-hidden">
              <button 
                onClick={() => setView('grid')}
                className={`p-2 ${view === 'grid' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-400'}`}
              >
                <LayoutGrid size={20} />
              </button>
              <button 
                onClick={() => setView('list')}
                className={`p-2 ${view === 'list' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-400'}`}
              >
                <ListIcon size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  {property.heroImage ? (
                    <img src={property.heroImage} alt={property.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Building2 size={48} />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-blue-600">
                    {property.price} {property.currency}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 truncate">{property.title}</h3>
                  <p className="text-xs text-gray-500 mb-4">{property.city}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                      property.complianceStatus === 'verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {property.complianceStatus || 'pending'}
                    </span>
                    <button className="text-blue-600">
                      <FileText size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
