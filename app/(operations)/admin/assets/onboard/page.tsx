'use client';

import { useState, useEffect } from 'react';
import {
  Upload,
  Shield,
  BarChart3,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Building2,
  Trash2
} from 'lucide-react';
import PropertyForm from '@/components/PropertyForm';
import { useGulfAssetStore, GulfProperty } from '@/lib/stores/gulfAssetStore';

interface PropertyStatus {
  id: string;
  title: string;
  city: string;
  price: string;
  status: 'draft' | 'submitted' | 'verified' | 'rejected' | 'pending';
  lastEdited: string;
  submittedDate?: string;
  reraValid?: boolean;
}

export default function OnboardingPage() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [view, setView] = useState<'form' | 'drafts' | 'submitted'>('form');

  const { properties: assetStoreProperties, deleteProperty, loadProperties } = useGulfAssetStore();

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  const formatPrice = (prop: GulfProperty) => {
    const val = typeof prop.price === 'string' ? parseFloat(prop.price) : prop.price;
    return isNaN(val) ? 'Price not set' : `${val.toLocaleString()} ${prop.currency || 'AED'}`;
  };

  const draftProperties: PropertyStatus[] = assetStoreProperties
    .filter(prop => !prop.complianceStatus || prop.complianceStatus === 'draft')
    .map(prop => ({
      id: prop.id || '',
      title: prop.title || 'Untitled Property',
      city: prop.city || 'Dubai',
      price: formatPrice(prop),
      status: 'draft',
      lastEdited: 'Recently',
      reraValid: !!prop.reraNumber
    }));

  const submittedProperties: PropertyStatus[] = assetStoreProperties
    .filter(prop => prop.complianceStatus && prop.complianceStatus !== 'draft')
    .map(prop => ({
      id: prop.id || '',
      title: prop.title || 'Untitled Property',
      city: prop.city || 'Dubai',
      price: formatPrice(prop),
      // Fix: Aligning statuses with the GulfAssetStore types
      status: (prop.complianceStatus === 'verified' ? 'verified' : 
               prop.complianceStatus === 'rejected' ? 'rejected' : 'pending') as any,
      lastEdited: 'Recently',
      submittedDate: 'Recently',
      reraValid: !!prop.reraNumber
    }));

  const stats = {
    totalListed: assetStoreProperties.length,
    complianceRate: assetStoreProperties.length > 0 
      ? Math.round((assetStoreProperties.filter(p => p.reraNumber).length / assetStoreProperties.length) * 100)
      : 100
  };

  return (
    <div className="p-6 space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Upload className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {language === 'en' ? 'Property Onboarding' : 'إضافة عقار جديد'}
            </h1>
          </div>
        </div>
        <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} className="px-4 py-2 bg-white border rounded-lg shadow-sm">
          {language === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm">
        <div className="flex border-b">
          <button onClick={() => setView('form')} className={`flex-1 py-4 font-medium ${view === 'form' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
            {language === 'en' ? 'New Property' : 'عقار جديد'}
          </button>
          <button onClick={() => setView('drafts')} className={`flex-1 py-4 font-medium ${view === 'drafts' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
            {language === 'en' ? 'Drafts' : 'المسودات'} ({draftProperties.length})
          </button>
          <button onClick={() => setView('submitted')} className={`flex-1 py-4 font-medium ${view === 'submitted' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
            {language === 'en' ? 'Submitted' : 'المقدمة'} ({submittedProperties.length})
          </button>
        </div>

        <div className="p-6">
          {view === 'form' && <PropertyForm lang={language} />}
          
          {view === 'drafts' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {draftProperties.map(p => (
                <div key={p.id} className="border p-4 rounded-xl hover:border-blue-300 transition-colors">
                  <h4 className="font-bold">{p.title}</h4>
                  <p className="text-sm text-gray-500">{p.city} • {p.price}</p>
                  <button onClick={() => deleteProperty(p.id)} className="mt-4 text-red-600 text-sm flex items-center">
                    <Trash2 className="h-4 w-4 mr-1" /> {language === 'en' ? 'Delete Draft' : 'حذف المسودة'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {view === 'submitted' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-gray-500 text-sm">
                    <th className="py-3 px-4">{language === 'en' ? 'Property' : 'العقار'}</th>
                    <th className="py-3 px-4">{language === 'en' ? 'Status' : 'الحالة'}</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedProperties.map(p => (
                    <tr key={p.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{p.title}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${p.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
