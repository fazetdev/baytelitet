'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users, Building2, ShieldCheck, TrendingUp,
  AlertTriangle, Clock, CheckCircle2, Plus, Search, X, Camera, Briefcase, MapPin, Award,
  Lock, Mail, Phone, Upload, Home, Globe, MessageSquare, UserCheck,
  Loader2
} from 'lucide-react';

// Define types locally
interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  agency?: string;
  licenseNumber: string;
  specialization?: string;
  city?: string;
  experience?: string;
  bio?: string;
  status: 'active' | 'inactive';
}

interface Property {
  id: string;
  title: string;
  // other properties...
}

export default function AdminDashboard() {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [agentsLoading, setAgentsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    email: '',
    phone: '',
    photo: '',

    // Professional Credentials
    agency: '',
    licenseNumber: '',
    specialization: 'Residential',
    languages: ['English', 'Arabic'],
    city: 'Dubai',
    experience: '',
    bio: '',

    // Login Security
    password: '',
    confirmPassword: '',
  });

  // Languages options
  const languageOptions = ['English', 'Arabic', 'Hindi', 'Urdu', 'French', 'Russian', 'Chinese'];

  // Specialization options
  const specializationOptions = [
    'Residential',
    'Commercial',
    'Luxury Properties',
    'Off-plan Projects',
    'Villas & Townhouses',
    'Apartments',
    'Investment Properties',
    'Golden Visa Properties'
  ];

  // City options
  const cityOptions = [
    'Dubai',
    'Abu Dhabi',
    'Sharjah',
    'Ajman',
    'Ras Al Khaimah',
    'Fujairah',
    'Umm Al Quwain',
    'Al Ain'
  ];

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch properties
        const propertiesRes = await fetch('/api/properties');
        if (propertiesRes.ok) {
          const propertiesData = await propertiesRes.json();
          setProperties(propertiesData);
        }

        // Fetch agents
        const agentsRes = await fetch('/api/v1/agents');
        if (agentsRes.ok) {
          const agentsData = await agentsRes.json();
          setAgents(agentsData);
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchAgents = async () => {
    setAgentsLoading(true);
    try {
      const response = await fetch('/api/v1/agents');
      if (response.ok) {
        const data = await response.json();
        setAgents(data);
      }
    } catch (err) {
      console.error('Failed to fetch agents:', err);
      setError('Failed to load agents.');
    } finally {
      setAgentsLoading(false);
    }
  };

  const addAgent = async (agentData: Omit<Agent, 'id' | 'status'>) => {
    setAgentsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/v1/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...agentData,
          password: formData.password,
          reraLicense: agentData.licenseNumber,
          status: 'active'
        }),
      });

      if (response.ok) {
        const newAgent = await response.json();
        setAgents(prev => [...prev, newAgent]);
        return newAgent;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add agent');
      }
    } catch (err) {
      console.error('Failed to add agent:', err);
      setError(err instanceof Error ? err.message : 'Failed to add agent');
      throw err;
    } finally {
      setAgentsLoading(false);
    }
  };

  const deleteAgent = async (id: string) => {
    try {
      const response = await fetch(`/api/v1/agents/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAgents(prev => prev.filter(agent => agent.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete agent:', err);
      setError('Failed to delete agent');
    }
  };

  // File upload handlers
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size too large. Maximum 5MB allowed.');
        return;
      }

      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setPreviewImage(dataUrl);
        setFormData(prev => ({ ...prev, photo: dataUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewImage(null);
    setFormData(prev => ({ ...prev, photo: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => {
      const currentLanguages = [...prev.languages];
      if (currentLanguages.includes(language)) {
        return { ...prev, languages: currentLanguages.filter(l => l !== language) };
      } else {
        return { ...prev, languages: [...currentLanguages, language] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {
      await addAgent({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        photo: formData.photo,
        agency: formData.agency,
        licenseNumber: formData.licenseNumber,
        specialization: formData.specialization,
        city: formData.city,
        bio: formData.bio,
        experience: formData.experience,
      });

      // Reset form
      setShowForm(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        photo: '',
        agency: '',
        licenseNumber: '',
        specialization: 'Residential',
        languages: ['English', 'Arabic'],
        city: 'Dubai',
        experience: '',
        bio: '',
        password: '',
        confirmPassword: '',
      });
      setSelectedFile(null);
      setPreviewImage(null);
    } catch (err) {
      // Error already set by addAgent
    }
  };

  const handleGoHome = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Home Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agent Management</h1>
          <p className="text-gray-600">Onboard and manage real estate agents</p>
        </div>
        <button
          onClick={handleGoHome}
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex justify-between items-center">
          <div className="flex items-center gap-2 text-red-700">
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
            <X size={18} />
          </button>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Agents</p>
              <p className="text-2xl font-bold mt-1">{agents.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Properties</p>
              <p className="text-2xl font-bold mt-1">{properties.length}</p>
            </div>
            <Building2 className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Listings</p>
              <p className="text-2xl font-bold mt-1">
                {properties.filter(p => p.status === 'published').length}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-amber-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Verified Agents</p>
              <p className="text-2xl font-bold mt-1">{agents.length}</p>
            </div>
            <ShieldCheck className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Management Section */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Agent Directory</h3>
            <p className="text-sm text-gray-500">{agents.length} registered agents</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            disabled={agentsLoading}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold hover:bg-blue-700 transition-all shadow-sm disabled:opacity-50"
          >
            <Plus size={18} /> Add New Agent
          </button>
        </div>

        <div className="p-6">
          {agentsLoading && agents.length === 0 ? (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Loading agents...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(agents && Array.isArray(agents) ? agents : []).map((agent) => (
                <div key={agent.id} className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 border border-gray-300">
                      {agent.photo ? (
                        <img src={agent.photo} alt={agent.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-xl">
                          {agent.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 truncate">{agent.name}</h4>
                      <p className="text-sm text-gray-600 truncate">{agent.agency || 'Independent'}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Award className="w-3 h-3 text-emerald-500" />
                        <span className="text-xs text-gray-500">{agent.licenseNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-3 h-3" />
                      <span className="truncate">{agent.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-3 h-3" />
                      <span>{agent.phone}</span>
                    </div>
                    {agent.specialization && (
                      <div className="mt-3">
                        <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                          {agent.specialization}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {agents.length === 0 && !agentsLoading && (
                <div className="col-span-3 text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Agents Yet</h3>
                  <p className="text-gray-500 mb-6">Start by adding your first agent</p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                  >
                    <Plus className="w-5 h-5" />
                    Add First Agent
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Agent Onboarding Modal - Keep existing form but trimmed for brevity */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-auto">
            <div className="p-6 bg-gray-900 text-white flex justify-between items-center sticky top-0">
              <div>
                <h2 className="text-xl font-bold">Add New Agent</h2>
                <p className="text-sm text-gray-300">Complete all required fields</p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="hover:rotate-90 transition-transform p-1"
                disabled={agentsLoading}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Profile Picture Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Profile Picture
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  className="hidden"
                />
                <div className="flex flex-col items-center">
                  {previewImage ? (
                    <div className="relative">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={triggerFileInput}
                    >
                      <Camera className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Upload Photo</p>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    {previewImage ? 'Change Photo' : 'Select Photo'}
                  </button>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      type="text"
                      placeholder="Samir Al-Farsi"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      disabled={agentsLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      type="email"
                      placeholder="agent@agency.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      disabled={agentsLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      required
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      type="tel"
                      placeholder="+971 50 123 4567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      disabled={agentsLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      RERA License *
                    </label>
                    <input
                      required
                      value={formData.licenseNumber}
                      onChange={e => setFormData({...formData, licenseNumber: e.target.value})}
                      type="text"
                      placeholder="RERA-ORN-12345"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      disabled={agentsLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-4">Login Security</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password *
                    </label>
                    <input
                      required
                      type="password"
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      disabled={agentsLoading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password *
                    </label>
                    <input
                      required
                      type="password"
                      value={formData.confirmPassword}
                      onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      disabled={agentsLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t">
                <button
                  type="submit"
                  disabled={agentsLoading}
                  className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {agentsLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Adding Agent...
                    </>
                  ) : (
                    'Add Agent'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
