'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, Home, TrendingUp, DollarSign, MessageSquare, 
  Phone, Mail, Award, Building, FileText, Calendar,
  Shield, Target, BarChart, Download, Filter, Search,
  Plus, ChevronRight, Eye, Edit, Share, MoreVertical,
  Camera, MapPin, CheckCircle, AlertCircle, Clock,
  Loader2
} from 'lucide-react';
import { useGulfAssetStore } from '@/lib/stores/gulfAssetStore';
import { useAgentStore } from '@/lib/stores/agentStore';

export default function AgentDashboard() {
  const router = useRouter();
  
  // Get current agent from store (in real app, from auth/session)
  const { agents, isLoading: agentsLoading } = useAgentStore();
  const { properties, loading: propertiesLoading, loadProperties } = useGulfAssetStore();
  
  const [currentAgent, setCurrentAgent] = useState<any>(null);
  const [agentProperties, setAgentProperties] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    publishedProperties: 0,
    draftProperties: 0,
    totalCommission: 0,
    pendingApprovals: 0
  });

  // For demo - get first agent as current
  // In production, get from auth/session
  useEffect(() => {
    if (agents.length > 0 && !currentAgent) {
      setCurrentAgent(agents[0]);
    }
  }, [agents, currentAgent]);

  // Load properties
  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  // Filter properties for current agent and calculate stats
  useEffect(() => {
    if (currentAgent && properties.length > 0) {
      const agentProps = properties.filter(p => 
        p.agentId === currentAgent.id || 
        p.agentName === currentAgent.name ||
        p.agentEmail === currentAgent.email
      );
      
      setAgentProperties(agentProps);
      
      // Calculate stats - FIXED: Use correct complianceStatus values
      // Based on TypeScript, complianceStatus can be: 'draft', 'pending', 'rejected', undefined
      const published = agentProps.filter(p => 
        p.complianceStatus === 'verified' || // If 'verified' exists
        p.isPublished === true // Use isPublished boolean
      ).length;
      
      const drafts = agentProps.filter(p => 
        p.complianceStatus === 'draft'
      ).length;
      
      const pending = agentProps.filter(p => 
        p.complianceStatus === 'pending'
      ).length;
      
      // Calculate commission (simplified - 2% of property value)
      const commission = agentProps.reduce((total, prop) => {
        const price = typeof prop.price === 'number' ? prop.price : parseFloat(prop.price) || 0;
        return total + (price * 0.02);
      }, 0);
      
      setStats({
        totalProperties: agentProps.length,
        publishedProperties: published,
        draftProperties: drafts,
        totalCommission: commission,
        pendingApprovals: pending
      });
    }
  }, [currentAgent, properties]);

  const handleAddProperty = () => {
    // Navigate to property form
    router.push('/test-property-integration');
  };

  const handleViewProperty = (propertyId: string) => {
    router.push(`/properties/${propertyId}`);
  };

  const handleEditProperty = (propertyId: string) => {
    router.push(`/test-property-integration?edit=${propertyId}`);
  };

  // FIXED: Handle both complianceStatus and isPublished
  const getStatusBadge = (property: any) => {
    // Check if property is published
    if (property.isPublished === true) {
      return { 
        style: 'bg-emerald-100 text-emerald-700', 
        label: 'Published' 
      };
    }
    
    // Otherwise use complianceStatus
    const status = property.complianceStatus || 'draft';
    const statusMap: Record<string, { bg: string, text: string, label: string }> = {
      'verified': { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Verified' },
      'pending': { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Pending' },
      'draft': { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Draft' },
      'rejected': { bg: 'bg-red-100', text: 'text-red-700', label: 'Rejected' }
    };
    
    const style = statusMap[status.toLowerCase()] || { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Draft' };
    return { style: `${style.bg} ${style.text}`, label: style.label };
  };

  const getComplianceBadge = (compliance: string) => {
    const complianceMap: Record<string, { bg: string, text: string, icon: any }> = {
      'verified': { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle },
      'pending': { bg: 'bg-amber-100', text: 'text-amber-700', icon: Clock },
      'draft': { bg: 'bg-gray-100', text: 'text-gray-700', icon: FileText },
      'rejected': { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle }
    };
    
    return complianceMap[compliance] || { bg: 'bg-gray-100', text: 'text-gray-700', icon: FileText };
  };

  const quickStats = [
    { 
      label: 'Total Properties', 
      value: stats.totalProperties, 
      icon: Home, 
      color: 'bg-blue-500',
      description: 'Your listed properties'
    },
    { 
      label: 'Published', 
      value: stats.publishedProperties, 
      icon: CheckCircle, 
      color: 'bg-green-500',
      description: 'Live listings'
    },
    { 
      label: 'Commission (AED)', 
      value: stats.totalCommission.toLocaleString('en-AE', { minimumFractionDigits: 0, maximumFractionDigits: 0 }), 
      icon: DollarSign, 
      color: 'bg-purple-500',
      description: 'Estimated total'
    },
    { 
      label: 'Pending Approval', 
      value: stats.pendingApprovals, 
      icon: Shield, 
      color: 'bg-amber-500',
      description: 'Awaiting review'
    },
  ];

  if (agentsLoading || propertiesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading agent dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agent Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your properties, leads, and commissions</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => loadProperties()}
              className="px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50"
              disabled={propertiesLoading}
            >
              {propertiesLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              Refresh
            </button>
            <button 
              onClick={handleAddProperty}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Add New Property
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Agent Profile */}
        <div className="lg:col-span-1 space-y-6">
          {/* Agent Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              {currentAgent ? (
                <>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200">
                      {currentAgent.photo ? (
                        <img 
                          src={currentAgent.photo} 
                          alt={currentAgent.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-2xl">
                          {currentAgent.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900">{currentAgent.name}</h2>
                      <p className="text-sm text-gray-600">{currentAgent.agency || 'Independent Agent'}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Award className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-medium">{currentAgent.licenseNumber || 'RERA Licensed'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                      </div>
                      <p className="font-medium text-sm truncate">{currentAgent.email}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Phone className="w-4 h-4" />
                        <span>Phone</span>
                      </div>
                      <p className="font-medium text-sm">{currentAgent.phone}</p>
                    </div>
                  </div>

                  {currentAgent.specialization && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <p className="text-sm text-gray-500 mb-2">Specialization</p>
                      <div className="flex flex-wrap gap-2">
                        {typeof currentAgent.specialization === 'string' ? (
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                            {currentAgent.specialization}
                          </span>
                        ) : (
                          currentAgent.specialization?.map((spec: string, idx: number) => (
                            <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                              {spec}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No agent data available</p>
                </div>
              )}
            </div>
          </div>

          {/* Compliance Status */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Compliance Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">RERA License</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                  {currentAgent?.licenseNumber ? 'Valid' : 'Not Set'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Properties Verified</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                  {stats.publishedProperties}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending Approval</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                  {stats.pendingApprovals}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Properties & Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Properties Section */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-900">Your Properties</h2>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search properties..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option value="all">All Status</option>
                    <option value="verified">Verified</option>
                    <option value="draft">Draft</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6">
              {agentProperties.length === 0 ? (
                <div className="text-center py-12">
                  <Home className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Yet</h3>
                  <p className="text-gray-500 mb-6">Start by adding your first property listing</p>
                  <button 
                    onClick={handleAddProperty}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                  >
                    <Plus className="w-5 h-5" />
                    Add Your First Property
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {agentProperties.slice(0, 5).map((property) => {
                    const statusInfo = getStatusBadge(property);
                    const compliance = getComplianceBadge(property.complianceStatus || 'draft');
                    const ComplianceIcon = compliance.icon || FileText;
                    
                    return (
                      <div key={property.id} className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="md:w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {property.heroImage || property.image ? (
                            <img 
                              src={property.heroImage || property.image} 
                              alt={property.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                              <Home className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                            <div>
                              <h3 className="font-bold text-gray-900">{property.title}</h3>
                              <p className="text-lg font-semibold text-blue-600 mt-1">
                                {typeof property.price === 'number' 
                                  ? `AED ${property.price.toLocaleString('en-AE')}`
                                  : property.price || 'Price not set'
                                }
                              </p>
                              <div className="flex items-center gap-3 mt-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.style}`}>
                                  {statusInfo.label}
                                </span>
                                {property.complianceStatus === 'verified' && (
                                  <span className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 bg-emerald-100 text-emerald-700">
                                    <CheckCircle className="w-3 h-3" />
                                    Verified
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleViewProperty(property.id)}
                                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleEditProperty(property.id)}
                                className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{property.city || 'Location not set'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Home className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">
                                {property.beds ? `${property.beds} Beds` : 'Beds not set'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Building className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{property.propertyType || 'Type not set'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{property.reraNumber || 'No RERA'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {agentProperties.length > 5 && (
                    <div className="text-center pt-4">
                      <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 mx-auto">
                        View All Properties
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={handleAddProperty}
                className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Plus className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Add Property</p>
                    <p className="text-sm text-gray-500">Create new listing</p>
                  </div>
                </div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <BarChart className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">View Reports</p>
                    <p className="text-sm text-gray-500">Performance analytics</p>
                  </div>
                </div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Commission</p>
                    <p className="text-sm text-gray-500">View earnings</p>
                  </div>
                </div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                    <MessageSquare className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Leads</p>
                    <p className="text-sm text-gray-500">Manage inquiries</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
