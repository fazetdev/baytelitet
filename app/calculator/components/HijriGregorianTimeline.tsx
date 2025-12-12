'use client';

import { useState, useEffect } from 'react';
import { formatDate } from '@/lib/formatters';

interface HijriGregorianTimelineProps {
  totalAmount: number;
  downPayment: number;
  startDate?: Date;
}

export default function HijriGregorianTimeline({ 
  totalAmount, 
  downPayment,
  startDate = new Date()
}: HijriGregorianTimelineProps) {
  const [showHijri, setShowHijri] = useState(true);
  
  // Calculate payment milestones
  const milestones = [
    { name: 'Down Payment', amount: downPayment, monthsAfter: 0 },
    { name: 'Foundation', amount: totalAmount * 0.15, monthsAfter: 3 },
    { name: 'Structure', amount: totalAmount * 0.25, monthsAfter: 9 },
    { name: 'Finishing', amount: totalAmount * 0.30, monthsAfter: 18 },
    { name: 'Final Payment', amount: totalAmount * 0.20, monthsAfter: 24 },
  ];

  const calculateDate = (monthsToAdd: number) => {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + monthsToAdd);
    return date;
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8 border border-amber-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Dual Calendar Timeline</h2>
        <button
          onClick={() => setShowHijri(!showHijri)}
          className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg font-medium hover:bg-amber-200 transition-colors"
        >
          {showHijri ? 'Show Gregorian' : 'Show Hijri'}
        </button>
      </div>

      <div className="space-y-6">
        {milestones.map((milestone, index) => {
          const date = calculateDate(milestone.monthsAfter);
          const isFirst = index === 0;
          const isLast = index === milestones.length - 1;
          
          return (
            <div key={index} className="relative">
              {/* Timeline connector */}
              {!isLast && (
                <div className="absolute left-5 top-10 w-0.5 h-full bg-amber-300"></div>
              )}
              
              <div className="flex items-start gap-4">
                {/* Date indicator */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  isFirst ? 'bg-green-500' : isLast ? 'bg-blue-500' : 'bg-amber-500'
                } text-white font-bold`}>
                  {index + 1}
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">{milestone.name}</h3>
                    <span className="text-lg font-bold text-gray-900">
                      AED {milestone.amount.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="mt-2 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-amber-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Due Date</p>
                        <p className="font-semibold text-gray-900">
                          {formatDate(date, showHijri)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Timeline</p>
                        <p className="font-semibold text-gray-900">
                          {milestone.monthsAfter === 0 
                            ? 'Immediate' 
                            : `${milestone.monthsAfter} months`
                          }
                        </p>
                      </div>
                    </div>
                    
                    {/* Progress indicator */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{Math.round((milestone.monthsAfter / 24) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            isFirst ? 'bg-green-500' : isLast ? 'bg-blue-500' : 'bg-amber-500'
                          } rounded-full transition-all duration-500`}
                          style={{ width: `${(milestone.monthsAfter / 24) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Calendar Toggle Info */}
      <div className="mt-8 p-4 bg-white/80 rounded-xl border border-amber-200">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="font-medium text-gray-800">Green: Immediate Payments</span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span className="font-medium text-gray-800">Amber: Construction Phase</span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="font-medium text-gray-800">Blue: Final Handover</span>
        </div>
      </div>

      {/* Islamic Financing Note */}
      <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
        <h4 className="font-bold text-emerald-900 mb-2">Sharia-Compliant Financing Available</h4>
        <p className="text-sm text-emerald-800">
          This timeline supports Islamic financing models (Murabaha, Ijara) with no interest (Riba).
          All payment plans are RERA approved and escrow protected.
        </p>
      </div>
    </div>
  );
}
