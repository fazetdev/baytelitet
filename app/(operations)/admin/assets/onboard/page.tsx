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
import { useProperties } from "/app/context/useProperties";
import PropertyForm from './components/PropertyForm';

export default function AssetOnboardingPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { properties, loadProperties, deleteProperty } = useProperties();
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
          <p className="text-gray-600">
            {lang === 'en' ? 'Manage and register new properties' : 'إدارة وتسجيل العقارات الجديدة'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            {lang === 'en' ? 'Add Property' : 'إضافة عقار'}
          </button>

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as 'en' | 'ar')}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={lang === 'en' ? 'Search properties...' : 'بحث في العقارات...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 border rounded-lg">
            <Filter size={20} />
          </button>

          <div className="flex border rounded-lg overflow-hidden">
            <button
              onClick={() => setView('grid')}
              className={`p-2 ${view === 'grid' ? 'bg-blue-50 text-blue-600' : 'bg-white'}`}
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 ${view === 'list' ? 'bg-blue-50 text-blue-600' : 'bg-white'}`}
            >
              <ListIcon size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Property Form Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {lang === 'en' ? 'Add New Property' : 'إضافة عقار جديد'}
              </h2>
              <button
                onClick={() => setIsAdding(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <PropertyForm
                lang={lang}
                onSuccess={() => {
                  setIsAdding(false);
                  loadProperties();
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Properties List/Grid */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12">
          <Building2 className="mx-auto text-gray-300" size={64} />
          <h3 className="text-gray-700 mt-4">
            {lang === 'en' ? 'No properties found' : 'لم يتم العثور على عقارات'}
          </h3>
          <p className="text-gray-500">
            {lang === 'en' ? 'Add your first property to get started' : 'أضف عقارك الأول للبدء'}
          </p>
        </div>
      ) : (
        <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className={`bg-white rounded-xl border overflow-hidden ${
                view === 'list' ? 'flex' : ''
              }`}
            >
              {view === 'list' && property.heroImage && (
                <div className="w-48 h-48 flex-shrink-0">
                  <img
                    src={property.heroImage}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-4 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{property.title}</h3>
                    <p className="text-gray-600 text-sm">{property.city}, {property.country}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-700">
                      {property.price} {property.currency}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      property.complianceStatus === 'verified' ? 'bg-green-100 text-green-800' :
                      property.complianceStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {property.complianceStatus || 'draft'}
                    </span>
                  </div>
                </div>

                {view === 'grid' && property.heroImage && (
                  <div className="mt-3 h-48 rounded-lg overflow-hidden">
                    <img
                      src={property.heroImage}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{property.beds} beds</span>
                    <span>{property.baths} baths</span>
                    <span>{property.area} {property.areaUnit}</span>
                  </div>

                  <div className="flex items-center gap-2">
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
  );
}
