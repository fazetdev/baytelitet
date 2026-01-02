'use client';

import { useState, useEffect } from 'react';
import {
  Lock, DollarSign, AlertCircle, CheckCircle, Clock,
  TrendingUp, FileText, Download, Filter, Search,
  BarChart3, Building2, Users, Eye, RefreshCw,
  ChevronRight, Shield, Percent, Calendar, Banknote,
  Plus, Trash2, Edit, ArrowUpRight, ArrowDownLeft,
  Loader2
} from 'lucide-react';

// Define types locally
interface EscrowAccount {
  id: string;
  projectName: string;
  developer: string;
  jurisdiction: string;
  status: 'healthy' | 'deficient' | 'critical';
  currentBalance: number;
  requiredBalance: number;
  lastAudit: string;
}

interface EscrowTransaction {
  id: string;
  date: string;
  type: 'deposit' | 'withdrawal';
  projectId: string;
  amount: number;
  description: string;
}

export default function EscrowPage() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [activeTab, setActiveTab] = useState<'accounts' | 'transactions' | 'reports' | 'monitoring'>('accounts');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [accounts, setAccounts] = useState<EscrowAccount[]>([]);
  const [transactions, setTransactions] = useState<EscrowTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<any[]>([]);

  // Load data from APIs
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch properties that require escrow
        const propertiesRes = await fetch('/api/properties');
        if (propertiesRes.ok) {
          const propertiesData = await propertiesRes.json();
          setProperties(propertiesData);
          
          // Create mock escrow accounts from properties that require escrow
          const escrowProperties = propertiesData.filter((p: any) => p.escrowRequired);
          const mockAccounts: EscrowAccount[] = escrowProperties.map((p: any) => ({
            id: p.id || Math.random().toString(36).substr(2, 9),
            projectName: p.title || 'Unnamed Project',
            developer: p.developerName || 'Unknown Developer',
            jurisdiction: p.jurisdiction || 'AE-DU',
            status: Math.random() > 0.7 ? 'healthy' : (Math.random() > 0.5 ? 'deficient' : 'critical'),
            currentBalance: Math.floor(Math.random() * 10000000) + 500000,
            requiredBalance: Math.floor(Math.random() * 15000000) + 1000000,
            lastAudit: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
          }));
          
          setAccounts(mockAccounts);
          
          // Create mock transactions
          const mockTransactions: EscrowTransaction[] = [];
          for (let i = 0; i < 10; i++) {
            mockTransactions.push({
              id: `tx-${i}`,
              date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              type: Math.random() > 0.5 ? 'deposit' : 'withdrawal',
              projectId: mockAccounts[Math.floor(Math.random() * mockAccounts.length)]?.id || 'unknown',
              amount: Math.floor(Math.random() * 500000) + 10000,
              description: Math.random() > 0.5 ? 'Property purchase deposit' : 'Developer withdrawal'
            });
          }
          setTransactions(mockTransactions);
        }
      } catch (error) {
        console.error('Failed to load escrow data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateStats = () => {
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.currentBalance, 0);
    const totalAccounts = accounts.length;
    const deficientAccounts = accounts.filter(acc => acc.status === 'deficient' || acc.status === 'critical').length;
    const avgCompliance = accounts.length > 0 
      ? Math.round((accounts.filter(acc => acc.status === 'healthy').length / accounts.length) * 100)
      : 100;
    
    return { totalBalance, totalAccounts, deficientAccounts, avgCompliance };
  };

  const deleteAccount = (id: string) => {
    if (confirm('Are you sure you want to delete this escrow account?')) {
      setAccounts(prev => prev.filter(acc => acc.id !== id));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.developer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || account.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'en' ? 'Escrow Management' : 'إدارة الضمان'}
          </h1>
          <p className="text-gray-500">
            {language === 'en' ? 'Project Account Oversight & Compliance' : 'الإشراف على حساب المشروع والامتثال'}
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} 
            className="px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50"
          >
            {language === 'en' ? 'العربية' : 'English'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
            <Plus className="h-4 w-4" /> {language === 'en' ? 'Add Account' : 'إضافة حساب'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500 font-medium">{language === 'en' ? 'Total Balance' : 'إجمالي الرصيد'}</p>
          <h3 className="text-2xl font-bold mt-1 text-gray-900">{formatCurrency(stats.totalBalance)}</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500 font-medium">{language === 'en' ? 'Active Projects' : 'المشاريع النشطة'}</p>
          <h3 className="text-2xl font-bold mt-1 text-gray-900">{stats.totalAccounts}</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500 font-medium">{language === 'en' ? 'Compliance Rate' : 'معدل الامتثال'}</p>
          <h3 className="text-2xl font-bold mt-1 text-green-600">{stats.avgCompliance}%</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500 font-medium">{language === 'en' ? 'Deficient' : 'ناقص'}</p>
          <h3 className="text-2xl font-bold mt-1 text-red-600">{stats.deficientAccounts}</h3>
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="flex border-b overflow-x-auto bg-gray-50/50">
          {(['accounts', 'transactions', 'reports', 'monitoring'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="p-4 border-b flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              placeholder="Search project or developer..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border rounded-lg px-4 py-2 outline-none bg-white text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="healthy">Healthy</option>
            <option value="deficient">Deficient</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div className="p-6">
          {activeTab === 'accounts' && (
            <div className="grid grid-cols-1 gap-4">
              {filteredAccounts.length > 0 ? (
                filteredAccounts.map(account => (
                  <div key={account.id} className="border rounded-xl p-6 flex flex-col lg:flex-row justify-between gap-4 hover:border-blue-200 transition-colors">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{account.projectName}</h3>
                      <p className="text-sm text-gray-500 font-medium">{account.developer} | {account.jurisdiction}</p>
                      <div className={`mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                        account.status === 'healthy' ? 'bg-green-100 text-green-700' :
                        account.status === 'critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {account.status}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 font-bold uppercase">Current Balance</p>
                      <p className="text-xl font-bold text-gray-900">{formatCurrency(account.currentBalance)}</p>
                      <div className="mt-4 flex gap-2 justify-end">
                        <button className="p-2 border rounded hover:bg-gray-50 text-gray-600">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => deleteAccount(account.id)} 
                          className="p-2 border border-red-100 text-red-600 rounded hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-400">
                  <Building2 className="h-10 w-10 mx-auto mb-2 opacity-20" />
                  <p>No escrow accounts found.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-gray-400 text-xs uppercase border-b bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-bold">Date</th>
                    <th className="px-4 py-3 font-bold">Type</th>
                    <th className="px-4 py-3 font-bold">Project</th>
                    <th className="px-4 py-3 font-bold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {transactions.map(tx => (
                    <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 text-sm text-gray-600">{tx.date}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center text-xs font-bold uppercase ${tx.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                          {tx.type === 'deposit' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownLeft className="h-3 w-3 mr-1" />}
                          {tx.type}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-gray-900">{tx.projectId}</td>
                      <td className={`px-4 py-4 text-right font-bold ${tx.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(tx.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
