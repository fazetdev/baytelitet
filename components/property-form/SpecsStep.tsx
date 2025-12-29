'use client';

import React from 'react';
import { Bed, Bath, Maximize, Home, Building2, Warehouse, TreePine, Store, ShieldCheck, Waves, Coffee, Users, Car } from 'lucide-react';

interface SpecsStepProps {
  lang: 'en' | 'ar';
  property: any;
  onChange: (e: any) => void;
  errors: any;
}

const PROPERTY_TYPES = [
  { value: 'apartment', label: { en: 'Apartment', ar: 'شقة' }, icon: <Home className="w-5 h-5" /> },
  { value: 'villa', label: { en: 'Villa', ar: 'فيلا' }, icon: <Home className="w-5 h-5" /> },
  { value: 'townhouse', label: { en: 'Townhouse', ar: 'تاون هاوس' }, icon: <Building2 className="w-5 h-5" /> },
  { value: 'penthouse', label: { en: 'Penthouse', ar: 'بنتهاوس' }, icon: <Building2 className="w-5 h-5" /> },
  { value: 'office', label: { en: 'Commercial Office', ar: 'مكتب تجاري' }, icon: <Building2 className="w-5 h-5" /> },
  { value: 'retail', label: { en: 'Retail Space', ar: 'محل تجاري' }, icon: <Store className="w-5 h-5" /> },
  { value: 'warehouse', label: { en: 'Warehouse', ar: 'مستودع' }, icon: <Warehouse className="w-5 h-5" /> },
  { value: 'land', label: { en: 'Land Plot', ar: 'قطعة أرض' }, icon: <TreePine className="w-5 h-5" /> },
];

export default function SpecsStep({
  lang,
  property,
  onChange,
  errors
}: SpecsStepProps) {

  const handlePropertyTypeSelect = (type: string) => {
    onChange({ target: { name: 'propertyType', value: type } });
  };

  const AMENITIES = [
    { name: 'hasMaidsRoom', label: { en: "Maid's Room", ar: 'غرفة خادمة' }, icon: <Users className="w-4 h-4" /> },
    { name: 'hasDriversRoom', label: { en: "Driver's Room", ar: 'غرفة سائق' }, icon: <Car className="w-4 h-4" /> },
    { name: 'hasMajlis', label: { en: 'Majlis', ar: 'مجلس' }, icon: <Coffee className="w-4 h-4" /> },
    { name: 'hasPrivatePool', label: { en: 'Private Pool', ar: 'مسبح خاص' }, icon: <Waves className="w-4 h-4" /> },
    { name: 'hasCentralAC', label: { en: 'Central A/C', ar: 'تكييف مركزي' }, icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <Maximize className="w-5 h-5 text-emerald-600" />
          <div>
            <h3 className="font-medium text-emerald-900">
              {lang === 'en' ? 'Property Specifications' : 'مواصفات العقار'}
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Bedrooms */}
        <div className={`border rounded-xl p-4 ${errors.beds ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5 text-blue-600" />
              <p className="font-medium text-gray-700">{lang === 'en' ? 'Bedrooms' : 'غرف النوم'}</p>
            </div>
            <input type="number" name="beds" value={property.beds || ''} onChange={onChange} className="w-20 px-3 py-2 border rounded-lg text-center" />
          </div>
        </div>

        {/* Bathrooms */}
        <div className={`border rounded-xl p-4 ${errors.baths ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bath className="w-5 h-5 text-green-600" />
              <p className="font-medium text-gray-700">{lang === 'en' ? 'Bathrooms' : 'الحمامات'}</p>
            </div>
            <input type="number" name="baths" value={property.baths || ''} onChange={onChange} className="w-20 px-3 py-2 border rounded-lg text-center" />
          </div>
        </div>

        {/* Area */}
        <div className="border rounded-xl p-4 border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Maximize className="w-5 h-5 text-purple-600" />
              <p className="font-medium text-gray-700">{lang === 'en' ? 'Area' : 'المساحة'}</p>
            </div>
            <input type="number" name="area" value={property.area || ''} onChange={onChange} className="w-24 px-3 py-2 border rounded-lg text-center" />
          </div>
        </div>
      </div>

      {/* Gulf Grade Amenities */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
        <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" />
          {lang === 'en' ? 'Gulf Features & Amenities' : 'المميزات الخليجية والمرافق'}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {AMENITIES.map((amenity) => (
            <label key={amenity.name} className="flex items-center gap-3 p-3 bg-white border rounded-lg hover:border-blue-400 cursor-pointer shadow-sm transition-all">
              <input
                type="checkbox"
                name={amenity.name}
                checked={property[amenity.name] || false}
                onChange={onChange}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <div className="flex items-center gap-2">
                <span className="text-blue-500">{amenity.icon}</span>
                <span className="text-sm font-medium text-gray-700">{amenity.label[lang]}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {lang === 'en' ? 'Property Type *' : 'نوع العقار *'}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PROPERTY_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => handlePropertyTypeSelect(type.value)}
              className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all ${property.propertyType === type.value ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              {type.icon}
              <span className="text-sm font-medium mt-2">{type.label[lang]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex items-start gap-3 p-4 bg-gray-50 border rounded-xl cursor-pointer">
          <input type="checkbox" name="offPlan" checked={property.offPlan || false} onChange={onChange} className="mt-1 w-4 h-4 text-blue-600" />
          <div>
            <p className="font-medium text-gray-700">{lang === 'en' ? 'Off-Plan' : 'تحت الإنشاء'}</p>
          </div>
        </label>
        <label className="flex items-start gap-3 p-4 bg-gray-50 border rounded-xl cursor-pointer">
          <input type="checkbox" name="escrowRequired" checked={property.escrowRequired || false} onChange={onChange} className="mt-1 w-4 h-4 text-blue-600" />
          <div>
            <p className="font-medium text-gray-700">{lang === 'en' ? 'Escrow Required' : 'مطلوب ضمان'}</p>
          </div>
        </label>
      </div>
    </div>
  );
}
