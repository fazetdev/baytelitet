'use client';

import { useState, useEffect } from 'react';
import {
  Lock,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  FileText,
  Download,
  Filter,
  Search,
  BarChart3,
  Building2,
  Users,
  Eye,
  RefreshCw,
  ChevronRight,
  Shield,
  Percent,
  Calendar,
  Banknote,
  Plus,
  Trash2,
  Edit
} from 'lucide-react';
import { useEscrowStore, EscrowAccount } from '@/lib/stores/escrowStore';
import { useGulfAssetStore } from '@/lib/stores/gulfAssetStore';

interface EscrowTransaction {
  id: string;
  date: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'fee';
  amount: number;
  description: string;
  project: string;
  reference: string;
  status: 'completed' | 'pending' | 'failed' | 'reversed';
}

export default function EscrowPage() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [activeTab, setActiveTab] = useState<'accounts' | 'transactions' | 'reports' | 'monitoring'>('accounts');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterJurisdiction, setFilterJurisdiction] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAccount, setNewAccount] = useState({
    projectName: '',
    developer: '',
    jurisdiction: 'AE-DU',
    totalAmount: 0,
    currentBalance: 0,
    status: 'healthy' as 'healthy' | 'deficient' | 'critical' | 'frozen',
  });

  const { 
    accounts, 
    transactions, 
    selectedAccount,
    addAccount, 
    deleteAccount,
    updateAccount,
    setSelectedAccount,
    calculateStats,
    generateFromProperties
  } = useEscrowStore();

  const { properties: assetStoreProperties } = useGulfAssetStore();

  // Auto-generate escrow accounts from properties with escrow required
  useEffect(() => {
    const escrowProperties = assetStoreProperties.filter(p => p.escrowRequired);
    if (escrowProperties.length > 0 && accounts.length === 0) {
      generateFromProperties(escrowProperties);
    }
  }, [assetStoreProperties, accounts.length, generateFromProperties]);

  const stats = calculateStats();

  const statusOptions = [
    { value: 'all', label: { en: 'All Status', ar: 'جميع الحالات' } },
    { value: 'healthy', label: { en: 'Healthy', ar: 'صحي' } },
    { value: 'deficient', label: { en: 'Deficient', ar: 'ناقص' } },
    { value: 'critical', label: { en: 'Critical', ar: 'حرج' } },
    { value: 'frozen', label: { en: 'Frozen', ar: 'مجمد' } }
  ];

  const jurisdictionOptions = [
    { value: 'all', label: { en: 'All Jurisdictions', ar: 'جميع الاختصاصات' } },
    { value: 'AE-DU', label: { en: 'Dubai (UAE)', ar: 'دبي (الإمارات)' } },
    { value: 'AE-AZ', label: { en: 'Abu Dhabi (UAE)', ar: 'أبو ظبي (الإمارات)' } },
    { value: 'SA-RY', label: { en: 'Riyadh (KSA)', ar: 'الرياض (السعودية)' } },
    { value: 'QA-DA', label: { en: 'Doha (Qatar)', ar: 'الدوحة (قطر)' } },
    { value: 'BH-MA', label: { en: 'Manama (Bahrain)', ar: 'المنامة (البحرين)' } },
    { value: 'KW-KU', label: { en: 'Kuwait City', ar: 'مدينة الكويت' } },
    { value: 'OM-MU', label: { en: 'Muscat (Oman)', ar: 'مسقط (عمان)' } }
  ];

  const getStatusColor = (status: EscrowAccount['status']) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'deficient': return 'bg-amber-100 text-amber-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'frozen': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: EscrowAccount['status']) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4" />;
      case 'deficient': return <AlertCircle className="h-4 w-4" />;
      case 'critical': return <AlertCircle className="h-4 w-4" />;
      case 'frozen': return <Lock className="h-4 w-4" />;
      default: return null;
    }
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.developer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || account.status === filterStatus;
    const matchesJurisdiction = filterJurisdiction === 'all' || account.jurisdiction.includes(filterJurisdiction);
    return matchesSearch && matchesStatus && matchesJurisdiction;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateDeficit = (account: EscrowAccount) => {
    const deficit = account.requiredBalance - account.currentBalance;
    return deficit > 0 ? deficit : 0;
  };

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccount.projectName.trim() || newAccount.totalAmount <= 0) return;
    const requiredBalance = newAccount.totalAmount * 0.8;
    const currentBalance = newAccount.currentBalance || newAccount.totalAmount * 0.5;
    addAccount({
      projectName: newAccount.projectName,
      developer: newAccount.developer || 'Developer',
      jurisdiction: newAccount.jurisdiction,
      totalAmount: newAccount.totalAmount,
      currentBalance,
      requiredBalance,
      status: currentBalance >= requiredBalance ? 'healthy' :
              currentBalance >= requiredBalance * 0.7 ? 'deficient' : 'critical',
      lastDeposit: new Date().toISOString().split('T')[0],
      nextAudit: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      propertiesCount: Math.floor(Math.random() * 50) + 10,
      buyersCount: Math.floor(Math.random() * 40) + 5,
      complianceScore: 80 + Math.floor(Math.random() * 20),
    });
    setNewAccount({ projectName: '', developer: '', jurisdiction: 'AE-DU', totalAmount: 0, currentBalance: 0, status: 'healthy' });
    setShowAddForm(false);
  };

  const handleDeleteAccount = (id: string) => deleteAccount(id);

  return (
    <div className="space-y-6">
      {/* Header & Stats omitted for brevity, same as your code */}

      {/* Escrow Accounts Tab */}
      {activeTab === 'accounts' && filteredAccounts.length > 0 && (
        <div className="space-y-6">
          {filteredAccounts.map(account => {
            const deficit = calculateDeficit(account);
            const deficitPercentage = account.requiredBalance > 0 ? Math.round((deficit / account.requiredBalance) * 100) : 0;
            return (
              <div key={account.id} className="border rounded-xl p-6 hover:border-emerald-300 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{account.projectName}</h3>
                    <p className="text-sm text-gray-500">{account.developer}</p>
                    <div className={`inline-flex items-center mt-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(account.status)}`}>
                      {getStatusIcon(account.status)}
                      <span className="ml-1">{account.status}</span>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-gray-500">{`Balance: ${formatCurrency(account.currentBalance)} / ${formatCurrency(account.requiredBalance)}`}</p>
                      {deficit > 0 && (
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: `${deficitPercentage}%` }}></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify-between space-y-3 lg:items-end">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm flex items-center">
                        <Eye className="h-4 w-4 mr-1" /> View
                      </button>
                      <button className="px-3 py-1 bg-amber-500 text-white rounded-lg text-sm flex items-center">
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </button>
                      <button onClick={() => handleDeleteAccount(account.id)} className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm flex items-center">
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">{language === 'en' ? 'Escrow Reports' : 'تقارير الضمان'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-xl border">
              <p className="text-sm text-gray-500">{language === 'en' ? 'Total Escrow Accounts' : 'إجمالي الحسابات'}</p>
              <p className="text-2xl font-bold mt-1">{stats.totalAccounts}</p>
            </div>
            <div className="p-4 bg-white rounded-xl border">
              <p className="text-sm text-gray-500">{language === 'en' ? 'Total Balance' : 'الرصيد الإجمالي'}</p>
              <p className="text-2xl font-bold mt-1">{formatCurrency(stats.totalBalance)}</p>
            </div>
            <div className="p-4 bg-white rounded-xl border">
              <p className="text-sm text-gray-500">{language === 'en' ? 'Deficient Accounts' : 'الحسابات الناقصة'}</p>
              <p className="text-2xl font-bold mt-1">{stats.deficientAccounts}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
