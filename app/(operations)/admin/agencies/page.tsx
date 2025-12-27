'use client';
import { useState, useMemo } from 'react';
import {
  Building2, Users, Shield, FileText, CheckCircle, XCircle, 
  Clock, AlertCircle, Search, Filter, Download, Plus,
  MoreVertical, Globe, TrendingUp, DollarSign, X, Calendar
} from 'lucide-react';
import { useAgencyStore, Agency } from '@/lib/stores/agencyStore';

export default function AgenciesPage() {
  const { agencies, addAgency, deleteAgency } = useAgencyStore();
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    licenseNumber: '',
    jurisdiction: 'AE-DU (Dubai)',
    licenseExpiry: '',
    status: 'active' as Agency['status'],
    totalAgents: 0,
    activeProperties: 0,
    complianceScore: 100,
    lastAudit: new Date().toISOString().split('T')[0],
    revenue: 'AED 0'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAgency(formData);
    setShowForm(false);
    setFormData({
      name: '', licenseNumber: '', jurisdiction: 'AE-DU (Dubai)',
      licenseExpiry: '', status: 'active', totalAgents: 0,
      activeProperties: 0, complianceScore: 100,
      lastAudit: new Date().toISOString().split('T')[0], revenue: 'AED 0'
    });
  };

  const filteredAgencies = useMemo(() => agencies.filter(agency => {
    const matchesSearch = agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agency.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || agency.status === filterStatus;
    return matchesSearch && matchesFilter;
  }), [agencies, searchTerm, filterStatus]);

  const stats = useMemo(() => ({
    total: agencies.length,
    active: agencies.filter(a => a.status === 'active').length,
    expiring: agencies.filter(a => a.status === 'expiring').length,
    revenue: 'AED 208.6M'
  }), [agencies]);

  const getStatusUI = (status: Agency['status']) => {
    const configs = {
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: { en: 'Active', ar: 'نشط' } },
      expiring: { color: 'bg-amber-100 text-amber-800', icon: Clock, label: { en: 'Expiring', ar: 'ينتهي قريباً' } },
      expired: { color: 'bg-red-100 text-red-800', icon: XCircle, label: { en: 'Expired', ar: 'منتهي' } },
      suspended: { color: 'bg-gray-100 text-gray-800', icon: AlertCircle, label: { en: 'Suspended', ar: 'معلق' } }
    };
    return configs[status] || configs.suspended;
  };

  return (
    <div className="p-4 md:p-8 space-y-6 bg-gray-50 min-h-screen relative" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600 rounded-xl text-white"><Building2 size={24} /></div>
          <div>
            <h1 className="text-xl font-bold">{language === 'en' ? 'Agency Management' : 'إدارة المكاتب'}</h1>
            <p className="text-sm text-gray-500">Monitoring {stats.total} registered firms</p>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button onClick={() => setLanguage(l => l === 'en' ? 'ar' : 'en')} className="flex-1 md:flex-none px-4 py-2 border rounded-lg font-bold">
            {language === 'en' ? 'العربية' : 'English'}
          </button>
          <button 
            onClick={() => setShowForm(true)}
            className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg font-bold flex items-center justify-center gap-2"
          >
            <Plus size={18} /> {language === 'en' ? 'Add Agency' : 'إضافة مكتب'}
          </button>
        </div>
      </div>

      {/* Onboarding Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="font-black uppercase tracking-tight text-gray-900">Onboard New Agency</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Agency Name</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600" placeholder="Elite Properties LLC" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">License Number</label>
                  <input required value={formData.licenseNumber} onChange={e => setFormData({...formData, licenseNumber: e.target.value})} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600" placeholder="ORN-9988" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Jurisdiction</label>
                  <select value={formData.jurisdiction} onChange={e => setFormData({...formData, jurisdiction: e.target.value})} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600">
                    <option>AE-DU (Dubai)</option>
                    <option>AE-AZ (Abu Dhabi)</option>
                    <option>SA-RY (Riyadh)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">License Expiry</label>
                  <input type="date" required value={formData.licenseExpiry} onChange={e => setFormData({...formData, licenseExpiry: e.target.value})} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-blue-700 transition-all">
                Finalize Registration
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: stats.total, icon: Building2, color: 'text-blue-600' },
          { label: 'Active', value: stats.active, icon: CheckCircle, color: 'text-green-600' },
          { label: 'Expiring', value: stats.expiring, icon: Clock, color: 'text-amber-600' },
          { label: 'Revenue', value: stats.revenue, icon: DollarSign, color: 'text-purple-600' }
        ].map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{s.label}</p>
              <p className="text-2xl font-black mt-1">{s.value}</p>
            </div>
            <s.icon className={s.color} size={28} />
          </div>
        ))}
      </div>

      {/* Main Directory Table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-gray-50/50 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Search by name or license..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="p-2 border rounded-lg bg-white"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="expiring">Expiring</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-[10px] font-bold uppercase">
              <tr>
                <th className="p-4">Agency</th>
                <th className="p-4">Jurisdiction</th>
                <th className="p-4">Status</th>
                <th className="p-4">Agents</th>
                <th className="p-4">Compliance</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAgencies.map(agency => {
                const ui = getStatusUI(agency.status);
                return (
                  <tr key={agency.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-gray-900">{agency.name}</p>
                      <p className="text-xs text-gray-500">{agency.licenseNumber}</p>
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-600">{agency.jurisdiction}</td>
                    <td className="p-4">
                      <span className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase ${ui.color}`}>
                        <ui.icon size={12} /> {ui.label[language]}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="font-bold">{agency.totalAgents}</p>
                      <p className="text-[10px] text-gray-400">Listed: {agency.activeProperties}</p>
                    </td>
                    <td className="p-4">
                      <div className="w-24 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${agency.complianceScore > 90 ? 'bg-green-500' : 'bg-amber-500'}`}
                          style={{ width: `${agency.complianceScore}%` }}
                        />
                      </div>
                      <p className="text-[10px] font-bold mt-1">{agency.complianceScore}% Score</p>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => deleteAgency(agency.id)}
                        className="text-gray-300 hover:text-red-600"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
