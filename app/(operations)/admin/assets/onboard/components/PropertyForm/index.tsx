'use client';

import { useState, useEffect } from 'react';
import {
  Camera,
  MapPin,
  Home,
  Shield,
  User,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Save,
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import { useProperties } from '@/app/context/useProperties';
import MediaStep from './MediaStep';
import LocationStep from './LocationStep';
import SpecsStep from './SpecsStep';
import ComplianceStep from './ComplianceStep';
import AgentStep from './AgentStep';

interface PropertyFormProps {
  lang: 'en' | 'ar';
  onSuccess?: () => void;
}

// Initial property state
const initialPropertyState = {
  // Media & Basic Info
  title: '',
  price: '',
  currency: 'AED',
  heroImage: null as string | null,
  gallery: [] as string[],

  // Location
  country: 'UAE',
  state: '',
  city: '',
  address: '',
  lat: '',
  long: '',
  jurisdiction: 'AE-DU',

  // Specifications
  beds: '',
  baths: '',
  area: '',
  areaUnit: 'sqft',
  propertyType: 'apartment',
  offPlan: false,
  escrowRequired: false,

  // Compliance
  reraNumber: '',
  commissionRate: 2.0,

  // Agent & Final
  agentId: '',
  agentName: '',
  agentPhone: '',
  agentEmail: '',
  agentLicense: '',
  agentPicture: '',
  description: '',

  // Metadata
  complianceStatus: 'pending' as 'pending' | 'verified' | 'rejected' | 'draft',
};

export default function PropertyForm({ lang, onSuccess }: PropertyFormProps) {
  const { addProperty } = useProperties();
  const [step, setStep] = useState(1);
  const [property, setProperty] = useState(initialPropertyState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDataPreview, setShowDataPreview] = useState(false);

  // Update jurisdiction when country changes
  useEffect(() => {
    const jurisdictionMap: Record<string, string> = {
      'UAE': 'AE-DU',
      'Saudi': 'SA-RY',
      'Qatar': 'QA-DA',
      'Kuwait': 'KW-KU',
      'Oman': 'OM-MU',
      'Bahrain': 'BH-MA',
    };

    if (property.country && jurisdictionMap[property.country]) {
      setProperty(prev => ({
        ...prev,
        jurisdiction: jurisdictionMap[property.country]
      }));
    }
  }, [property.country]);

  // Generic change handler
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setProperty(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked :
              type === 'number' ? (value === '' ? '' : parseFloat(value)) :
              value
    }));

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // File upload handler
  const handleFileUpload = (e: any, field: string) => {
    const files = e.target.files;
    if (!files) return;

    const urls = Array.from(files).map((file: any) => URL.createObjectURL(file));

    setProperty(prev => ({
      ...prev,
      [field]: field === 'gallery' ? [...prev.gallery, ...urls] : urls[0]
    }));

    // Clear error for heroImage
    if (field === 'heroImage' && formErrors.heroImage) {
      setFormErrors(prev => ({ ...prev, heroImage: '' }));
    }
  };

  // Step validation
  const validateStep = () => {
    const errors: Record<string, string> = {};

    switch (step) {
      case 1: // Media & Basic Info
        if (!property.title.trim()) errors.title = lang === 'en' ? 'Title is required' : 'العنوان مطلوب';
        if (!property.price || parseFloat(property.price) <= 0) errors.price = lang === 'en' ? 'Price must be greater than 0' : 'يجب أن يكون السعر أكبر من 0';
        if (!property.heroImage) errors.heroImage = lang === 'en' ? 'Hero image is required' : 'الصورة الرئيسية مطلوبة';
        break;

      case 2: // Location
        if (!property.address.trim()) errors.address = lang === 'en' ? 'Address is required' : 'العنوان مطلوب';
        if (!property.state) errors.state = lang === 'en' ? 'State/Province is required' : 'المنطقة/المحافظة مطلوبة';
        if (!property.city) errors.city = lang === 'en' ? 'City is required' : 'المدينة مطلوبة';
        break;

      case 3: // Specifications
        if (!property.beds || parseFloat(property.beds) <= 0) errors.beds = lang === 'en' ? 'Bedrooms must be at least 1' : 'يجب أن تكون غرف النوم على الأقل 1';
        if (!property.baths || parseFloat(property.baths) <= 0) errors.baths = lang === 'en' ? 'Bathrooms must be at least 1' : 'يجب أن تكون الحمامات على الأقل 1';
        if (!property.area || parseFloat(property.area) <= 0) errors.area = lang === 'en' ? 'Area must be greater than 0' : 'يجب أن تكون المساحة أكبر من 0';
        if (!property.propertyType) errors.propertyType = lang === 'en' ? 'Property type is required' : 'نوع العقار مطلوب';
        break;

      case 4: // Compliance
        if (!property.reraNumber.trim()) errors.reraNumber = lang === 'en' ? 'RERA number is required' : 'رقم ريـرا مطلوب';
        break;

      case 5: // Agent & Final
        if (!property.agentId && (!property.agentName.trim() || !property.agentLicense.trim())) {
          if (!property.agentName.trim()) errors.agentName = lang === 'en' ? 'Agent name is required' : 'اسم الوكيل مطلوب';
          if (!property.agentLicense.trim()) errors.agentLicense = lang === 'en' ? 'Agent license is required' : 'ترخيص الوكيل مطلوب';
        }
        if (!property.description.trim() || property.description.length < 50) {
          errors.description = lang === 'en' ? 'Description must be at least 50 characters' : 'يجب أن يكون الوصف على الأقل 50 حرفاً';
        }
        break;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Navigation
  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => Math.min(prev + 1, 5));
      // Scroll to top when moving to next step
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setStep(prev => Math.max(prev - 1, 1));
    // Scroll to top when moving to previous step
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Form submission - SAVES TO DATABASE ONLY
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateStep()) {
      try {
        // Prepare property data for database submission
        // Must match API expectations and Property model
        const submissionData = {
          title: property.title,
          price: parseFloat(property.price),
          city: property.city,
          // Ensure RERA number format matches validation: RERA-[A-Z0-9]+
          reraNumber: property.reraNumber.startsWith('RERA-') 
            ? property.reraNumber 
            : `RERA-${property.reraNumber.toUpperCase().replace(/[^A-Z0-9]/g, '')}`,
          type: property.propertyType,
          description: property.description,
          currency: property.currency || 'AED',
          beds: parseInt(property.beds) || 0,
          baths: parseInt(property.baths) || 0,
          area: parseFloat(property.area) || 0,
          areaUnit: property.areaUnit || 'sqft',
          address: property.address || "Not specified",
          state: property.state,
          country: property.country,
          emirate: property.state || '',
          coverImage: property.heroImage || 'https://via.placeholder.com/600x400?text=Property+Image',
          heroImage: property.heroImage || '',
          gallery: property.gallery || [],
          agentId: property.agentId || '000000000000000000000001',
          agentName: property.agentName || '',
          agentLicense: property.agentLicense || '',
          commissionRate: property.commissionRate || 2.0,
          escrowRequired: property.escrowRequired || false,
          offPlan: property.offPlan || false,
          status: 'draft',
          category: 'sale',
          jurisdiction: property.jurisdiction || 'AE-DU',
          lat: property.lat ? parseFloat(property.lat) : 25.2048,
          lng: property.long ? parseFloat(property.long) : 55.2708
        };

        console.log('Saving property to MongoDB:', submissionData);

        // Save to MongoDB database via API
        await addProperty(submissionData);

        // Success message
        alert(lang === 'en'
          ? '✓ Property saved to database successfully!'
          : '✓ تم حفظ العقار في قاعدة البيانات بنجاح!'
        );

        // Cleanup
        setProperty(initialPropertyState);
        setStep(1);
        setFormErrors({});

        // Notify parent
        if (onSuccess) onSuccess();

      } catch (error: any) {
        console.error('Submission error:', error);
        
        // Show specific error message
        const errorMsg = error.message || 'Unknown error';
        alert(lang === 'en'
          ? `✗ Error saving property to database: ${errorMsg}`
          : `✗ خطأ في حفظ العقار في قاعدة البيانات: ${errorMsg}`
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  // Clear form
  const handleClearForm = () => {
    if (confirm(lang === 'en'
      ? 'Are you sure you want to clear the form? All unsaved data will be lost.'
      : 'هل أنت متأكد من مسح النموذج؟ سيتم فقدان جميع البيانات غير المحفوظة.'
    )) {
      setProperty(initialPropertyState);
      setStep(1);
      setFormErrors({});
    }
  };

  // Data preview component
  const DataPreview = () => (
    <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-700 flex items-center gap-2">
          {showDataPreview ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          {lang === 'en' ? 'Form Data Preview' : 'معاينة بيانات النموذج'}
        </h4>
        <button
          type="button"
          onClick={() => setShowDataPreview(!showDataPreview)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {showDataPreview 
            ? (lang === 'en' ? 'Hide' : 'إخفاء') 
            : (lang === 'en' ? 'Show' : 'عرض')}
        </button>
      </div>
      
      {showDataPreview && (
        <div className="text-sm text-gray-600 space-y-2 max-h-60 overflow-y-auto p-2 bg-white rounded border">
          <div className="grid grid-cols-2 gap-2">
            <div><strong>Title:</strong> {property.title || 'Not set'}</div>
            <div><strong>Price:</strong> {property.price ? `${property.price} ${property.currency}` : 'Not set'}</div>
            <div><strong>Type:</strong> {property.propertyType || 'Not set'}</div>
            <div><strong>Location:</strong> {property.city ? `${property.city}, ${property.state}` : 'Not set'}</div>
            <div><strong>Beds/Baths:</strong> {property.beds || '0'} / {property.baths || '0'}</div>
            <div><strong>Area:</strong> {property.area ? `${property.area} ${property.areaUnit}` : 'Not set'}</div>
            <div><strong>RERA:</strong> {property.reraNumber || 'Not set'}</div>
            <div><strong>Agent:</strong> {property.agentName || 'Not set'}</div>
          </div>
          {property.description && (
            <div className="mt-2 pt-2 border-t">
              <strong>Description:</strong> 
              <p className="text-xs mt-1 text-gray-500 line-clamp-2">{property.description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Step configuration
  const stepConfig = [
    {
      number: 1,
      icon: <Camera className="w-5 h-5" />,
      name: { en: 'Media & Basic Info', ar: 'الصور والمعلومات' },
      description: { en: 'Upload images and basic details', ar: 'رفع الصور والتفاصيل الأساسية' },
      component: (
        <MediaStep
          lang={lang}
          property={property}
          onFileUpload={handleFileUpload}
          onChange={handleChange}
          errors={formErrors}
        />
      )
    },
    {
      number: 2,
      icon: <MapPin className="w-5 h-5" />,
      name: { en: 'Location', ar: 'الموقع' },
      description: { en: 'Property address and coordinates', ar: 'عنوان العقار والإحداثيات' },
      component: (
        <LocationStep
          lang={lang}
          property={property}
          onChange={handleChange}
          errors={formErrors}
        />
      )
    },
    {
      number: 3,
      icon: <Home className="w-5 h-5" />,
      name: { en: 'Specifications', ar: 'المواصفات' },
      description: { en: 'Size, rooms, and property type', ar: 'المساحة، الغرف، ونوع العقار' },
      component: (
        <SpecsStep
          lang={lang}
          property={property}
          onChange={handleChange}
          errors={formErrors}
        />
      )
    },
    {
      number: 4,
      icon: <Shield className="w-5 h-5" />,
      name: { en: 'Compliance', ar: 'الامتثال' },
      description: { en: 'Legal and regulatory requirements', ar: 'المتطلبات القانونية والتنظيمية' },
      component: (
        <ComplianceStep
          lang={lang}
          property={property}
          onChange={handleChange}
          errors={formErrors}
        />
      )
    },
    {
      number: 5,
      icon: <User className="w-5 h-5" />,
      name: { en: 'Agent & Final', ar: 'الوكيل والنهائي' },
      description: { en: 'Agent details and description', ar: 'تفاصيل الوكيل والوصف' },
      component: (
        <AgentStep
          lang={lang}
          property={property}
          onChange={handleChange}
          errors={formErrors}
        />
      )
    },
  ];

  const currentStep = stepConfig[step - 1];

  return (
    <div className="bg-white rounded-2xl shadow-xl border overflow-hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {lang === 'en' ? 'New Property Onboarding' : 'إضافة عقار جديد'}
            </h1>
            <p className="text-blue-100 mt-2">
              {lang === 'en' ? 'Gulf Real Estate Compliance Form' : 'نموذج امتثال عقارات الخليج'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-semibold">
                {lang === 'en' ? `Step ${step} of 5` : `الخطوة ${step} من 5`}
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearForm}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title={lang === 'en' ? 'Clear form' : 'مسح النموذج'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="px-6 pt-6">
        <div className="flex justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>

          {stepConfig.map((stepItem) => {
            const isCompleted = stepItem.number < step;
            const isCurrent = stepItem.number === step;
            const isPending = stepItem.number > step;

            return (
              <div key={stepItem.number} className="flex flex-col items-center relative z-10">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300
                  ${isCompleted ? 'bg-green-500 text-white shadow-lg' :
                    isCurrent ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-100' :
                    'bg-gray-100 text-gray-400'}
                `}>
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    stepItem.icon
                  )}
                </div>
                <div className="text-center max-w-24">
                  <p className={`text-xs font-medium ${isCurrent ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                    {stepItem.name[lang]}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1 hidden md:block">
                    {stepItem.description[lang]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6 md:p-8">
        {/* Current Step Content */}
        <div className="min-h-[400px]">
          {currentStep.component}
          
          {/* Data Preview */}
          <DataPreview />
        </div>

        {/* Navigation Buttons - NOW AT BOTTOM */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handlePrev}
              disabled={step === 1}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-colors ${
                step === 1
                  ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                  : 'text-gray-700 hover:bg-gray-100 bg-white border border-gray-300'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              {lang === 'en' ? 'Previous' : 'السابق'}
            </button>

            <div className="flex items-center gap-3">
              {step === 5 ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl font-semibold disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {lang === 'en' ? 'Saving to Database...' : 'جاري الحفظ في قاعدة البيانات...'}
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      {lang === 'en' ? 'Save to Database' : 'حفظ في قاعدة البيانات'}
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                >
                  {lang === 'en' ? 'Continue to Next Step' : 'المتابعة للخطوة التالية'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
              
              <button
                type="button"
                onClick={handleClearForm}
                className="px-5 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium hidden md:inline-flex"
              >
                {lang === 'en' ? 'Clear Form' : 'مسح النموذج'}
              </button>
            </div>
          </div>
          
          {/* Step progress indicator */}
          <div className="mt-4 text-center text-sm text-gray-500">
            {lang === 'en' 
              ? `Step ${step}: ${currentStep.name.en}`
              : `الخطوة ${step}: ${currentStep.name.ar}`}
          </div>
        </div>

        {/* Form Status */}
        {Object.keys(formErrors).length > 0 && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-800 font-medium mb-2">
              {lang === 'en' ? 'Please fix the following errors:' : 'يرجى تصحيح الأخطاء التالية:'}
            </p>
            <ul className="text-red-700 text-sm list-disc list-inside">
              {Object.entries(formErrors).map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}
