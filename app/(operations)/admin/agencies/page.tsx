'use client';

import { useState } from 'react';
import {
  Building2,
  Users,
  Shield,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Search,
  Filter,
  Download,
  Plus,
  MoreVertical,
  Globe,
  TrendingUp,
  DollarSign
} from 'lucide-react';

interface Agency {
  id: string;
  name: string;
  licenseNumber: string;
  jurisdiction: string;
  licenseExpiry: string;
  status: 'active' | 'expiring' | 'expired' | 'suspended';
  totalAgents: number;
  activeProperties: number;
  complianceScore: number;
  lastAudit: string;
  revenue: string;
}

export default function AgenciesPage() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedAgency, setSelectedAgency] = useState<string | null>(null);

  // Mock agencies data
  const agencies: Agency[] = [
    {
      id: '1',
      name: 'Bayt Real Estate',
      licenseNumber: 'BRE-2023-001',
      jurisdiction: 'AE-DU (Dubai)',
      licenseExpiry: '2024-12-31',
      status: 'active',
      totalAgents: 24,
      activeProperties: 156,
      complianceScore: 98,
      lastAudit: '2024-11-15',
      revenue: 'AED 42.5M'
    },
    {
      id: '2',
      name: 'Gulf Properties LLC',
      licenseNumber: 'GPL-2023-002',
      jurisdiction: 'AE-AZ (Abu Dhabi)',
      licenseExpiry: '2024-06-30',
      status: 'expiring',
      totalAgents: 18,
      activeProperties: 89,
      complianceScore: 92,
      lastAudit: '2024-10-22',
      revenue: 'AED 28.3M'
    },
    {
      id: '3',
      name: 'Arabian Homes Realty',
      licenseNumber: 'AHR-2023-003',
      jurisdiction: 'SA-RY (Riyadh)',
      licenseExpiry: '2024-03-15',
      status: 'expired',
      totalAgents: 32,
      activeProperties: 210,
      complianceScore: 85,
      lastAudit: '2024-09-10',
      revenue: 'SAR 67.8M'
    },
    {
      id: '4',
      name: 'Qatar Luxury Estates',
      licenseNumber: 'QLE-2023-004',
      jurisdiction: 'QA-DA (Doha)',
      licenseExpiry: '2025-02-28',
      status: 'active',
      totalAgents: 15,
      activeProperties: 74,
      complianceScore: 96,
      lastAudit: '2024-11-30',
      revenue: 'QAR 31.2M'
    },
    {
      id: '5',
      name: 'Bahrain Bay Properties',
      licenseNumber: 'BBP-2023-005',
      jurisdiction: 'BH-MA (Manama)',
      licenseExpiry: '2024-08-20',
      status: 'suspended',
      totalAgents: 8,
      activeProperties: 42,
      complianceScore: 72,
      lastAudit: '2024-08-01',
      revenue: 'BHD 4.8M'
    },
    {
      id: '6',
      name: 'Kuwait Investment Realty',
      licenseNumber: 'KIR-2023-006',
      jurisdiction: 'KW-KU (Kuwait)',
      licenseExpiry: '2024-11-30',
      status: 'active',
      totalAgents: 21,
      activeProperties: 123,
      complianceScore: 94,
      lastAudit: '2024-10-05',
      revenue: 'KWD 9.3M'
    },
    {
      id: '7',
      name: 'Oman Heritage Properties',
      licenseNumber: 'OHP-2023-007',
      jurisdiction: 'OM-MU (Muscat)',
      licenseExpiry: '2025-01-15',
      status: 'active',
      totalAgents: 12,
      activeProperties: 67,
      complianceScore: 91,
      lastAudit: '2024-11-20',
      revenue: 'OMR 5.6M'
    },
    {
      id: '8',
      name: 'Sharjah Commercial Realty',
      licenseNumber: 'SCR-2023-008',
      jurisdiction: 'AE-SH (Sharjah)',
      licenseExpiry: '2024-05-10',
      status: 'expiring',
      totalAgents: 14,
      activeProperties: 58,
      complianceScore: 88,
      lastAudit: '2024-09-28',
      revenue: 'AED 18.9M'
    }
  ];

  const statusOptions = [
    { value: 'all', label: { en: 'All Status', ar: 'جميع الحالات' } },
    { value: 'active', label: { en: 'Active', ar: 'نشط' } },
    { value: 'expiring', label: { en: 'Expiring Soon', ar: 'ينتهي قريباً' } },
    { value: 'expired', label: { en: 'Expired', ar: 'منتهي' } },
    { value: 'suspended', label: { en: 'Suspended', ar: 'معلق' } }
  ];

  const getStatusColor = (status: Agency['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expiring': return 'bg-amber-100 text-amber-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Agency['status']) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'expiring': return <Clock className="h-4 w-4" />;
      case 'expired': return <XCircle className="h-4 w-4" />;
      case 'suspended': return <AlertCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const filteredAgencies = agencies.filter(agency => {
    const matchesSearch = agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agency.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agency.jurisdiction.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || agency.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalAgencies: agencies.length,
    activeAgencies: agencies.filter(a => a.status === 'active').length,
    expiringLicenses: agencies.filter(a => a.status === 'expiring').length,
    totalAgents: agencies.reduce((sum, a) => sum + a.totalAgents, 0),
    avgCompliance: (agencies.reduce((sum, a) => sum + a.complianceScore, 0) / agencies.length).toFixed(1),
    totalRevenue: 'AED 208.6M'
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <Building2 className="h-8 w-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {language === 'en' ? 'Agency Management' : 'إدارة المكاتب العقارية'}
              </h1>
              <p className="text-gray-600 mt-1">
                {language === 'en' 
                  ? 'Monitor and manage real estate agencies across Gulf jurisdictions'
                  : 'مراقبة وإدارة المكاتب العقارية عبر ولايات الخليج'
                }
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              {language === 'en' ? 'Add New Agency' : 'إضافة مكتب جديد'}
            </button>
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="px-4 py-2.5 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Total Agencies' : 'إجمالي المكاتب'}
              </p>
              <p className="text-2xl font-bold mt-2">{stats.totalAgencies}</p>
            </div>
            <Building2 className="h-8 w-8 text-blue-500" />
          </div>
          <div className="flex items-center mt-3 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+12%</span>
            <span className="text-gray-500 ml-2">
              {language === 'en' ? 'from last year' : 'من العام الماضي'}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Active Agencies' : 'المكاتب النشطة'}
              </p>
              <p className="text-2xl font-bold mt-2">{stats.activeAgencies}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${(stats.activeAgencies / stats.totalAgencies) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Licenses Expiring' : 'التراخيص المنتهية'}
              </p>
              <p className="text-2xl font-bold mt-2">{stats.expiringLicenses}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-amber-500" />
          </div>
          <div className="mt-3 text-sm text-amber-600 font-medium">
            {language === 'en' ? 'Requires attention' : 'تحتاج إلى اهتمام'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Total Revenue' : 'إجمالي الإيرادات'}
              </p>
              <p className="text-2xl font-bold mt-2">{stats.totalRevenue}</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-500" />
          </div>
          <div className="flex items-center mt-3 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+24%</span>
            <span className="text-gray-500 ml-2">
              {language === 'en' ? 'growth' : 'نمو'}
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-xl border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search agencies by name, license, or jurisdiction...' : 'ابحث عن المكاتب بالاسم، الترخيص، أو الاختصاص...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label[language]}
                  </option>
                ))}
              </select>
            </div>
            
            <button className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Agencies Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  {language === 'en' ? 'Agency' : 'المكتب'}
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  {language === 'en' ? 'License & Jurisdiction' : 'الترخيص والاختصاص'}
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  {language === 'en' ? 'Status' : 'الحالة'}
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  {language === 'en' ? 'Agents / Properties' : 'الوكلاء / العقارات'}
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  {language === 'en' ? 'Compliance' : 'الامتثال'}
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  {language === 'en' ? 'Revenue' : 'الإيرادات'}
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  {language === 'en' ? 'Actions' : 'الإجراءات'}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAgencies.map((agency) => (
                <tr 
                  key={agency.id} 
                  className={`border-b hover:bg-gray-50 ${selectedAgency === agency.id ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedAgency(agency.id)}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="font-semibold">{agency.name}</div>
                        <div className="text-sm text-gray-500">
                          License: {agency.licenseNumber}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="font-medium">{agency.jurisdiction}</div>
                        <div className="text-sm text-gray-500">
                          Expires: {new Date(agency.licenseExpiry).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(agency.status)}`}>
                      {getStatusIcon(agency.status)}
                      <span className="ml-1.5">
                        {agency.status === 'active' ? (language === 'en' ? 'Active' : 'نشط') :
                         agency.status === 'expiring' ? (language === 'en' ? 'Expiring' : 'ينتهي قريباً') :
                         agency.status === 'expired' ? (language === 'en' ? 'Expired' : 'منتهي') :
                         (language === 'en' ? 'Suspended' : 'معلق')}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="font-bold text-lg">{agency.totalAgents}</div>
                        <div className="text-xs text-gray-500">
                          {language === 'en' ? 'Agents' : 'وكلاء'}
                        </div>
                      </div>
                      <div className="w-px h-8 bg-gray-200"></div>
                      <div className="text-center">
                        <div className="font-bold text-lg">{agency.activeProperties}</div>
                        <div className="text-xs text-gray-500">
                          {language === 'en' ? 'Properties' : 'عقارات'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{agency.complianceScore}%</span>
                        <span className={`text-xs font-medium ${
                          agency.complianceScore >= 90 ? 'text-green-600' :
                          agency.complianceScore >= 80 ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {agency.complianceScore >= 90 ? 'Excellent' :
                           agency.complianceScore >= 80 ? 'Good' : 'Needs Improvement'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            agency.complianceScore >= 90 ? 'bg-green-500' :
                            agency.complianceScore >= 80 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${agency.complianceScore}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Last audit: {new Date(agency.lastAudit).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold">{agency.revenue}</div>
                    <div className="text-sm text-gray-500">
                      {language === 'en' ? 'Annual' : 'سنوي'}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <FileText className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Shield className="h-4 w-4 text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <MoreVertical className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t bg-gray-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              {language === 'en' 
                ? `Showing ${filteredAgencies.length} of ${agencies.length} agencies`
                : `عرض ${filteredAgencies.length} من ${agencies.length} مكتب`
              }
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {language === 'en' ? 'Jurisdiction Distribution:' : 'توزيع الاختصاص:'}
                </span>
                <div className="flex items-center space-x-1">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span className="text-xs">UAE</span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="text-xs">KSA</span>
                  <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                  <span className="text-xs">Other GCC</span>
                </div>
              </div>
              
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                {language === 'en' ? 'Export Report' : 'تصدير التقرير'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-lg font-semibold mb-4">
          {language === 'en' ? 'Quick Actions' : 'إجراءات سريعة'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border rounded-xl hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium">
                  {language === 'en' ? 'Run Compliance Audit' : 'إجراء تدقيق الامتثال'}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {language === 'en' ? 'Check all agencies for compliance' : 'فحص جميع المكاتب للامتثال'}
                </div>
              </div>
            </div>
          </button>
          
          <button className="p-4 border rounded-xl hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="font-medium">
                  {language === 'en' ? 'Renewal Reminders' : 'تذكيرات التجديد'}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {language === 'en' ? 'Send license renewal alerts' : 'إرسال تنبيهات تجديد التراخيص'}
                </div>
              </div>
            </div>
          </button>
          
          <button className="p-4 border rounded-xl hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="font-medium">
                  {language === 'en' ? 'Agent Verification' : 'تحقق من الوكلاء'}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {language === 'en' ? 'Verify agent credentials' : 'التحقق من أوراق اعتماد الوكيل'}
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
