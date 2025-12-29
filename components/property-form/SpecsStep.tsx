'use client';

import { Bed, Bath, Maximize, Home, Building2, Warehouse, TreePine, Store } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      {/* Specifications Header */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <Maximize className="w-5 h-5 text-emerald-600" />
          <div>
            <h3 className="font-medium text-emerald-900">
              {lang === 'en' ? 'Property Specifications' : 'مواصفات العقار'}
            </h3>
            <p className="text-emerald-700 text-sm">
              {lang === 'en' 
                ? 'Define the physical characteristics of the property' 
                : 'حدد الخصائص المادية للعقار'}
            </p>
          </div>
        </div>
      </div>

      {/* Room Specifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Bedrooms */}
        <div className={`border rounded-xl p-4 ${errors.beds ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Bed className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-700">{lang === 'en' ? 'Bedrooms' : 'غرف النوم'}</p>
                <p className="text-xs text-gray-500">{lang === 'en' ? 'Number of rooms' : 'عدد الغرف'}</p>
              </div>
            </div>
            <div className="relative">
              <input
                type="number"
                name="beds"
                value={property.beds || ''}
                onChange={onChange}
                min="0"
                max="20"
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center font-medium text-lg"
                placeholder="0"
              />
              {errors.beds && (
                <div className="absolute -bottom-5 left-0 right-0 text-red-500 text-xs text-center">
                  {errors.beds}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Studio</span>
            <span>5+ Luxury</span>
          </div>
        </div>

        {/* Bathrooms */}
        <div className={`border rounded-xl p-4 ${errors.baths ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Bath className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-700">{lang === 'en' ? 'Bathrooms' : 'الحمامات'}</p>
                <p className="text-xs text-gray-500">{lang === 'en' ? 'Number of bathrooms' : 'عدد الحمامات'}</p>
              </div>
            </div>
            <div className="relative">
              <input
                type="number"
                name="baths"
                value={property.baths || ''}
                onChange={onChange}
                min="0"
                max="20"
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center font-medium text-lg"
                placeholder="0"
              />
              {errors.baths && (
                <div className="absolute -bottom-5 left-0 right-0 text-red-500 text-xs text-center">
                  {errors.baths}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>1</span>
            <span>5+</span>
          </div>
        </div>

        {/* Area */}
        <div className={`border rounded-xl p-4 ${errors.area ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Maximize className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-700">{lang === 'en' ? 'Area' : 'المساحة'}</p>
                <p className="text-xs text-gray-500">{lang === 'en' ? 'Size in sqft' : 'المساحة بالقدم المربع'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="number"
                  name="area"
                  value={property.area || ''}
                  onChange={onChange}
                  min="0"
                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center font-medium"
                  placeholder="0"
                />
                {errors.area && (
                  <div className="absolute -bottom-5 left-0 right-0 text-red-500 text-xs text-center">
                    {errors.area}
                  </div>
                )}
              </div>
              <select
                name="areaUnit"
                value={property.areaUnit || 'sqft'}
                onChange={onChange}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="sqft">Sq Ft</option>
                <option value="sqm">Sq M</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{lang === 'en' ? 'Small' : 'صغير'}</span>
            <span>{lang === 'en' ? 'Large' : 'كبير'}</span>
          </div>
        </div>
      </div>

      {/* Property Type Selection */}
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
              className={`
                flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all
                ${property.propertyType === type.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <div className={`mb-2 ${property.propertyType === type.value ? 'text-blue-600' : 'text-gray-400'}`}>
                {type.icon}
              </div>
              <span className="text-sm font-medium">{type.label[lang]}</span>
            </button>
          ))}
        </div>
        {errors.propertyType && (
          <p className="text-red-500 text-sm mt-2">{errors.propertyType}</p>
        )}
      </div>

      {/* Property Status */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <h4 className="font-medium text-gray-700 mb-3">
          {lang === 'en' ? 'Property Status' : 'حالة العقار'}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-start gap-3 p-3 bg-white border border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer">
            <input
              type="checkbox"
              name="offPlan"
              checked={property.offPlan || false}
              onChange={onChange}
              className="mt-1 w-4 h-4 text-blue-600 rounded"
            />
            <div>
              <p className="font-medium text-gray-700">
                {lang === 'en' ? 'Off-Plan Project' : 'مشروع تحت الإنشاء'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {lang === 'en' 
                  ? 'Property under construction or pre-construction' 
                  : 'عقار تحت الإنشاء أو ما قبل الإنشاء'}
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 bg-white border border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer">
            <input
              type="checkbox"
              name="escrowRequired"
              checked={property.escrowRequired || false}
              onChange={onChange}
              className="mt-1 w-4 h-4 text-blue-600 rounded"
            />
            <div>
              <p className="font-medium text-gray-700">
                {lang === 'en' ? 'Escrow Required' : 'مطلوب ضمان'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {lang === 'en' 
                  ? 'Legal requirement for secure transaction' 
                  : 'متطلب قانوني للمعاملة الآمنة'}
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Visual Guide */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-amber-700 text-sm">ℹ</span>
          </div>
          <div>
            <h4 className="font-medium text-amber-900">
              {lang === 'en' ? 'Specifications Guide' : 'دليل المواصفات'}
            </h4>
            <ul className="text-amber-800 text-sm mt-2 space-y-1">
              <li>• {lang === 'en' ? 'Include all bedrooms including maid\'s room' : 'شمل جميع غرف النوم بما فيها غرف الخادمة'}</li>
              <li>• {lang === 'en' ? 'Count half bathrooms as 0.5' : 'عد الحمامات النصفية كـ 0.5'}</li>
              <li>• {lang === 'en' ? 'Built-up area includes walls and common areas' : 'المساحة المبنية تشمل الجدران والمناطق المشتركة'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
