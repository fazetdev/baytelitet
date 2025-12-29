'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PropertyMap from '@/app/(public)/properties/components/PropertyMap';
import { useAgents } from '@/app/context/useAgents';
import {
  Bed,
  Bath,
  MapPin,
  Send,
  Loader2,
  DollarSign,
  User,
  Phone,
  Mail,
  Shield,
  Maximize,
  Home,
  Building2,
  CheckCircle,
  Camera,
  Star,
  ChevronLeft,
  ChevronRight,
  Share2,
  Bookmark,
  Calendar,
  TrendingUp,
  ShieldCheck,
  FileText,
  Heart,
  Eye,
  Grid,
  List,
  Download,
  Printer,
  MessageCircle,
  Clock,
  Award,
  Zap,
  Thermometer,
  Wifi,
  Car,
  TreePine,
  Dumbbell,
  Coffee,
  Wind
} from 'lucide-react';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'location' | 'compliance' | 'gallery'>('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const { loadAgents } = useAgents();
  const [agent, setAgent] = useState<any>(null);

  useEffect(() => {
    const savedProperties = localStorage.getItem('gulf_properties');
    if (savedProperties) {
      const allProperties = JSON.parse(savedProperties);
      const foundProperty = allProperties.find((p: any) =>
        String(p.id) === String(id)
      );

      if (foundProperty) {
        setProperty(foundProperty);
        loadAgents();
        const storedAgents = JSON.parse(localStorage.getItem('agents') || '[]');
        if (foundProperty.agentId) {
          const foundAgent = storedAgents.find((a: any) => a.id === foundProperty.agentId);
          setAgent(foundAgent);
        }
      }
    }
    setMounted(true);
  }, [id, loadAgents]);

  const images = property ? [property.heroImage, ...(property.gallery || [])].filter(Boolean) : [];

  const getPropertyTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      apartment: 'Apartment', villa: 'Villa', townhouse: 'Townhouse',
      penthouse: 'Penthouse', office: 'Office', retail: 'Retail',
      warehouse: 'Warehouse', land: 'Land',
    };
    return labels[type] || type;
  };

  const formatPrice = (price: string | number) => {
    const numPrice = Number(price);
    return isNaN(numPrice) ? '0' : numPrice.toLocaleString();
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
          <a href="/properties" className="text-blue-600 hover:underline">Back to Properties</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-gray-900">
        {images.length > 0 && (
          <img
            src={images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-600 rounded-full text-sm font-medium">
                {getPropertyTypeLabel(property.propertyType)}
              </span>
              {property.offPlan && <span className="px-3 py-1 bg-amber-600 rounded-full text-sm font-medium">Off-Plan</span>}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-2">{property.title}</h1>
            <div className="flex items-center gap-2 text-lg">
              <MapPin className="w-5 h-5" />
              <span>{property.address}, {property.city}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="flex border-b overflow-x-auto">
              {['overview', 'features', 'location', 'compliance'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-6 py-4 font-medium capitalize whitespace-nowrap ${
                    activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="py-4">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <p className="text-gray-600 text-lg leading-relaxed">{property.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500">Area</p>
                      <p className="font-bold">{property.area} {property.areaUnit || 'sqft'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500">Bedrooms</p>
                      <p className="font-bold">{property.beds}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500">Bathrooms</p>
                      <p className="font-bold">{property.baths}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500">Year Built</p>
                      <p className="font-bold">{property.yearBuilt || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'features' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><Wifi className="text-blue-600"/> WiFi</div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><Car className="text-blue-600"/> Parking</div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><Dumbbell className="text-blue-600"/> Gym</div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><Wind className="text-blue-600"/> A/C</div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><Shield className="text-blue-600"/> Security</div>
                </div>
              )}

              {activeTab === 'location' && (
                <div className="h-[400px] rounded-xl overflow-hidden border">
                  <PropertyMap latitude={property.lat} longitude={property.long} title={property.title} zoom={15} />
                </div>
              )}

              {activeTab === 'compliance' && (
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3 mb-4 text-green-800">
                    <ShieldCheck className="w-8 h-8" />
                    <h3 className="text-xl font-bold">Verified Listing</h3>
                  </div>
                  <p className="text-green-700">RERA Number: {property.reraNumber || 'Pending'}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="p-6 border rounded-2xl sticky top-24 bg-white shadow-sm">
              <h3 className="text-3xl font-bold mb-6">AED {formatPrice(property.price)}</h3>
              <div className="flex items-center gap-4 mb-6 p-3 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <User />
                </div>
                <div>
                  <p className="font-bold">{agent?.name || 'Assigned Agent'}</p>
                  <p className="text-sm text-gray-500">Property Specialist</p>
                </div>
              </div>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setFormStatus('sent'); }}>
                <input type="text" placeholder="Name" className="w-full p-3 border rounded-lg" required />
                <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg" required />
                <textarea placeholder="I'm interested..." className="w-full p-3 border rounded-lg h-24" required />
                <button className={`w-full py-4 rounded-lg font-bold text-white ${formStatus === 'sent' ? 'bg-green-600' : 'bg-blue-600'}`}>
                  {formStatus === 'sent' ? 'Message Sent!' : 'Send Inquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
