'use client';

import { useState, useEffect } from 'react';
import {
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  Search,
  Filter,
  FileText,
  ExternalLink,
  MapPin,
  Building2,
  Home,
  Loader2
} from 'lucide-react';

// Define types locally since stores are removed
interface ComplianceRecord {
  id: string;
  propertyId: string;
  reraNumber: string;
  status: 'pending' | 'verified' | 'flagged';
  jurisdiction: string;
  lastChecked: string;
}

interface Property {
  id: string;
  title: string;
  // other properties...
}

export default function ComplianceDashboard() {
  const [records, setRecords] = useState<ComplianceRecord[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'verified' | 'flagged'>('all');

  // Load data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch properties
        const propertiesRes = await fetch('/api/properties');
        if (propertiesRes.ok) {
          const propertiesData = await propertiesRes.json();
          setProperties(propertiesData);
          
          // Create mock compliance records based on properties
          const mockRecords: ComplianceRecord[] = propertiesData.map((prop: any) => ({
            id: `comp-${prop.id}`,
            propertyId: prop.id,
            reraNumber: prop.reraNumber || 'RERA-PENDING',
            status: prop.reraVerified ? 'verified' : (prop.complianceStatus === 'pending' ? 'pending' : 'flagged'),
            jurisdiction: prop.jurisdiction || 'AE-DU',
            lastChecked: new Date().toISOString()
          }));
          
          setRecords(mockRecords);
        }
      } catch (error) {
        console.error('Failed to load compliance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateRecord = async (id: string, updates: Partial<ComplianceRecord>) => {
    // In a real app, this would call an API
    setRecords(prev => prev.map(record => 
      record.id === id ? { ...record, ...updates } : record
    ));
  };

  const filteredRecords = records.filter(record => {
    const property = properties.find(p => p.id === record.propertyId);
    const matchesSearch = property?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.reraNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-700';
      case 'flagged': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Oversight</h1>
          <p className="text-gray-500">RERA Validation and Regulatory Monitoring</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            placeholder="Search by Property or RERA Number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border rounded-xl bg-white outline-none"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="verified">Verified</option>
          <option value="flagged">Flagged</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Property / Jurisdiction</th>
                <th className="px-6 py-4">RERA Number</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Checked</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => {
                  const property = properties.find(p => p.id === record.propertyId);
                  return (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{property?.title || 'Unknown Property'}</div>
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <MapPin size={10} /> {record.jurisdiction}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm">{record.reraNumber}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">
                        {new Date(record.lastChecked).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => updateRecord(record.id, { status: 'verified' })}
                          className="text-blue-600 hover:text-blue-800 font-bold text-xs uppercase"
                        >
                          Verify
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400 italic">
                    No compliance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
