'use client';

import { useState, useEffect } from 'react';
import { 
  Upload, 
  MapPin, 
  Home, 
  Shield, 
  User, 
  CheckCircle, 
  XCircle,
  Building2,
  DollarSign,
  Camera,
  FileText,
  Percent,
  Lock
} from 'lucide-react';
import validateGulfReraNumber from '@/lib/validators/rera-validator';
import { calculateGulfCommission } from '@/lib/calculators/gulf-commission';

interface PropertyFormProps {
  lang: 'en' | 'ar';
}

interface Property {
  id?: string;
  title: string;
  price: number;
  currency: string;
  heroImage: string | null;
  gallery: string[];
  virtualTour: string | null;
  address: string;
  city: string;
  jurisdiction: string;
  lat: string;
  lng: string;
  beds: number;
  baths: number;
  area: number;
  areaUnit: string;
  propertyType: string;
  reraNumber: string;
  escrowRequired: boolean;
  offPlan: boolean;
  description: string;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  agentLicense: string;
  commissionRate: number;
}

const GULF_CITIES = [
  { value: 'dubai', label: { en: 'Dubai', ar: 'دبي' }, jurisdiction: 'AE-DU' },
  { value: 'abu_dhabi', label: { en: 'Abu Dhabi', ar: 'أبو ظبي' }, jurisdiction: 'AE-AZ' },
  { value: 'sharjah', label: { en: 'Sharjah', ar: 'الشارقة' }, jurisdiction: 'AE-SH' },
  { value: 'riyadh', label: { en: 'Riyadh', ar: 'الرياض' }, jurisdiction: 'SA-RY' },
  { value: 'jeddah', label: { en: 'Jeddah', ar: 'جدة' }, jurisdiction: 'SA-JZ' },
  { value: 'doha', label: { en: 'Doha', ar: 'الدوحة' }, jurisdiction: 'QA-DA' },
  { value: 'manama', label: { en: 'Manama', ar: 'المنامة' }, jurisdiction: 'BH-MA' },
  { value: 'kuwait_city', label: { en: 'Kuwait City', ar: 'مدينة الكويت' }, jurisdiction: 'KW-KU' },
  { value: 'muscat', label: { en: 'Muscat', ar: 'مسقط' }, jurisdiction: 'OM-MU' },
];

const PROPERTY_TYPES = [
  { value: 'apartment', label: { en: 'Apartment', ar: 'شقة' } },
  { value: 'villa', label: { en: 'Villa', ar: 'فيلا' } },
  { value: 'townhouse', label: { en: 'Townhouse', ar: 'تاون هاوس' } },
  { value: 'penthouse', label: { en: 'Penthouse', ar: 'بنتهاوس' } },
  { value: 'office', label: { en: 'Commercial Office', ar: 'مكتب تجاري' } },
  { value: 'retail', label: { en: 'Retail Space', ar: 'محل تجاري' } },
  { value: 'warehouse', label: { en: 'Warehouse', ar: 'مستودع' } },
  { value: 'land', label: { en: 'Land Plot', ar: 'قطعة أرض' } },
];

export default function PropertyForm({ lang }: PropertyFormProps) {
  const [step, setStep] = useState(1);
  const [property, setProperty] = useState<Property>({
    title: '',
    price: 0,
    currency: 'AED',
    heroImage: null,
    gallery: [],
    virtualTour: null,
    address: '',
    city: 'dubai',
    jurisdiction: 'AE-DU',
    lat: '',
    lng: '',
    beds: 0,
    baths: 0,
    area: 0,
    areaUnit: 'sqft',
    propertyType: 'apartment',
    reraNumber: '',
    escrowRequired: false,
    offPlan: false,
    description: '',
    agentName: '',
    agentPhone: '',
    agentEmail: '',
    agentLicense: '',
    commissionRate: 2.0
  });

  const [reraValidation, setReraValidation] = useState<any>(null);
  const [commissionCalculation, setCommissionCalculation] = useState<any>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('gulf_property_draft');
    if (saved) {
      try {
        setProperty(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved property');
      }
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('gulf_property_draft', JSON.stringify(property));
  }, [property]);

  // Update jurisdiction when city changes
  useEffect(() => {
    const selectedCity = GULF_CITIES.find(c => c.value === property.city);
    if (selectedCity) {
      setProperty(prev => ({ ...prev, jurisdiction: selectedCity.jurisdiction }));
    }
  }, [property.city]);

  // Validate RERA number when it changes
  useEffect(() => {
    if (property.reraNumber && property.jurisdiction) {
      const validation = validateGulfReraNumber(property.reraNumber, property.jurisdiction);
      setReraValidation(validation);
      
      if (!validation.valid) {
        setFormErrors(prev => ({ ...prev, reraNumber: validation.error || 'Invalid RERA number' }));
      } else {
        setFormErrors(prev => ({ ...prev, reraNumber: '' }));
      }
    }
  }, [property.reraNumber, property.jurisdiction]);

  // Calculate commission when price or rate changes
  useEffect(() => {
    if (property.price > 0 && property.jurisdiction) {
      const calculation = calculateGulfCommission(property.price, property.jurisdiction, property.commissionRate);
      setCommissionCalculation(calculation);
    }
  }, [property.price, property.commissionRate, property.jurisdiction]);

  const validateStep = () => {
    const errors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!property.title.trim()) errors.title = 'Title is required';
        if (property.price <= 0) errors.price = 'Price must be greater than 0';
        if (!property.heroImage) errors.heroImage = 'Hero image is required';
        break;
      
      case 2:
        if (!property.address.trim()) errors.address = 'Address is required';
        if (!property.lat || !property.lng) errors.coordinates = 'Coordinates are required';
        break;
      
      case 3:
        if (property.beds <= 0) errors.beds = 'Bedrooms must be at least 1';
        if (property.baths <= 0) errors.baths = 'Bathrooms must be at least 1';
        if (property.area <= 0) errors.area = 'Area must be greater than 0';
        break;
      
      case 4:
        if (!property.reraNumber.trim()) errors.reraNumber = 'RERA number is required';
        else if (reraValidation && !reraValidation.valid) errors.reraNumber = reraValidation.error || 'Invalid RERA';
        break;
      
      case 5:
        if (!property.agentName.trim()) errors.agentName = 'Agent name is required';
        if (!property.agentLicense.trim()) errors.agentLicense = 'Agent license is required';
        if (!property.description.trim()) errors.description = 'Description is required';
        break;
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setProperty(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? parseFloat(value) || 0 : 
              value
    }));
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'heroImage' | 'virtualTour' | 'gallery') => {
    const files = e.target.files;
    if (!files) return;
    
    const urls = Array.from(files).map(file => URL.createObjectURL(file));
    
    setProperty(prev => ({
      ...prev,
      [field]: field === 'gallery' ? [...prev.gallery, ...urls] : urls[0]
    }));
    
    // Clear error for heroImage
    if (field === 'heroImage' && formErrors.heroImage) {
      setFormErrors(prev => ({ ...prev, heroImage: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateStep()) {
      // Here you would typically send to API
      console.log('Submitting property:', property);
      
      alert(lang === 'en' 
        ? 'Property submitted successfully!' 
        : 'تم إرسال العقار بنجاح!'
      );
      
      // Clear localStorage on successful submission
      localStorage.removeItem('gulf_property_draft');
      
      // Reset form
      setProperty({
        title: '',
        price: 0,
        currency: 'AED',
        heroImage: null,
        gallery: [],
        virtualTour: null,
        address: '',
        city: 'dubai',
        jurisdiction: 'AE-DU',
        lat: '',
        lng: '',
        beds: 0,
        baths: 0,
        area: 0,
        areaUnit: 'sqft',
        propertyType: 'apartment',
        reraNumber: '',
        escrowRequired: false,
        offPlan: false,
        description: '',
        agentName: '',
        agentPhone: '',
        agentEmail: '',
        agentLicense: '',
        commissionRate: 2.0
      });
      
      setStep(1);
    }
  };

  const getStepIcon = (stepNum: number) => {
    switch (stepNum) {
      case 1: return <Camera className="h-5 w-5" />;
      case 2: return <MapPin className="h-5 w-5" />;
      case 3: return <Home className="h-5 w-5" />;
      case 4: return <Shield className="h-5 w-5" />;
      case 5: return <User className="h-5 w-5" />;
      default: return null;
    }
  };

  const stepNames = {
    en: ['Media & Basic Info', 'Location', 'Specifications', 'Compliance', 'Agent & Final'],
    ar: ['الصور والمعلومات', 'الموقع', 'المواصفات', 'الامتثال', 'الوكيل والنهائي']
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {lang === 'en' ? 'New Property Onboarding' : 'إضافة عقار جديد'}
            </h1>
            <p className="text-blue-100 mt-1">
              {lang === 'en' ? 'Gulf Real Estate Compliance Form' : 'نموذج امتثال عقارات الخليج'}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="text-white font-semibold">
              {lang === 'en' ? `Step ${step} of 5` : `الخطوة ${step} من 5`}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="px-6 pt-6">
        <div className="flex justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
          
          {[1, 2, 3, 4, 5].map((stepNum) => {
            const isCompleted = stepNum < step;
            const isCurrent = stepNum === step;
            const isPending = stepNum > step;
            
            return (
              <div key={stepNum} className="flex flex-col items-center relative z-10">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300
                  ${isCompleted ? 'bg-green-500 text-white shadow-lg' : 
                    isCurrent ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-100' : 
                    'bg-gray-100 text-gray-400'}
                `}>
                  {isCompleted ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    getStepIcon(stepNum)
                  )}
                </div>
                <div className="text-center">
                  <p className={`text-xs font-medium ${isCurrent ? 'text-blue-600' : 'text-gray-500'}`}>
                    {stepNames[lang][stepNum - 1]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Step Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1}
            className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            ← {lang === 'en' ? 'Previous' : 'السابق'}
          </button>
          
          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            {lang === 'en' ? 'Continue' : 'متابعة'} →
          </button>
        </div>

        {/* Step 1: Media & Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Hero Image Upload */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  {lang === 'en' ? 'Hero Image' : 'الصورة الرئيسية'} *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'heroImage')}
                    className="hidden"
                    id="heroImage"
                  />
                  <label htmlFor="heroImage" className="cursor-pointer">
                    <p className="text-gray-600 mb-2">
                      {lang === 'en' ? 'Click to upload main property photo' : 'انقر لتحميل الصورة الرئيسية'}
                    </p>
                    <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">
                      {lang === 'en' ? 'Browse Files' : 'تصفح الملفات'}
                    </span>
                  </label>
                  {formErrors.heroImage && (
                    <p className="text-red-500 text-sm mt-2">{formErrors.heroImage}</p>
                  )}
                </div>
              </div>

              {/* Gallery Upload */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  {lang === 'en' ? 'Gallery Images' : 'معرض الصور'}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'gallery')}
                    className="hidden"
                    id="gallery"
                  />
                  <label htmlFor="gallery" className="cursor-pointer">
                    <p className="text-gray-600 mb-2">
                      {lang === 'en' ? 'Upload multiple property photos' : 'تحميل عدة صور للعقار'}
                    </p>
                    <span className="inline-block px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium">
                      {lang === 'en' ? 'Select Multiple' : 'اختيار متعدد'}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  {lang === 'en' ? 'Property Title' : 'عنوان العقار'} *
                </label>
                <input
                  type="text"
                  name="title"
                  value={property.title}
                  onChange={handleChange}
                  placeholder={lang === 'en' ? 'e.g., Luxury Marina Apartment' : 'مثال: شقة فاخرة في المارينا'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formErrors.title && (
                  <p className="text-red-500 text-sm">{formErrors.title}</p>
                )}
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  {lang === 'en' ? 'Price' : 'السعر'} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="price"
                    value={property.price}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <select
                      name="currency"
                      value={property.currency}
                      onChange={handleChange}
                      className="bg-transparent text-gray-600 focus:outline-none"
                    >
                      <option value="AED">AED</option>
                      <option value="SAR">SAR</option>
                      <option value="QAR">QAR</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                </div>
                {formErrors.price && (
                  <p className="text-red-500 text-sm">{formErrors.price}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  {lang === 'en' ? 'Address' : 'العنوان'} *
                </label>
                <input
                  type="text"
                  name="address"
                  value={property.address}
                  onChange={handleChange}
                  placeholder={lang === 'en' ? 'Full property address' : 'العنوان الكامل للعقار'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formErrors.address && (
                  <p className="text-red-500 text-sm">{formErrors.address}</p>
                )}
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  {lang === 'en' ? 'City & Jurisdiction' : 'المدينة والاختصاص'} *
                </label>
                <select
                  name="city"
                  value={property.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {GULF_CITIES.map(city => (
                    <option key={city.value} value={city.value}>
                      {city.label[lang]} ({city.jurisdiction})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  {lang === 'en' ? 'Latitude' : 'خط العرض'}
                </label>
                <input
                  type="text"
                  name="lat"
                  value={property.lat}
                  onChange={handleChange}
                  placeholder="25.2048"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  {lang === 'en' ? 'Longitude' : 'خط الطول'}
                </label>
                <input
                  type="text"
                  name="lng"
                  value={property.lng}
                  onChange={handleChange}
                  placeholder="55.2708"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {formErrors.coordinates && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-amber-800 text-sm">{formErrors.coordinates}</p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Specifications */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  {lang === 'en' ? 'Bedrooms' : 'غرف النوم'} *
                </label>
                <input
                  type="number"
                  name="beds"
                  value={property.beds}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formErrors.beds && (
                  <p className="text-red-500 text-sm">{formErrors.beds}</p>
                )}
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  {lang === 'en' ? 'Bathrooms' : 'الحمامات'} *
                </label>
                <input
                  type="number"
                  name="baths"
                  value={property.baths}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formErrors.baths && (
                  <p className="text-red-500 text-sm">{formErrors.baths}</p>
                )}
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  {lang === 'en' ? 'Area' : 'المساحة'} *
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    name="area"
                    value={property.area}
                    onChange={handleChange}
                    min="1"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <select
                    name="areaUnit"
                    value={property.areaUnit}
                    onChange={handleChange}
                    className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="sqft">Sq Ft</option>
                    <option value="sqm">Sq M</option>
                  </select>
                </div>
                {formErrors.area && (
                  <p className="text-red-500 text-sm">{formErrors.area}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                {lang === 'en' ? 'Property Type' : 'نوع العقار'} *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {PROPERTY_TYPES.map(type => (
                  <label
                    key={type.value}
                    className={`
                      border-2 rounded-xl p-4 text-center cursor-pointer transition-all duration-200
                      ${property.propertyType === type.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="propertyType"
                      value={type.value}
                      checked={property.propertyType === type.value}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <Building2 className={`h-6 w-6 mx-auto mb-2 ${
                      property.propertyType === type.value ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                    <span className="text-sm font-medium">
                      {type.label[lang]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                {lang === 'en' ? 'Property Status' : 'حالة العقار'}
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="offPlan"
                    checked={property.offPlan}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">
                    {lang === 'en' ? 'Off-Plan Project' : 'مشروع تحت الإنشاء'}
                  </span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="escrowRequired"
                    checked={property.escrowRequired}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">
                    {lang === 'en' ? 'Escrow Required' : 'مطلوب ضمان'}
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Compliance */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  {lang === 'en' ? 'RERA Registration Number' : 'رقم تسجيل ريـرا'} *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="reraNumber"
                    value={property.reraNumber}
                    onChange={handleChange}
                    placeholder={lang === 'en' ? 'e.g., RERA-12345' : 'مثال: RERA-12345'}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      reraValidation?.valid
                        ? 'border-green-300 bg-green-50'
                        : reraValidation && !reraValidation.valid
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300'
                    }`}
                  />
                  {reraValidation && (
                    <div className="absolute right-3 top-3">
                      {reraValidation.valid ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                
                {reraValidation && (
                  <div className={`p-3 rounded-lg text-sm ${
                    reraValidation.valid
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    <div className="font-medium">
                      {reraValidation.valid ? '✓ Valid RERA Number' : '✗ Invalid RERA Number'}
                    </div>
                    {reraValidation.error && (
                      <div className="mt-1">{reraValidation.error}</div>
                    )}
                    {reraValidation.valid && (
                      <div className="mt-1">
                        Jurisdiction: {reraValidation.jurisdiction} | Authority: {reraValidation.authorityName}
                      </div>
                    )}
                  </div>
                )}
                
                {formErrors.reraNumber && (
                  <p className="text-red-500 text-sm">{formErrors.reraNumber}</p>
                )}
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  {lang === 'en' ? 'Commission Rate' : 'نسبة العمولة'} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Percent className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="commissionRate"
                    value={property.commissionRate}
                    onChange={handleChange}
                    step="0.1"
                    min="0"
                    max="10"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                {commissionCalculation && (
                  <div className={`p-3 rounded-lg text-sm ${
                    commissionCalculation.isCompliant
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    <div className="font-medium">
                      {commissionCalculation.isCompliant ? '✓ Compliant Commission' : '✗ Non-Compliant Commission'}
                    </div>
                    <div className="mt-1">
                      Amount: {commissionCalculation.finalCommission.toLocaleString()} {commissionCalculation.currency}
                    </div>
                    {commissionCalculation.warnings.map((warning: string, idx: number) => (
                      <div key={idx} className="mt-1 text-amber-800">⚠ {warning}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-900">
                    {lang === 'en' ? 'Gulf Compliance Requirements' : 'متطلبات امتثال الخليج'}
                  </h4>
                  <p className="text-blue-700 text-sm mt-1">
                    {lang === 'en'
                      ? 'All properties must have valid RERA registration and comply with local commission caps.'
                      : 'يجب أن يكون لجميع العقارات تسجيل ريـرا ساري المفعول والامتثال لحدود العمولة المحلية.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Agent & Final */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  {lang === 'en' ? 'Agent Name' : 'اسم الوكيل'} *
                </label>
                <input
                  type="text"
                  name="agentName"
                  value={property.agentName}
                  onChange={handleChange}
                  placeholder={lang === 'en' ? 'Full name of agent' : 'الاسم الكامل للوكيل'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formErrors.agentName && (
                  <p className="text-red-500 text-sm">{formErrors.agentName}</p>
                )}
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  {lang === 'en' ? 'Agent License Number' : 'رقم ترخيص الوكيل'} *
                </label>
                <input
                  type="text"
                  name="agentLicense"
                  value={property.agentLicense}
                  onChange={handleChange}
                  placeholder={lang === 'en' ? 'e.g., DLD-12345' : 'مثال: DLD-12345'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formErrors.agentLicense && (
                  <p className="text-red-500 text-sm">{formErrors.agentLicense}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  {lang === 'en' ? 'Agent Phone' : 'هاتف الوكيل'}
                </label>
                <input
                  type="text"
                  name="agentPhone"
                  value={property.agentPhone}
                  onChange={handleChange}
                  placeholder="+971 50 123 4567"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  {lang === 'en' ? 'Agent Email' : 'بريد الوكيل'}
                </label>
                <input
                  type="email"
                  name="agentEmail"
                  value={property.agentEmail}
                  onChange={handleChange}
                  placeholder="agent@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                {lang === 'en' ? 'Property Description' : 'وصف العقار'} *
              </label>
              <textarea
                name="description"
                value={property.description}
                onChange={handleChange}
                rows={4}
                placeholder={lang === 'en'
                  ? 'Describe the property features, amenities, location advantages...'
                  : 'صف مزايا العقار والمرافق ومزايا الموقع...'
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {formErrors.description && (
                <p className="text-red-500 text-sm">{formErrors.description}</p>
              )}
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                {lang === 'en' ? 'Virtual Tour' : 'جولة افتراضية'}
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <input
                  type="file"
                  accept="video/*,image/*,.pdf"
                  onChange={(e) => handleFileUpload(e, 'virtualTour')}
                  className="hidden"
                  id="virtualTour"
                />
                <label htmlFor="virtualTour" className="cursor-pointer">
                  <p className="text-gray-600 mb-2">
                    {lang === 'en'
                      ? 'Upload virtual tour video, 360 images, or PDF brochure'
                      : 'تحميل فيديو الجولة الافتراضية، صور 360، أو كتيب PDF'
                    }
                  </p>
                  <span className="inline-block px-4 py-2 bg-purple-50 text-purple-600 rounded-lg text-sm font-medium">
                    {lang === 'en' ? 'Upload Tour Files' : 'تحميل ملفات الجولة'}
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Form Submission */}
        {step === 5 && (
          <div className="pt-6 border-t">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                <p className="flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  {lang === 'en'
                    ? 'Your data is saved locally and will be submitted for review.'
                    : 'يتم حفظ بياناتك محلياً وسيتم إرسالها للمراجعة.'
                  }
                </p>
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem('gulf_property_draft');
                    setStep(1);
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {lang === 'en' ? 'Clear Form' : 'مسح النموذج'}
                </button>
                
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    {lang === 'en' ? 'Submit Property' : 'إرسال العقار'}
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
