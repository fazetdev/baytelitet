'use client';

import { useState, useEffect } from 'react';
// Assuming formatDate includes necessary logic for Hijri conversion
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

  // Helper to determine milestone color class
  const getMilestoneColor = (index: number) => {
    const isFirst = index === 0;
    const isLast = index === milestones.length - 1;

    if (isFirst) return 'bg-bayt-cultural'; // Cultural Green for Immediate/Initial payment
    if (isLast) return 'bg-bayt-cool';      // Cool Accent for Final Handover
    return 'bg-bayt-warm';                  // Warm Gold for Construction Phase
  }

  // Helper to determine timeline color class
  const getTimelineColor = (index: number) => {
    const isFirst = index === 0;
    const isLast = index === milestones.length - 1;

    if (isFirst) return 'bg-bayt-cultural';
    if (isLast) return 'bg-bayt-cool';
    return 'bg-bayt-warm';
  }

  return (
    // Background uses light gradient of the warm accent color
    <div className="bg-gradient-to-br from-bayt-warm/10 to-bayt-light rounded-2xl shadow-lg p-8 border border-bayt-warm/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-bayt-dark">Dual Calendar Timeline</h2>
        {/* Toggle button uses warm accent colors */}
        <button
          onClick={() => setShowHijri(!showHijri)}
          className="px-4 py-2 bg-bayt-warm/30 text-bayt-dark rounded-lg font-medium hover:bg-bayt-warm/50 transition-colors"
        >
          {showHijri ? 'Show Gregorian' : 'Show Hijri'}
        </button>
      </div>

      <div className="space-y-6">
        {milestones.map((milestone, index) => {
          const date = calculateDate(milestone.monthsAfter);
          const isLast = index === milestones.length - 1;
          const milestoneColor = getMilestoneColor(index);
          const timelineColor = getTimelineColor(index);

          return (
            <div key={index} className="relative">
              {/* Timeline connector */}
              {!isLast && (
                <div className="absolute left-5 top-10 w-0.5 h-full bg-bayt-warm/50"></div>
              )}

              <div className="flex items-start gap-4">
                {/* Date indicator */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${milestoneColor} text-white font-bold`}>
                  {index + 1}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-bayt-dark">{milestone.name}</h3>
                    <span className="text-lg font-bold text-bayt-dark">
                      AED {milestone.amount.toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-2 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-bayt-cool/50">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Due Date</p>
                        <p className="font-semibold text-bayt-dark">
                          {formatDate(date, showHijri)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Timeline</p>
                        <p className="font-semibold text-bayt-dark">
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
                      <div className="h-2 bg-bayt-light rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${timelineColor} rounded-full transition-all duration-500`}
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
      <div className="mt-8 p-4 bg-white/80 rounded-xl border border-bayt-cool/50">
        <div className="flex items-center gap-3">
          {/* Legend: Cultural Green for Immediate */}
          <div className="w-3 h-3 rounded-full bg-bayt-cultural"></div>
          <span className="font-medium text-bayt-dark">Cultural Green: Immediate Payments</span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          {/* Legend: Warm Gold for Construction Phase */}
          <div className="w-3 h-3 rounded-full bg-bayt-warm"></div>
          <span className="font-medium text-bayt-dark">Warm Gold: Construction Phase</span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          {/* Legend: Cool Accent for Final Handover */}
          <div className="w-3 h-3 rounded-full bg-bayt-cool"></div>
          <span className="font-medium text-bayt-dark">Cool Accent: Final Handover</span>
        </div>
      </div>

      {/* Islamic Financing Note */}
      {/* Uses Cultural Green for Sharia-Compliance note */}
      <div className="mt-6 p-4 bg-gradient-to-r from-bayt-cultural/10 to-bayt-light rounded-xl border border-bayt-cultural/50">
        <h4 className="font-bold text-bayt-dark mb-2">Sharia-Compliant Financing Available</h4>
        <p className="text-sm text-bayt-dark/80">
          This timeline supports Islamic financing models (Murabaha, Ijara) with no interest (Riba).
          All payment plans are RERA approved and escrow protected.
        </p>
      </div>
    </div>
  );
}
