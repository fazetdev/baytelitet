'use client';

import { FC, useState } from 'react';
import {
  CheckCircle,
  Shield,
  FileText,
  Globe,
  UserCheck,
  Building,
  CreditCard,
  PenTool,
  FileCheck,
  Home,
  ChevronRight,
  ExternalLink,
  Download
} from 'lucide-react';

interface GuidePageProps {
  lang?: 'en' | 'ar';
}

const ForeignBuyerGuide: FC<GuidePageProps> = ({ lang = 'en' }) => {
  const isRTL = lang === 'ar';
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: 1,
      icon: Globe,
      titleEn: 'Choose Property & Location',
      titleAr: 'اختر العقار والموقع',
      descriptionEn: 'Select from designated freehold areas. Verify on official RERA/DLD portals.',
      descriptionAr: 'اختر من المناطق الحرة المعتمدة. تحقق من خلال بوابات ريـرا/دائرة الأراضي الرسمية.',
      resources: [
        { labelEn: 'DLD/RERA English Portal', labelAr: 'البوابة الإنجليزية لـ DLD/ريـرا', link: 'https://www.dubailand.gov.ae/en/' }
      ]
    },
    {
      number: 2,
      icon: UserCheck,
      titleEn: 'Work with Licensed Agent',
      titleAr: 'تعامل مع وكيل مرخص',
      descriptionEn: 'Only RERA-licensed agents can facilitate legal contracts.',
      descriptionAr: 'الوكلاء المرخصون من ريـرا فقط يمكنهم تسهيل العقود القانونية.',
      resources: [
        { labelEn: 'RERA Agent Directory', labelAr: 'دليل وكلاء ريـرا', link: 'https://www.dubailand.gov.ae/en/eservices/certified-real-estate-brokers/' }
      ]
    },
    {
      number: 3,
      icon: Shield,
      titleEn: 'Verify Property & Developer',
      titleAr: 'تحقق من العقار والمطور',
      descriptionEn: 'Confirm RERA approval and official escrow account details.',
      descriptionAr: 'تأكد من موافقة ريـرا وتفاصيل حساب الضمان الرسمي.',
      resources: [
        { labelEn: 'RERA Approved Escrow Agents', labelAr: 'وكلاء الضمان المعتمدون من ريـرا', link: 'https://www.dubailand.gov.ae/en/eservices/certified-escrow-agents/' }
      ]
    },
    {
      number: 4,
      icon: FileText,
      titleEn: 'Sign Power of Attorney',
      titleAr: 'توقيع وكالة محاماة',
      descriptionEn: 'PoA allows your lawyer to act on your behalf for remote transactions.',
      descriptionAr: 'الوكالة تسمح لمحاميك بالعمل نيابة عنك للمعاملات عن بعد.',
      noteEn: 'Must be notarized at UAE embassy in your country',
      noteAr: 'يجب توثيقها في سفارة الإمارات في بلدك'
    },
    {
      number: 5,
      icon: CreditCard,
      titleEn: 'Contract & Payments',
      titleAr: 'العقد والمدفوعات',
      descriptionEn: 'Sign Sale & Purchase Agreement. All payments through RERA escrow account.',
      descriptionAr: 'توقيع اتفاقية البيع والشراء. جميع المدفوعات عبر حساب ضمان ريـرا.',
      noteEn: '10–20% initial payment typical',
      noteAr: 'الدفعة الأولية النموذجية 10-20٪'
    },
    {
      number: 6,
      icon: PenTool,
      titleEn: 'Remote Notarization / E-Signatures',
      titleAr: 'التوثيق عن بعد / التوقيع الإلكتروني',
      descriptionEn: 'Many developers accept e-signatures for foreign buyers.',
      descriptionAr: 'العديد من المطورين يقبلون التوقيع الإلكتروني للمشترين الأجانب.'
    },
    {
      number: 7,
      icon: Building,
      titleEn: 'Register with DLD',
      titleAr: 'التسجيل في دائرة الأراضي',
      descriptionEn: 'Official property registration under your name at DLD/RERA.',
      descriptionAr: 'التسجيل الرسمي للعقار باسمك في دائرة الأراضي/ريـرا.',
      resources: [
        { labelEn: 'DLD Property Registration', labelAr: 'تسجيل العقارات في دائرة الأراضي', link: 'https://www.dubailand.gov.ae/en/eservices/property-registration/' }
      ]
    },
    {
      number: 8,
      icon: FileCheck,
      titleEn: 'Obtain Title Deed',
      titleAr: 'الحصول على سند الملكية',
      descriptionEn: 'Receive official Title Deed after registration.',
      descriptionAr: 'استلام سند الملكية الرسمي بعد التسجيل.'
    },
    {
      number: 9,
      icon: Home,
      titleEn: 'Post-Purchase Management',
      titleAr: 'الإدارة بعد الشراء',
      descriptionEn: 'Setup utilities, service fees, and optional UAE bank account.',
      descriptionAr: 'إعداد المرافق ورسوم الخدمة والحساب البنكي الإماراتي الاختياري.'
    }
  ];

  const checklist = [
    { id: 1, textEn: 'Verify RERA project registration', textAr: 'التحقق من تسجيل مشروع ريـرا' },
    { id: 2, textEn: 'Confirm escrow account details', textAr: 'تأكيد تفاصيل حساب الضمان' },
    { id: 3, textEn: 'Use licensed agents only', textAr: 'استخدم الوكلاء المرخصين فقط' },
    { id: 4, textEn: 'Keep all payments through escrow', textAr: 'احتفظ بجميع المدفوعات عبر الضمان' },
    { id: 5, textEn: 'Use PoA for remote transactions', textAr: 'استخدم الوكالة للمعاملات عن بعد' },
    { id: 6, textEn: 'Prefer projects with English documentation', textAr: 'تفضل المشاريع مع وثائق إنجليزية' }
  ];

  const StepCard = ({ step }: { step: any }) => {
    const Icon = step.icon;
    return (
      <div
        className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
          activeStep === step.number ? 'border-bayt-warm bg-bayt-warm/5 shadow-lg' : 'border-gray-200 hover:border-bayt-cool'
        }`}
        onClick={() => setActiveStep(step.number)}
      >
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
            activeStep === step.number ? 'bg-bayt-warm text-white' : 'bg-gray-100 text-gray-600'
          }`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-sm font-bold ${
                activeStep === step.number ? 'text-bayt-warm' : 'text-gray-500'
              }`}>STEP {step.number}</span>
              <h3 className="text-lg font-bold text-bayt-dark">{isRTL ? step.titleAr : step.titleEn}</h3>
            </div>
            <p className="text-gray-600 mb-4">{isRTL ? step.descriptionAr : step.descriptionEn}</p>
            {step.noteEn && (
              <div className="p-3 bg-gray-50 rounded-lg mb-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">{isRTL ? 'ملاحظة:' : 'Note:'}</span> {isRTL ? step.noteAr : step.noteEn}
                </p>
              </div>
            )}
            {step.resources && step.resources.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700">{isRTL ? 'الموارد الرسمية:' : 'Official Resources:'}</p>
                {step.resources.map((resource: any, idx: number) => (
                  <a key={idx} href={resource.link} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center text-sm text-bayt-warm hover:text-yellow-600 transition-colors">
                    {isRTL ? resource.labelAr : resource.labelEn}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-bayt-light to-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <div className="bg-bayt-dark text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{isRTL ? 'الدليل الكامل لشراء العقارات في دبي عن بُعد' : 'Complete Guide to Buying Dubai Property Remotely'}</h1>
          <p className="text-xl text-bayt-cool mb-8">{isRTL ? 'دليل خطوة بخطوة للمستثمرين الدوليين، متوافق تمامًا مع لوائح ريـرا وحسابات الضمان' : 'Step-by-step guide for international investors, fully aligned with RERA regulations and escrow accounts'}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-bayt-warm text-bayt-dark font-bold rounded-xl hover:bg-yellow-600 transition-all flex items-center gap-2">
              <Download className="w-5 h-5" />{isRTL ? 'تحميل الدليل (PDF)' : 'Download Guide (PDF)'}
            </button>
            <a href="#checklist" className="px-6 py-3 bg-white/10 border border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all">{isRTL ? 'راجع قائمة التحقق' : 'Review Checklist'}</a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-bayt-dark mb-4">{isRTL ? 'خطوات العملية' : 'Process Steps'}</h2>
              <p className="text-gray-600">{isRTL ? 'اتبع هذه الخطوات التسع لشراء عقار في دبي بأمان من الخارج' : 'Follow these nine steps to safely purchase Dubai property from abroad'}</p>
            </div>
            <div className="space-y-6">{steps.map(step => <StepCard key={step.number} step={step} />)}</div>
            <div className="mt-12 p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-bayt-dark mb-6 flex items-center gap-2"><Shield className="w-6 h-6 text-bayt-warm" />{isRTL ? 'نقاط رئيسية للمشترين الأجانب' : 'Key Points for Foreign Buyers'}</h3>
              <ul className="space-y-4">{checklist.map(item => (
                <li key={item.id} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" /><span className="text-gray-700">{isRTL ? item.textAr : item.textEn}</span></li>
              ))}</ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-bayt-dark mb-4">{isRTL ? 'تقدمك' : 'Your Progress'}</h3>
              <div className="space-y-4">{steps.map(step => (
                <div key={step.number} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${activeStep === step.number ? 'bg-bayt-warm/10 border border-bayt-warm/30' : 'hover:bg-gray-50'}`} onClick={() => setActiveStep(step.number)}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= step.number ? 'bg-bayt-warm text-white' : 'bg-gray-200 text-gray-600'}`}>{step.number}</div>
                  <span className={`font-medium ${activeStep === step.number ? 'text-bayt-dark' : 'text-gray-700'}`}>{isRTL ? step.titleAr : step.titleEn}</span>
                  {activeStep === step.number && <ChevronRight className={`w-4 h-4 text-bayt-warm ${isRTL ? 'rotate-180' : ''}`} />}
                </div>
              ))}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForeignBuyerGuide;
