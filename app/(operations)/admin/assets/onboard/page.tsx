'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List as ListIcon,
  Building2,
  FileText,
  Trash2
} from 'lucide-react';
import { useGulfAssetStore } from '@/lib/stores/gulfAssetStore';
import PropertyForm from '@/components/PropertyForm';

export default function AssetOnboardingPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { properties, loadProperties, deleteProperty } = useGulfAssetStore();
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  // Real-time filtering logic
  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string, title: string) => {
    const confirmMsg = lang === 'en' 
      ? `Are you sure you want to delete "${title}"?` 
      : `هل أنت متأكد من حذف "${title}"؟`;
    
    if (window.confirm(confirmMsg)) {
      deleteProperty(id);
    }
  };

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
          <PropertyForm lang={lang} onSuccess={() => setIsAdding(false)} />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex gap-4 items-center bg-white p-4 rounded-xl border shadow-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder={lang === 'en' ? "Search by title or city..." : "بحث بالعنوان أو المدينة..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

          {filteredProperties.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed flex flex-col items-center">
              <Building2 className="text-gray-300 mb-4" size={48} />
              <p className="text-gray-500">
                {properties.length === 0 
                  ? (lang === 'en' ? 'No properties found. Start by adding one!' : 'لا توجد عقارات. ابدأ بإضافة واحد!')
                  : (lang === 'en' ? 'No results match your search.' : 'لا توجد نتائج تطابق بحثك.')}
              </p>
            </div>
          ) : (
            <div className={view === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {filteredProperties.map((property) => (
                <div key={property.id} className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group ${view === 'list' ? 'flex items-center p-2' : ''}`}>
                  <div className={`${view === 'grid' ? 'aspect-video w-full' : 'w-24 h-24 rounded-lg'} bg-gray-200 relative shrink-0`}>
                    {property.heroImage ? (
                      <img src={property.heroImage} alt={property.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Building2 size={24} />
                      </div>
                    )}
                    {view === 'grid' && (
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-blue-600">
                        {property.price} {property.currency}
                      </div>
                    )}
                  </div>
                  <div className={`p-4 flex-1 min-w-0`}>
                    <h3 className="font-bold text-gray-900 truncate">{property.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">{property.city}</p>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                        property.complianceStatus === 'verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {property.complianceStatus || 'pending'}
                      </span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => property.id && handleDelete(property.id, property.title)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button className="text-blue-600">
                          <FileText size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
