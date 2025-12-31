'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users, Building2, ShieldCheck, TrendingUp,
  AlertTriangle, Clock, CheckCircle2, Plus, Search, X, Camera, Briefcase, MapPin, Award, 
  Lock, Mail, Phone, Upload, Home, Globe, MessageSquare, UserCheck
} from 'lucide-react';
import { useGulfComplianceStore } from '@/lib/stores/compliance/gulfComplianceStore';
import { useGulfAssetStore } from '@/lib/stores/gulfAssetStore';
import { useAgentStore } from '@/lib/stores/agentStore';

export default function AdminDashboard() {
  const router = useRouter();
  const { records } = useGulfComplianceStore();
  const { properties } = useGulfAssetStore();
  const { agents, isLoading, error, fetchAgents, addAgent, deleteAgent, clearError } = useAgentStore();

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

  // Fetch agents on component mount
  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

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

    // Use the store's addAgent method
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
      status: 'active'
    });

    // Reset form only if no error
    if (!error) {
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
    }
  };

  const handleGoHome = () => {
    router.push('/');
  };

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
          <button onClick={clearError} className="text-red-500 hover:text-red-700">
            <X size={18} />
          </button>
        </div>
      )}

      {/* Management Section */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Agent Directory</h3>
            <p className="text-sm text-gray-500">{agents.length} registered agents</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            disabled={isLoading}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold hover:bg-blue-700 transition-all shadow-sm disabled:opacity-50"
          >
            <Plus size={18} /> Add New Agent
          </button>
        </div>

        <div className="p-6">
          {isLoading && agents.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-500">Loading agents...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agents.map((agent) => (
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
              
              {agents.length === 0 && !isLoading && (
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

      {/* Agent Onboarding Modal */}
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
                disabled={isLoading}
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
                  capture="environment"
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
                      <p className="text-xs text-gray-400">Click or use camera</p>
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
                <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  Personal Information
                </h3>
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
                      disabled={isLoading}
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
                      disabled={isLoading}
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
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Agency Name
                    </label>
                    <input
                      value={formData.agency}
                      onChange={e => setFormData({...formData, agency: e.target.value})}
                      type="text"
                      placeholder="Elite Properties LLC"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Professional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      RERA License Number *
                    </label>
                    <input
                      required
                      value={formData.licenseNumber}
                      onChange={e => setFormData({...formData, licenseNumber: e.target.value})}
                      type="text"
                      placeholder="RERA-ORN-12345"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specialization *
                    </label>
                    <select
                      value={formData.specialization}
                      onChange={e => setFormData({...formData, specialization: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      disabled={isLoading}
                    >
                      {specializationOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City/Region
                    </label>
                    <select
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      disabled={isLoading}
                    >
                      {cityOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience (Years)
                    </label>
                    <input
                      value={formData.experience}
                      onChange={e => setFormData({...formData, experience: e.target.value})}
                      type="number"
                      placeholder="5"
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Languages */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Languages Spoken
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {languageOptions.map(language => (
                      <button
                        type="button"
                        key={language}
                        onClick={() => handleLanguageToggle(language)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                          formData.languages.includes(language)
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Globe className="w-3 h-3" />
                        {language}
                        {formData.languages.includes(language) && (
                          <CheckCircle2 className="w-3 h-3" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Professional Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={e => setFormData({...formData, bio: e.target.value})}
                    rows={3}
                    placeholder="Experienced real estate professional specializing in luxury properties with a track record of successful transactions..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Login Security */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  Login Security
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password *
                    </label>
                    <input
                      required
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                      type="password"
                      placeholder="Minimum 6 characters"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password *
                    </label>
                    <input
                      required
                      value={formData.confirmPassword}
                      onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                      type="password"
                      placeholder="Re-enter password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 py-3 rounded-xl font-bold text-white transition-all ${
                    isLoading
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating Agent...
                    </div>
                  ) : (
                    'Create Agent Account'
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
