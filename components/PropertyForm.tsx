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
  X
} from 'lucide-react';
import { useGulfAssetStore } from '@/lib/stores/gulfAssetStore';
import MediaStep from './property-form/MediaStep';
import LocationStep from './property-form/LocationStep';
import SpecsStep from './property-form/SpecsStep';
import ComplianceStep from './property-form/ComplianceStep';
import AgentStep from './property-form/AgentStep';

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
  agentName: '',
  agentPhone: '',
  agentEmail: '',
  agentLicense: '',
  description: '',
  
  // Metadata
  complianceStatus: 'pending' as 'pending' | 'verified' | 'rejected' | 'draft',
};

export default function PropertyForm({ lang, onSuccess }: PropertyFormProps) {
  const { addProperty } = useGulfAssetStore();
  const [step, setStep] = useState(1);
  const [property, setProperty] = useState(initialPropertyState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load draft from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gulf_property_draft');
    if (saved) {
      try {
        const draft = JSON.parse(saved);
        // Ensure all fields exist (backward compatibility)
        setProperty({ ...initialPropertyState, ...draft });
      } catch (e) {
        console.error('Failed to load saved property');
      }
    }
  }, []);

  // Save draft to localStorage
  useEffect(() => {
    localStorage.setItem('gulf_property_draft', JSON.stringify(property));
  }, [property]);

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
        if (!property.agentName.trim()) errors.agentName = lang === 'en' ? 'Agent name is required' : 'اسم الوكيل مطلوب';
        if (!property.agentLicense.trim()) errors.agentLicense = lang === 'en' ? 'Agent license is required' : 'ترخيص الوكيل مطلوب';
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
    }
  };

  const handlePrev = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateStep()) {
      try {
        // Prepare property data for submission
        const submissionData = {
          ...property,
          id: Date.now().toString(),
          price: parseFloat(property.price),
          beds: parseInt(property.beds),
          baths: parseInt(property.baths),
          area: parseFloat(property.area),
          createdAt: new Date().toISOString(),
          complianceStatus: 'pending' as const,
        };

        // Save to store
        addProperty(submissionData);

        // Success message
        alert(lang === 'en' 
          ? '✓ Property submitted successfully!' 
          : '✓ تم إرسال العقار بنجاح!'
        );

        // Cleanup
        localStorage.removeItem('gulf_property_draft');
        setProperty(initialPropertyState);
        setStep(1);
        setFormErrors({});

        // Notify parent
        if (onSuccess) onSuccess();

      } catch (error) {
        console.error('Submission error:', error);
        alert(lang === 'en' 
          ? '✗ Error submitting property. Please try again.' 
          : '✗ خطأ في إرسال العقار. يرجى المحاولة مرة أخرى.'
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
      localStorage.removeItem('gulf_property_draft');
      setProperty(initialPropertyState);
      setStep(1);
      setFormErrors({});
    }
  };

  // Step configuration
  const stepConfig = [
    { 
      number: 1, 
      icon: <Camera className="w-5 h-5" />,
      name: { en: 'Media & Basic Info', ar: 'الصور والمعلومات' },
      description: { en: 'Upload images and basic details', ar: 'رفع الصور والتفاصيل الأساسية' }
    },
    { 
      number: 2, 
      icon: <MapPin className="w-5 h-5" />,
      name: { en: 'Location', ar: 'الموقع' },
      description: { en: 'Property address and coordinates', ar: 'عنوان العقار والإحداثيات' }
    },
    { 
      number: 3, 
      icon: <Home className="w-5 h-5" />,
      name: { en: 'Specifications', ar: 'المواصفات' },
      description: { en: 'Size, rooms, and property type', ar: 'المساحة، الغرف، ونوع العقار' }
    },
    { 
      number: 4, 
      icon: <Shield className="w-5 h-5" />,
      name: { en: 'Compliance', ar: 'الامتثال' },
      description: { en: 'Legal and regulatory requirements', ar: 'المتطلبات القانونية والتنظيمية' }
    },
    { 
      number: 5, 
      icon: <User className="w-5 h-5" />,
      name: { en: 'Agent & Final', ar: 'الوكيل والنهائي' },
      description: { en: 'Agent details and description', ar: 'تفاصيل الوكيل والوصف' }
    },
  ];

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
        {/* Step Navigation */}
        <div className="flex justify-between items-center mb-8">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors ${
              step === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            {lang === 'en' ? 'Previous' : 'السابق'}
          </button>

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {lang === 'en' ? 'Continue' : 'متابعة'}
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : null}
        </div>

        {/* Current Step Content */}
        <div className="min-h-[400px]">
          {step === 1 && (
            <MediaStep
              lang={lang}
              property={property}
              onFileUpload={handleFileUpload}
              onChange={handleChange}
              errors={formErrors}
            />
          )}

          {step === 2 && (
            <LocationStep
              lang={lang}
              property={property}
              onChange={handleChange}
              errors={formErrors}
            />
          )}

          {step === 3 && (
            <SpecsStep
              lang={lang}
              property={property}
              onChange={handleChange}
              errors={formErrors}
            />
          )}

          {step === 4 && (
            <ComplianceStep
              lang={lang}
              property={property}
              onChange={handleChange}
              errors={formErrors}
            />
          )}

          {step === 5 && (
            <AgentStep
              lang={lang}
              property={property}
              onChange={handleChange}
              errors={formErrors}
            />
          )}
        </div>

        {/* Submission Section (Step 5 only) */}
        {step === 5 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-sm text-gray-600 max-w-md">
                <p className="flex items-center gap-2 mb-2">
                  <Save className="w-4 h-4" />
                  {lang === 'en'
                    ? 'Your data will be saved locally and submitted for review.'
                    : 'سيتم حفظ بياناتك محلياً وإرسالها للمراجعة.'}
                </p>
                <p className="text-xs text-gray-500">
                  {lang === 'en'
                    ? 'All information must comply with Gulf region real estate regulations.'
                    : 'يجب أن تلتزم جميع المعلومات بلائحة عقارات منطقة الخليج.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleClearForm}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  {lang === 'en' ? 'Clear Form' : 'مسح النموذج'}
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl font-semibold disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {lang === 'en' ? 'Submitting...' : 'جاري الإرسال...'}
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      {lang === 'en' ? 'Submit Property' : 'إرسال العقار'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form Status */}
        {Object.keys(formErrors).length > 0 && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-800 font-medium mb-2">
              {lang === 'en' ? 'Please fix the following errors:' : 'يرجى تصحيح الأخطاء التالية:'}
            </p>
            <ul className="text-red-700 text-sm list-disc pl-5 space-y-1">
              {Object.entries(formErrors).map(([field, error]) => (
                <li key={field}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </form>

      {/* Footer Note */}
      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
        <p className="text-xs text-gray-500 text-center">
          {lang === 'en'
            ? '© 2024 BaytElite Gulf Real Estate Platform. All rights reserved.'
            : '© 2024 منصة بيوت النخبة لعقارات الخليج. جميع الحقوق محفوظة.'}
        </p>
      </div>
    </div>
  );
}
