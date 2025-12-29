'use client';

import { Upload, Camera, X } from 'lucide-react';

interface MediaStepProps {
  lang: 'en' | 'ar';
  property: any;
  onFileUpload: (e: any, field: string) => void;
  onChange: (e: any) => void;
  errors: any;
}

export default function MediaStep({ 
  lang, 
  property, 
  onFileUpload, 
  onChange,
  errors 
}: MediaStepProps) {
  
  const removeHeroImage = () => {
    onChange({ target: { name: 'heroImage', value: null } });
  };

  const removeGalleryImage = (index: number) => {
    const newGallery = [...property.gallery];
    newGallery.splice(index, 1);
    onChange({ target: { name: 'gallery', value: newGallery } });
  };

  return (
    <div className="space-y-6">
      {/* Hero Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {lang === 'en' ? 'Hero Image *' : 'الصورة الرئيسية *'}
        </label>
        <div className={`
          border-2 ${errors.heroImage ? 'border-red-300 bg-red-50' : 'border-gray-300'} 
          rounded-xl p-6 hover:border-blue-400 transition-colors
        `}>
          <input
            type="file"
            id="heroImage"
            accept="image/*"
            hidden
            onChange={(e) => onFileUpload(e, 'heroImage')}
          />
          <label htmlFor="heroImage" className="cursor-pointer block">
            {property.heroImage ? (
              <div className="relative">
                <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-3">
                  <img
                    src={property.heroImage}
                    alt="Hero preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-green-600 font-medium flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {lang === 'en' ? 'Image uploaded' : 'تم رفع الصورة'}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {lang === 'en' ? 'Main property photo selected' : 'تم اختيار الصورة الرئيسية'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeHeroImage}
                    className="px-3 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    {lang === 'en' ? 'Remove' : 'إزالة'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-gray-700 font-medium mb-1">
                  {lang === 'en' ? 'Upload Hero Image' : 'تحميل الصورة الرئيسية'}
                </p>
                <p className="text-gray-500 text-sm">
                  {lang === 'en' ? 'Click to upload main property photo' : 'انقر لرفع الصورة الرئيسية للعقار'}
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  {lang === 'en' ? 'Recommended: 1200×800px or larger' : 'مستحسن: 1200×800 بكسل أو أكبر'}
                </p>
              </div>
            )}
          </label>
        </div>
        {errors.heroImage && (
          <p className="text-red-500 text-sm mt-2">{errors.heroImage}</p>
        )}
      </div>

      {/* Gallery Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {lang === 'en' ? 'Gallery Images' : 'معرض الصور'}
        </label>
        <div className="border-2 border-gray-300 border-dashed rounded-xl p-6 hover:border-blue-400 transition-colors">
          <input
            type="file"
            id="gallery"
            multiple
            accept="image/*"
            hidden
            onChange={(e) => onFileUpload(e, 'gallery')}
          />
          <label htmlFor="gallery" className="cursor-pointer block">
            <div className="text-center py-4">
              <div className="w-12 h-12 mx-auto mb-3 bg-gray-50 rounded-full flex items-center justify-center">
                <Camera className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-700 font-medium">
                {lang === 'en' ? 'Add Gallery Images' : 'إضافة صور للمعرض'}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                {lang === 'en' ? 'Upload multiple property photos' : 'رفع عدة صور للعقار'}
              </p>
            </div>
          </label>

          {/* Gallery Preview */}
          {property.gallery.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-700 font-medium">
                  {lang === 'en' ? 'Selected Images:' : 'الصور المختارة:'} {property.gallery.length}
                </p>
                <button
                  type="button"
                  onClick={() => onChange({ target: { name: 'gallery', value: [] } })}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  {lang === 'en' ? 'Clear all' : 'مسح الكل'}
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {property.gallery.map((url: string, index: number) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={url}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === 'en' ? 'Property Title *' : 'عنوان العقار *'}
          </label>
          <input
            type="text"
            name="title"
            value={property.title || ''}
            onChange={onChange}
            placeholder={lang === 'en' ? 'e.g., Luxury Marina Apartment' : 'مثال: شقة فاخرة في المارينا'}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-2">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === 'en' ? 'Price *' : 'السعر *'}
          </label>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            <input
              type="number"
              name="price"
              value={property.price || ''}
              onChange={onChange}
              placeholder="0"
              className="flex-1 px-4 py-3 outline-none"
              min="0"
            />
            <select
              name="currency"
              value={property.currency}
              onChange={onChange}
              className="bg-gray-50 px-4 py-3 border-l border-gray-300 outline-none"
            >
              <option value="AED">AED</option>
              <option value="SAR">SAR</option>
              <option value="QAR">QAR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          {errors.price && (
            <p className="text-red-500 text-sm mt-2">{errors.price}</p>
          )}
        </div>
      </div>
    </div>
  );
}
