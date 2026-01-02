'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  User, Home, TrendingUp, DollarSign, MessageSquare,
  Phone, Mail, Award, Building, FileText, Calendar,
  Shield, Target, BarChart, Download, Filter, Search,
  Plus, ChevronRight, Eye, Edit, Share, MoreVertical,
  Camera, MapPin, CheckCircle, AlertCircle, Clock,
  Loader2, Bed, Bath, Square
} from 'lucide-react';
import { useProperties } from '@/app/context/useProperties';
import { useAgents } from '@/app/context/useAgents';

export default function AgentDashboard() {
  const router = useRouter();
  const { properties, loading: propertiesLoading } = useProperties();
  const { agents, loading: agentsLoading } = useAgents();

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
  useEffect(() => {
    if (agents.length > 0 && !currentAgent) {
      setCurrentAgent(agents[0]);
    }
  }, [agents, currentAgent]);

  // Filter properties for current agent and calculate stats
  useEffect(() => {
    if (currentAgent && properties.length > 0) {
      // Match by agent name or ID
      const agentProps = properties.filter(p =>
        (p.agentId && p.agentId.toString() === currentAgent.id?.toString()) ||
        (p.agentName && p.agentName.toLowerCase().includes(currentAgent.name?.toLowerCase()))
      );

      setAgentProperties(agentProps);

      // Calculate stats
      const published = agentProps.filter(p =>
        p.complianceStatus === 'verified' || p.status === 'published'
      ).length;

      const drafts = agentProps.filter(p =>
        p.complianceStatus === 'draft' || p.status === 'draft'
      ).length;

      const pending = agentProps.filter(p =>
        p.complianceStatus === 'pending'
      ).length;

      // Calculate total commission
      const totalCommission = agentProps.reduce((sum, p) => {
        const price = typeof p.price === 'string' ? parseFloat(p.price) : p.price || 0;
        const commissionRate = p.commissionRate || 2.0;
        return sum + (price * commissionRate / 100);
      }, 0);

      setStats({
        totalProperties: agentProps.length,
        publishedProperties: published,
        draftProperties: drafts,
        totalCommission,
        pendingApprovals: pending
      });
    } else {
      // Reset if no current agent
      setAgentProperties([]);
      setStats({
        totalProperties: 0,
        publishedProperties: 0,
        draftProperties: 0,
        totalCommission: 0,
        pendingApprovals: 0
      });
    }
  }, [currentAgent, properties]);

  if (agentsLoading || propertiesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!currentAgent && agents.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">No Agent Found</h2>
          <p className="text-gray-600 mb-6">Please create an agent profile first.</p>
          <button
            onClick={() => router.push('/admin/agents')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Agents
          </button>
        </div>
      </div>
    );
  }

  const agent = currentAgent || (agents.length > 0 ? agents[0] : null);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agent Dashboard</h1>
            <p className="text-gray-600">Manage your properties and commissions</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/admin/assets/onboard')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" />
              Add Property
            </button>
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white shadow">
                {agent?.photo ? (
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '';
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="text-blue-600 font-bold text-lg">
                    {agent?.name?.charAt(0) || 'A'}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Info */}
      {agent && (
        <div className="bg-white p-6 rounded-xl border shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{agent.name}</h2>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{agent.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{agent.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="w-4 h-4" />
                  <span>{agent.licenseNumber || 'License not specified'}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border rounded-lg flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Message
              </button>
              <button className="px-4 py-2 border rounded-lg flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Properties</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProperties}</p>
            </div>
            <Home className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Published</p>
              <p className="text-2xl font-bold text-gray-900">{stats.publishedProperties}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Drafts</p>
              <p className="text-2xl font-bold text-gray-900">{stats.draftProperties}</p>
            </div>
            <FileText className="w-8 h-8 text-amber-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Commission</p>
              <p className="text-2xl font-bold text-gray-900">AED {stats.totalCommission.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Properties List */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Your Properties</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 border rounded-lg flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="px-4 py-2 border rounded-lg flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {agentProperties.length === 0 ? (
          <div className="text-center py-12">
            <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Properties Yet</h3>
            <p className="text-gray-500 mb-6">Start by adding your first property listing</p>
            <button 
              onClick={() => router.push('/admin/assets/onboard')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 inline mr-2" />
              Add Property
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {agentProperties.map((property) => (
              <div key={property.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-32">
                    <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                      {property.heroImage || property.coverImage ? (
                        <img
                          src={property.heroImage || property.coverImage}
                          alt={property.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '';
                            (e.target as HTMLImageElement).className = 'w-full h-full flex items-center justify-center bg-gray-100';
                            (e.target as HTMLImageElement).innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></div>';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Home className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">{property.title}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {property.city}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          property.complianceStatus === 'verified' ? 'bg-green-100 text-green-800' :
                          property.complianceStatus === 'pending' ? 'bg-amber-100 text-amber-800' :
                          property.complianceStatus === 'draft' ? 'bg-gray-100 text-gray-800' :
                          property.status === 'published' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {property.complianceStatus || property.status || 'draft'}
                        </span>
                        <span className="font-bold text-gray-900">
                          AED {typeof property.price === 'string' ? parseFloat(property.price).toLocaleString() : (property.price || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" /> {property.beds || property.bedrooms || 0} beds
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" /> {property.baths || property.bathrooms || 0} baths
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="w-4 h-4" /> {property.area || 0} {property.areaUnit || 'sqft'}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button 
                        onClick={() => router.push(`/properties/${property.id}`)}
                        className="px-3 py-1.5 text-sm border rounded-lg flex items-center gap-1 hover:bg-gray-50"
                      >
                        <Eye className="w-4 h-4" /> View
                      </button>
                      <button className="px-3 py-1.5 text-sm border rounded-lg flex items-center gap-1 hover:bg-gray-50">
                        <Edit className="w-4 h-4" /> Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
