'use client';

import { Shield, Percent, FileCheck, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ComplianceStepProps {
  lang: 'en' | 'ar';
  property: any;
  onChange: (e: any) => void;
  errors: any;
  onReraValidate?: (reraNumber: string, jurisdiction: string) => any;
  onCommissionCalculate?: (price: number, jurisdiction: string, rate: number) => any;
}

export default function ComplianceStep({ 
  lang, 
  property, 
  onChange,
  errors,
  onReraValidate,
  onCommissionCalculate
}: ComplianceStepProps) {
  
  const [reraValidation, setReraValidation] = useState<any>(null);
  const [commissionCalculation, setCommissionCalculation] = useState<any>(null);

  // Mock validation functions if not provided
  const validateReraNumber = (reraNumber: string, jurisdiction: string) => {
    if (!reraNumber) return { valid: false, error: 'RERA number required' };
    
    const patterns: Record<string, RegExp> = {
      'AE-DU': /^RERA-\d{5}$/i,
      'AE-AZ': /^DREI-\d{6}$/i,
      'AE-SH': /^SREA-\d{5}$/i,
      'SA-RY': /^MC-\d{8}$/i,
      'QA-DA': /^QREA-\d{6}$/i,
      'BH-MA': /^BREA-\d{5}$/i,
      'KW-KU': /^KREA-\d{5}$/i,
      'OM-MU': /^OM-\d{7}$/i,
    };

    const pattern = patterns[jurisdiction] || /^\w{3,}-\d{4,}$/;
    const isValid = pattern.test(reraNumber);
    
    return {
      valid: isValid,
      error: isValid ? null : 'Invalid RERA format for this jurisdiction',
      jurisdiction,
      authorityName: jurisdiction === 'AE-DU' ? 'Dubai RERA' : 
                    jurisdiction === 'AE-AZ' ? 'Abu Dhabi DREI' :
                    jurisdiction === 'SA-RY' ? 'Saudi Ministry of Commerce' :
                    'Local Authority'
    };
  };

  const calculateCommission = (price: number, jurisdiction: string, rate: number) => {
    if (price <= 0) return { isCompliant: false, warnings: ['Price must be greater than 0'] };
    
    const jurisdictionCaps: Record<string, number> = {
      'AE-DU': 2.0, // Dubai
      'AE-AZ': 2.0, // Abu Dhabi
      'AE-SH': 2.0, // Sharjah
      'SA-RY': 2.5, // Saudi
      'QA-DA': 2.0, // Qatar
      'BH-MA': 2.0, // Bahrain
      'KW-KU': 2.0, // Kuwait
      'OM-MU': 2.0, // Oman
    };

    const cap = jurisdictionCaps[jurisdiction] || 2.0;
    const isCompliant = rate <= cap;
    const finalCommission = (price * rate) / 100;
    
    const warnings = [];
    if (rate > cap) {
      warnings.push(`Commission rate exceeds ${cap}% cap for this jurisdiction`);
    }
    if (rate < 1.0) {
      warnings.push('Commission rate below typical market minimum');
    }

    return {
      isCompliant,
      finalCommission,
      currency: property.currency || 'AED',
      warnings,
      cap
    };
  };

  // Validate RERA when number changes
  useEffect(() => {
    if (property.reraNumber && property.jurisdiction) {
      const validation = onReraValidate 
        ? onReraValidate(property.reraNumber, property.jurisdiction)
        : validateReraNumber(property.reraNumber, property.jurisdiction);
      setReraValidation(validation);
    }
  }, [property.reraNumber, property.jurisdiction, onReraValidate]);

  // Calculate commission when price or rate changes
  useEffect(() => {
    if (property.price > 0 && property.jurisdiction) {
      const calculation = onCommissionCalculate
        ? onCommissionCalculate(property.price, property.jurisdiction, property.commissionRate)
        : calculateCommission(property.price, property.jurisdiction, property.commissionRate);
      setCommissionCalculation(calculation);
    }
  }, [property.price, property.commissionRate, property.jurisdiction, onCommissionCalculate]);

  return (
    <div className="space-y-6">
      {/* Compliance Header */}
      <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-purple-600" />
          <div>
            <h3 className="font-medium text-purple-900">
              {lang === 'en' ? 'Legal & Compliance' : 'المتطلبات القانونية'}
            </h3>
            <p className="text-purple-700 text-sm">
              {lang === 'en' 
                ? 'Ensure property meets Gulf region regulatory requirements' 
                : 'تأكد من مطابقة العقار لمتطلبات الخليج التنظيمية'}
            </p>
          </div>
        </div>
      </div>

      {/* RERA Registration */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FileCheck className="w-4 h-4" />
            {lang === 'en' ? 'RERA Registration Number *' : 'رقم تسجيل ريـرا *'}
          </label>
          <div className="relative">
            <input
              type="text"
              name="reraNumber"
              value={property.reraNumber || ''}
              onChange={onChange}
              placeholder={lang === 'en' ? 'e.g., RERA-12345, DREI-67890' : 'مثال: RERA-12345, DREI-67890'}
              className={`
                w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10
                ${reraValidation?.valid
                  ? 'border-green-300 bg-green-50'
                  : reraValidation && !reraValidation.valid
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-300'
                }
              `}
            />
            {reraValidation && (
              <div className="absolute right-3 top-3">
                {reraValidation.valid ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            )}
          </div>

          {/* RERA Validation Result */}
          {reraValidation && (
            <div className={`mt-3 p-3 rounded-lg border ${
              reraValidation.valid
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="flex items-center gap-2">
                {reraValidation.valid ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">{lang === 'en' ? 'Valid RERA Number' : 'رقم ريـرا صالح'}</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-medium">{lang === 'en' ? 'Invalid RERA Number' : 'رقم ريـرا غير صالح'}</span>
                  </>
                )}
              </div>
              {reraValidation.error && (
                <p className="text-sm mt-1">{reraValidation.error}</p>
              )}
              {reraValidation.valid && reraValidation.authorityName && (
                <div className="text-sm mt-2 space-y-1">
                  <p><span className="font-medium">{lang === 'en' ? 'Authority:' : 'الجهة:'}</span> {reraValidation.authorityName}</p>
                  <p><span className="font-medium">{lang === 'en' ? 'Jurisdiction:' : 'الاختصاص:'}</span> {reraValidation.jurisdiction}</p>
                </div>
              )}
            </div>
          )}

          {errors.reraNumber && (
            <p className="text-red-500 text-sm mt-2">{errors.reraNumber}</p>
          )}
        </div>

        {/* RERA Help */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-blue-800 text-sm">
            {lang === 'en' 
              ? '💡 RERA numbers are issued by local real estate authorities. Format varies by jurisdiction.'
              : '💡 يتم إصدار أرقام ريـرا من قبل السلطات العقارية المحلية. يختلف التنسيق حسب الاختصاص.'}
          </p>
        </div>
      </div>

      {/* Commission */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Percent className="w-4 h-4" />
            {lang === 'en' ? 'Commission Rate *' : 'نسبة العمولة *'}
          </label>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input
                type="range"
                name="commissionRate"
                value={property.commissionRate || 2.0}
                onChange={onChange}
                min="0"
                max="5"
                step="0.1"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>2.5%</span>
                <span>5%</span>
              </div>
            </div>
            <div className="w-24">
              <div className="relative">
                <input
                  type="number"
                  name="commissionRate"
                  value={property.commissionRate || 2.0}
                  onChange={onChange}
                  step="0.1"
                  min="0"
                  max="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center"
                />
                <div className="absolute right-3 top-2 text-gray-500">%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Commission Calculation Result */}
        {commissionCalculation && (
          <div className={`p-4 rounded-lg border ${
            commissionCalculation.isCompliant
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {commissionCalculation.isCompliant ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600" />
                )}
                <span className="font-medium">
                  {commissionCalculation.isCompliant
                    ? (lang === 'en' ? 'Compliant Commission' : 'عمولة متوافقة')
                    : (lang === 'en' ? 'Non-Compliant Commission' : 'عمولة غير متوافقة')
                  }
                </span>
              </div>
              {commissionCalculation.cap && (
                <span className="text-sm bg-white px-2 py-1 rounded border">
                  {lang === 'en' ? 'Cap:' : 'الحد:'} {commissionCalculation.cap}%
                </span>
              )}
            </div>

            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">{lang === 'en' ? 'Commission Amount:' : 'مبلغ العمولة:'}</span>
                <span className="font-bold text-lg">
                  {commissionCalculation.finalCommission.toLocaleString()} {commissionCalculation.currency}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {lang === 'en' 
                  ? `Based on ${property.price.toLocaleString()} ${property.currency} at ${property.commissionRate || 2.0}%`
                  : `بناءً على ${property.price.toLocaleString()} ${property.currency} بنسبة ${property.commissionRate || 2.0}%`
                }
              </div>
            </div>

            {commissionCalculation.warnings.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                {commissionCalculation.warnings.map((warning: string, index: number) => (
                  <div key={index} className="flex items-start gap-2 text-amber-800 text-sm mb-1">
                    <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>{warning}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Commission Help */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-amber-800 text-sm">
            {lang === 'en' 
              ? '⚠ Commission rates are capped by local regulations. Exceeding caps may result in penalties.'
              : '⚠ يتم تحديد نسبة العمولة بحدود تنظيمية محلية. تجاوز الحدود قد يؤدي إلى عقوبات.'}
          </p>
        </div>
      </div>

      {/* Jurisdiction Info */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <h4 className="font-medium text-gray-700 mb-3">
          {lang === 'en' ? 'Jurisdiction Information' : 'معلومات الاختصاص'}
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">{lang === 'en' ? 'Selected Country' : 'الدولة المختارة'}</p>
            <p className="font-medium">{property.country || 'Not selected'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{lang === 'en' ? 'Jurisdiction Code' : 'رمز الاختصاص'}</p>
            <p className="font-mono font-medium">{property.jurisdiction || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Compliance Requirements */}
      <div className="bg-red-50 border border-red-100 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-red-900">
              {lang === 'en' ? 'Compliance Requirements' : 'متطلبات الامتثال'}
            </h4>
            <ul className="text-red-800 text-sm mt-2 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>{lang === 'en' 
                  ? 'Valid RERA registration is mandatory for all Gulf properties' 
                  : 'تسجيل ريـرا صالح إلزامي لجميع عقارات الخليج'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>{lang === 'en' 
                  ? 'Commission rates must not exceed local regulatory caps' 
                  : 'يجب ألا تتجاوز نسب العمولة الحدود التنظيمية المحلية'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>{lang === 'en' 
                  ? 'Off-plan properties require additional permits and disclosures' 
                  : 'تتطلب العقارات تحت الإنشاء تصاريح إضافية وإفصاحات'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
