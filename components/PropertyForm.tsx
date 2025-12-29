'use client';
import { useState, useEffect } from 'react';
import {
  Upload, MapPin, Home, Shield, User, CheckCircle,
  XCircle, Building2, DollarSign, Camera, FileText,
  Percent, Lock, Search, Briefcase
} from 'lucide-react';
import validateGulfReraNumber from '@/lib/validators/rera-validator';
import { calculateGulfCommission } from '@/lib/calculators/gulf-commission';
import { useGulfAssetStore } from '@/lib/stores/gulfAssetStore';
import { useAgentStore } from '@/lib/stores/agentStore';

interface PropertyFormProps {
  lang: 'en' | 'ar';
  onSuccess?: () => void; // Added callback prop
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
  agentId?: string;
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

export default function PropertyForm({ lang, onSuccess }: PropertyFormProps) {
  const { addProperty } = useGulfAssetStore();
  const { agents } = useAgentStore();
  const [step, setStep] = useState(1);
  const [property, setProperty] = useState<Property>({
    title: '', price: 0, currency: 'AED', heroImage: null, gallery: [],
    virtualTour: null, address: '', city: 'dubai', jurisdiction: 'AE-DU',
    lat: '', lng: '', beds: 0, baths: 0, area: 0, areaUnit: 'sqft',
    propertyType: 'apartment', reraNumber: '', escrowRequired: false,
    offPlan: false, description: '', agentName: '', agentPhone: '',
    agentEmail: '', agentLicense: '', commissionRate: 2.0
  });

  const [reraValidation, setReraValidation] = useState<any>(null);
  const [commissionCalculation, setCommissionCalculation] = useState<any>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem('gulf_property_draft');
    if (saved) { try { setProperty(JSON.parse(saved)); } catch (e) {}}
  }, []);

  useEffect(() => {
    localStorage.setItem('gulf_property_draft', JSON.stringify(property));
  }, [property]);

  useEffect(() => {
    const selectedCity = GULF_CITIES.find(c => c.value === property.city);
    if (selectedCity) setProperty(prev => ({ ...prev, jurisdiction: selectedCity.jurisdiction }));
  }, [property.city]);

  useEffect(() => {
    if (property.reraNumber && property.jurisdiction) {
      const validation = validateGulfReraNumber(property.reraNumber, property.jurisdiction);
      setReraValidation(validation);
    }
  }, [property.reraNumber, property.jurisdiction]);

  useEffect(() => {
    if (property.price > 0 && property.jurisdiction) {
      const calculation = calculateGulfCommission(property.price, property.jurisdiction, property.commissionRate);
      setCommissionCalculation(calculation);
    }
  }, [property.price, property.commissionRate, property.jurisdiction]);

  const validateStep = () => {
    const errors: Record<string, string> = {};
    if (step === 1) {
      if (!property.title.trim()) errors.title = 'Title is required';
      if (property.price <= 0) errors.price = 'Price required';
      if (!property.heroImage) errors.heroImage = 'Hero image required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => validateStep() && setStep(prev => Math.min(prev + 1, 5));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setProperty(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleAgentSelect = (agentId: string) => {
    const selectedAgent = agents.find(a => a.id === agentId);
    if (selectedAgent) {
      setProperty(prev => ({
        ...prev,
        agentId: selectedAgent.id,
        agentName: selectedAgent.name,
        agentPhone: selectedAgent.phone,
        agentEmail: selectedAgent.email,
        agentLicense: selectedAgent.licenseNumber
      }));
    }
  };

  const handleFileUpload = (e: any, field: string) => {
    const files = e.target.files;
    if (!files) return;
    const urls = Array.from(files).map((file: any) => URL.createObjectURL(file));
    setProperty((prev: any) => ({
      ...prev,
      [field]: field === 'gallery' ? [...prev.gallery, ...urls] : urls[0]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      addProperty({ ...property, complianceStatus: 'pending' });
      alert(lang === 'en' ? 'Property submitted successfully!' : 'تم إرسال العقار بنجاح!');
      
      // Cleanup
      localStorage.removeItem('gulf_property_draft');
      
      // Notify parent to switch views
      if (onSuccess) onSuccess();
    }
  };

  const getStepIcon = (num: number) => {
    const icons = [<Camera key="1" />, <MapPin key="2" />, <Home key="3" />, <Shield key="4" />, <User key="5" />];
    return icons[num - 1];
  };

  const stepNames = {
    en: ['Media', 'Location', 'Specs', 'Compliance', 'Agent'],
    ar: ['الصور', 'الموقع', 'المواصفات', 'الامتثال', 'الوكيل']
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border overflow-hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
        <div className="flex items-center justify-between text-white">
          <div>
            <h1 className="text-2xl font-bold">{lang === 'en' ? 'New Property' : 'إضافة عقار جديد'}</h1>
            <p className="text-blue-100">{lang === 'en' ? 'Gulf Compliance Form' : 'نموذج امتثال الخليج'}</p>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-lg">Step {step} of 5</div>
        </div>
      </div>

      <div className="px-6 pt-6 flex justify-between relative">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} className="flex flex-col items-center z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= num ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
              {step > num ? <CheckCircle className="h-6 w-6" /> : getStepIcon(num)}
            </div>
            <p className="text-[10px] font-medium">{stepNames[lang][num - 1]}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="flex justify-between">
          <button type="button" onClick={handlePrev} disabled={step === 1} className="px-4 py-2 border rounded disabled:opacity-50">
            {lang === 'en' ? 'Previous' : 'السابق'}
          </button>
          <button type="button" onClick={handleNext} className={`px-4 py-2 bg-blue-600 text-white rounded ${step === 5 ? 'hidden' : ''}`}>
            {lang === 'en' ? 'Continue' : 'متابعة'}
          </button>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed p-4 rounded text-center">
                <input type="file" id="hero" hidden onChange={(e) => handleFileUpload(e, 'heroImage')} />
                <label htmlFor="hero" className="cursor-pointer text-sm">
                  <Upload className="mx-auto mb-2" /> {lang === 'en' ? 'Upload Hero Image' : 'تحميل الصورة الرئيسية'}
                </label>
              </div>
              <div className="border-2 border-dashed p-4 rounded text-center">
                <input type="file" id="gal" multiple hidden onChange={(e) => handleFileUpload(e, 'gallery')} />
                <label htmlFor="gal" className="cursor-pointer text-sm">
                  <Camera className="mx-auto mb-2" /> {lang === 'en' ? 'Upload Gallery' : 'معرض الصور'}
                </label>
              </div>
            </div>
            <input name="title" value={property.title} onChange={handleChange} placeholder="Title" className="w-full p-3 border rounded" />
            <div className="flex border rounded overflow-hidden">
               <input name="price" type="number" value={property.price} onChange={handleChange} className="flex-1 p-3" placeholder="Price" />
               <select name="currency" value={property.currency} onChange={handleChange} className="bg-gray-50 px-3">
                 <option>AED</option><option>SAR</option><option>QAR</option>
               </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <input name="address" value={property.address} onChange={handleChange} placeholder="Address" className="w-full p-3 border rounded" />
            <select name="city" value={property.city} onChange={handleChange} className="w-full p-3 border rounded">
              {GULF_CITIES.map(c => <option key={c.value} value={c.value}>{c.label[lang]}</option>)}
            </select>
            <div className="grid grid-cols-2 gap-4">
              <input name="lat" value={property.lat} onChange={handleChange} placeholder="Latitude" className="p-3 border rounded" />
              <input name="lng" value={property.lng} onChange={handleChange} placeholder="Longitude" className="p-3 border rounded" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
               <div><label className="text-xs">Beds</label><input type="number" name="beds" value={property.beds} onChange={handleChange} className="w-full p-2 border rounded" /></div>
               <div><label className="text-xs">Baths</label><input type="number" name="baths" value={property.baths} onChange={handleChange} className="w-full p-2 border rounded" /></div>
               <div><label className="text-xs">Area</label><input type="number" name="area" value={property.area} onChange={handleChange} className="w-full p-2 border rounded" /></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {PROPERTY_TYPES.map(t => (
                <button key={t.value} type="button" onClick={() => setProperty(p => ({...p, propertyType: t.value}))} className={`p-3 border rounded text-xs ${property.propertyType === t.value ? 'bg-blue-50 border-blue-500' : ''}`}>
                  {t.label[lang]}
                </button>
              ))}
            </div>
            <div className="flex space-x-4">
               <label className="flex items-center space-x-2"><input type="checkbox" name="offPlan" checked={property.offPlan} onChange={handleChange} /> <span>Off-Plan</span></label>
               <label className="flex items-center space-x-2"><input type="checkbox" name="escrowRequired" checked={property.escrowRequired} onChange={handleChange} /> <span>Escrow</span></label>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className={`p-4 border rounded ${reraValidation?.valid ? 'bg-green-50' : 'bg-red-50'}`}>
              <label className="block text-sm mb-2">RERA Number</label>
              <input name="reraNumber" value={property.reraNumber} onChange={handleChange} className="w-full p-3 border rounded" />
              {reraValidation && <p className="text-xs mt-2">{reraValidation.error || '✓ Valid RERA Number'}</p>}
            </div>
            <div className="p-4 border rounded bg-blue-50">
              <label className="block text-sm mb-2">Commission Rate (%)</label>
              <input type="number" name="commissionRate" value={property.commissionRate} onChange={handleChange} className="w-full p-3 border rounded" />
              {commissionCalculation && <p className="text-xs mt-2 font-bold">Total: {commissionCalculation.finalCommission.toLocaleString()} {property.currency}</p>}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                <Briefcase size={14}/> Assign Professional Agent
              </label>
              <select
                value={property.agentId || ''}
                onChange={(e) => handleAgentSelect(e.target.value)}
                className="w-full p-3 bg-white border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select an Agent...</option>
                {agents.map(agent => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name} ({agent.agency})
                  </option>
                ))}
              </select>
              {agents.length === 0 && (
                <p className="text-[10px] text-red-500 mt-2 italic">No agents found. Please onboard agents in the Admin Portal first.</p>
              )}
            </div>

            {property.agentName && (
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 font-bold uppercase">
                  {property.agentName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{property.agentName}</p>
                  <p className="text-xs text-gray-600">License: {property.agentLicense}</p>
                </div>
              </div>
            )}

            <textarea name="description" value={property.description} onChange={handleChange} placeholder="Description" className="w-full p-3 border rounded h-32" />
            <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-lg font-bold shadow-lg">
              {lang === 'en' ? 'Submit Property' : 'إرسال العقار'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
