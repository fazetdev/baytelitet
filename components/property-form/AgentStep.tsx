'use client';

import { User, Phone, Mail, BadgeCheck, FileText, Globe, MessageSquare } from 'lucide-react';

interface AgentStepProps {
  lang: 'en' | 'ar';
  property: any;
  onChange: (e: any) => void;
  errors: any;
}

export default function AgentStep({ 
  lang, 
  property, 
  onChange,
  errors 
}: AgentStepProps) {
  
  return (
    <div className="space-y-6">
      {/* Agent Header */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="font-medium text-indigo-900">
              {lang === 'en' ? 'Agent & Final Details' : 'معلومات الوكيل والتفاصيل النهائية'}
            </h3>
            <p className="text-indigo-700 text-sm">
              {lang === 'en' 
                ? 'Add listing agent information and property description' 
                : 'أضف معلومات وكيل القائمة ووصف العقار'}
            </p>
          </div>
        </div>
      </div>

      {/* Agent Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Agent Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <User className="w-4 h-4" />
            {lang === 'en' ? 'Agent Name *' : 'اسم الوكيل *'}
          </label>
          <input
            type="text"
            name="agentName"
            value={property.agentName || ''}
            onChange={onChange}
            placeholder={lang === 'en' ? 'Full name of listing agent' : 'الاسم الكامل لوكيل القائمة'}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.agentName ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.agentName && (
            <p className="text-red-500 text-sm mt-2">{errors.agentName}</p>
          )}
        </div>

        {/* Agent License */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <BadgeCheck className="w-4 h-4" />
            {lang === 'en' ? 'Agent License Number *' : 'رقم ترخيص الوكيل *'}
          </label>
          <input
            type="text"
            name="agentLicense"
            value={property.agentLicense || ''}
            onChange={onChange}
            placeholder={lang === 'en' ? 'e.g., DLD-12345, RERA-67890' : 'مثال: DLD-12345, RERA-67890'}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.agentLicense ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.agentLicense && (
            <p className="text-red-500 text-sm mt-2">{errors.agentLicense}</p>
          )}
        </div>

        {/* Agent Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            {lang === 'en' ? 'Agent Phone' : 'هاتف الوكيل'}
          </label>
          <input
            type="tel"
            name="agentPhone"
            value={property.agentPhone || ''}
            onChange={onChange}
            placeholder="+971 50 123 4567"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Agent Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {lang === 'en' ? 'Agent Email' : 'بريد الوكيل'}
          </label>
          <input
            type="email"
            name="agentEmail"
            value={property.agentEmail || ''}
            onChange={onChange}
            placeholder="agent@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Agent Profile Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-700">{lang === 'en' ? 'Agent Profile Preview' : 'معاينة ملف الوكيل'}</h4>
            <p className="text-sm text-gray-500">
              {lang === 'en' 
                ? 'How the agent information will appear to clients' 
                : 'كيف ستظهر معلومات الوكيل للعملاء'}
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-lg">{property.agentName || (lang === 'en' ? 'Agent Name' : 'اسم الوكيل')}</h5>
                  {property.agentLicense && (
                    <div className="flex items-center gap-2 mt-1">
                      <BadgeCheck className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">{lang === 'en' ? 'Licensed' : 'مرخص'}</span>
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {property.agentLicense}
                      </span>
                    </div>
                  )}
                </div>
                {property.agentPhone && (
                  <a 
                    href={`tel:${property.agentPhone}`}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium">{lang === 'en' ? 'Call' : 'اتصل'}</span>
                  </a>
                )}
              </div>

              {(property.agentPhone || property.agentEmail) && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.agentPhone && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Phone className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{lang === 'en' ? 'Phone' : 'الهاتف'}</p>
                        <p className="font-medium">{property.agentPhone}</p>
                      </div>
                    </div>
                  )}
                  {property.agentEmail && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Mail className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{lang === 'en' ? 'Email' : 'البريد'}</p>
                        <p className="font-medium truncate">{property.agentEmail}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Property Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          {lang === 'en' ? 'Property Description *' : 'وصف العقار *'}
        </label>
        <div className={`border rounded-lg overflow-hidden ${
          errors.description ? 'border-red-300' : 'border-gray-300'
        }`}>
          <textarea
            name="description"
            value={property.description || ''}
            onChange={onChange}
            rows={6}
            placeholder={lang === 'en' 
              ? 'Describe the property features, amenities, location advantages, nearby facilities, unique selling points...\n\n• Luxury finishes\n• Prime location\n• High ROI potential\n• 24/7 security\n• Swimming pool & gym'
              : 'صف مميزات العقار، المرافق، مزايا الموقع، المنشآت القريبة، نقاط البيع الفريدة...\n\n• تشطيبات فاخرة\n• موقع متميز\n• إمكانية عائد استثماري مرتفع\n• أمن 24/7\n• مسبح وصالة ألعاب رياضية'
            }
            className="w-full px-4 py-3 focus:outline-none resize-none"
          />
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-2 flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {lang === 'en' 
                ? `${(property.description || '').length}/2000 characters` 
                : `${(property.description || '').length}/2000 حرف`}
            </span>
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500">{lang === 'en' ? 'Public listing' : 'قائمة عامة'}</span>
            </div>
          </div>
        </div>
        {errors.description && (
          <p className="text-red-500 text-sm mt-2">{errors.description}</p>
        )}
      </div>

      {/* Description Tips */}
      <div className="bg-green-50 border border-green-100 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-green-900">
              {lang === 'en' ? 'Description Tips' : 'نصائح للوصف'}
            </h4>
            <ul className="text-green-800 text-sm mt-2 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>{lang === 'en' 
                  ? 'Start with a compelling headline that highlights key features' 
                  : 'ابدأ بعنوان جذاب يبرز الميزات الرئيسية'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>{lang === 'en' 
                  ? 'Use bullet points for easy readability' 
                  : 'استخدم النقاط النقطية لسهولة القراءة'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>{lang === 'en' 
                  ? 'Include nearby amenities: schools, malls, hospitals, transport' 
                  : 'أضف المرافق القريبة: مدارس، مولات، مستشفيات، مواصلات'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>{lang === 'en' 
                  ? 'Mention investment potential and ROI calculations' 
                  : 'اذكر إمكانات الاستثمار وحسابات العائد على الاستثمار'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Final Checklist */}
      <div className="border border-gray-300 rounded-xl p-4">
        <h4 className="font-medium text-gray-700 mb-3">
          {lang === 'en' ? 'Final Checklist' : 'قائمة المراجعة النهائية'}
        </h4>
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 rounded"
              checked={!!property.heroImage}
              readOnly
            />
            <span className={`text-sm ${property.heroImage ? 'text-gray-700' : 'text-gray-400'}`}>
              {lang === 'en' ? 'Hero image uploaded' : 'تم رفع الصورة الرئيسية'}
            </span>
          </label>
          <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 rounded"
              checked={!!property.reraNumber}
              readOnly
            />
            <span className={`text-sm ${property.reraNumber ? 'text-gray-700' : 'text-gray-400'}`}>
              {lang === 'en' ? 'RERA number provided' : 'تم تقديم رقم ريـرا'}
            </span>
          </label>
          <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 rounded"
              checked={!!property.agentName && !!property.agentLicense}
              readOnly
            />
            <span className={`text-sm ${property.agentName && property.agentLicense ? 'text-gray-700' : 'text-gray-400'}`}>
              {lang === 'en' ? 'Agent information complete' : 'معلومات الوكيل مكتملة'}
            </span>
          </label>
          <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 rounded"
              checked={!!property.description && (property.description || '').length > 50}
              readOnly
            />
            <span className={`text-sm ${property.description && property.description.length > 50 ? 'text-gray-700' : 'text-gray-400'}`}>
              {lang === 'en' ? 'Detailed description (50+ chars)' : 'وصف مفصل (50+ حرف)'}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
