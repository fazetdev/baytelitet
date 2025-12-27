'use client';

import { useState } from 'react';
import { 
  Users, 
  Building2, 
  ShieldCheck, 
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle2,
  FileText
} from 'lucide-react';
// FIXED: Added curly braces for the named export
import { useGulfComplianceStore } from '@/lib/stores/compliance/gulfComplianceStore';
import { useGulfAssetStore } from '@/lib/stores/gulfAssetStore';

interface DashboardMetric {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: any;
}

export default function AdminDashboard() {
  const { records } = useGulfComplianceStore();
  const { properties } = useGulfAssetStore();

  const metrics: DashboardMetric[] = [
    {
      label: 'Total Assets',
      value: properties.length,
      change: '+12%',
      trend: 'up',
      icon: Building2
    },
    {
      label: 'Compliance Rate',
      value: records.length > 0 
        ? `${Math.round((records.filter(r => r.status === 'verified').length / records.length) * 100)}%`
        : '100%',
      change: '+5%',
      trend: 'up',
      icon: ShieldCheck
    },
    {
      label: 'Active Agents',
      value: '24',
      change: '+2',
      trend: 'up',
      icon: Users
    },
    {
      label: 'Pending Reviews',
      value: records.filter(r => r.status === 'pending').length,
      change: '-4%',
      trend: 'down',
      icon: Clock
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <metric.icon size={24} />
              </div>
              <span className={`text-xs font-bold ${
                metric.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 font-medium">{metric.label}</p>
              <h3 className="text-2xl font-black text-gray-900">{metric.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Recent Regulatory Alerts</h3>
          <div className="space-y-4">
            {records.filter(r => r.status === 'flagged').map((alert) => (
              <div key={alert.id} className="flex items-center gap-4 p-3 bg-red-50 rounded-xl text-red-700 border border-red-100">
                <AlertTriangle size={20} />
                <div className="flex-1">
                  <p className="text-sm font-bold">RERA Inconsistency Detected</p>
                  <p className="text-xs opacity-80">License {alert.reraNumber} requires immediate review.</p>
                </div>
              </div>
            ))}
            {records.filter(r => r.status === 'flagged').length === 0 && (
              <div className="text-center py-6 text-gray-400">
                <CheckCircle2 className="mx-auto mb-2 text-emerald-500" />
                <p className="text-sm italic">All systems compliant</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
