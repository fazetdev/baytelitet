'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import VirtualTourViewer from '../components/VirtualTourViewer';
import PropertyMap from '@/components/PropertyMap';
import { useAgents } from '@/context/useAgents';
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
} from 'lucide-react';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'compliance'>('description');

  const { getAgentById, loadAgents } = useAgents();
  const [agent, setAgent] = useState<any>(null);

  useEffect(() => {
    // Load ALL properties from localStorage - FIXED: 'gulf_properties' not 'property'
    const savedProperties = localStorage.getItem('gulf_properties');
    if (savedProperties) {
      const allProperties = JSON.parse(savedProperties);
      // Find the specific property by ID
      const foundProperty = allProperties.find((p: any) => 
        String(p.id) === String(id)
      );
      
      if (foundProperty) {
      console.log("FOUND PROPERTY:", foundProperty);
      console.log("Property coordinates - lat:", foundProperty?.lat, "type:", typeof foundProperty?.lat);
      console.log("Property coordinates - lng:", foundProperty?.lng, "type:", typeof foundProperty?.lng);
        setProperty(foundProperty);
        
        // Load agents and find assigned agent
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

  if (!mounted) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <Loader2 className="w-10 h-10 text-bayt-gold animate-spin" />
    </div>
  );

  if (!property) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <p className="text-bayt-dark font-black italic tracking-widest animate-pulse uppercase">
        Property Not Found - Please try again or check if the property was saved correctly
      </p>
    </div>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('sent'), 1500);
  };

  const calculateROI = (price: string | number) => ((Number(price) * 0.06) / 12).toFixed(2);

  return (
    <div className="min-h-screen bg-white text-bayt-dark pb-20">
      <section className="h-[60vh] md:h-[75vh] bg-black relative border-b-8 border-bayt-gold">
        <VirtualTourViewer tourData={property} language="en" isRTL={false} />
        <div className="absolute top-8 left-8 z-10 bg-bayt-gold text-bayt-dark px-6 py-2 font-black italic uppercase tracking-widest text-[10px]">
          LIVE 360° INTERACTIVE
        </div>
      </section>

      <section className="py-12 container mx-auto px-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-[2px] bg-bayt-gold" />
          <h2 className="text-xl font-black italic uppercase tracking-widest">
            GEOSPATIAL LOCATION
          </h2>
        </div>
        <div className="h-[450px] border border-gray-200 shadow-2xl relative">
          <PropertyMap
            latitude={property.lat}
            longitude={property.long}
            title={property.title}
            zoom={16}
          />
        </div>
      </section>

      <section className="py-20 container mx-auto px-4 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9] mb-6">
                {property.title}
              </h1>
              <div className="flex items-center gap-3 text-bayt-gold font-bold uppercase tracking-widest text-sm">
                <MapPin className="w-4 h-4" /> {property.address}, {property.city}
              </div>
            </div>

            <div className="flex gap-12 border-y border-gray-100 py-12">
              <div className="flex items-center gap-4">
                <Bed className="w-8 h-8 text-bayt-gold" />
                <div>
                  <p className="text-2xl font-black italic">{property.beds}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">BEDS</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Bath className="w-8 h-8 text-bayt-gold" />
                <div>
                  <p className="text-2xl font-black italic">{property.baths}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">BATHS</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <DollarSign className="w-8 h-8 text-bayt-gold" />
                <div>
                  <p className="text-2xl font-black italic">{Number(property.price).toLocaleString()}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">PRICE (AED)</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-6 mb-4 border-b border-gray-200">
                {['description', 'features', 'compliance'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`uppercase font-bold tracking-widest py-2 px-4 ${
                      activeTab === tab ? 'border-b-4 border-bayt-gold text-bayt-dark' : 'text-gray-400'
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="text-gray-600 font-medium leading-relaxed max-w-2xl">
                {activeTab === 'description' && <p>{property.description}</p>}
                {activeTab === 'features' && (
                  <ul className="list-disc pl-6">
                    {property.features?.split(', ').map((f: string, idx: number) => <li key={idx}>{f}</li>)}
                  </ul>
                )}
                {activeTab === 'compliance' && (
                  <div className="space-y-2">
                    <p><span className="font-bold">RERA/Permit:</span> {property.reraNumber || 'N/A'}</p>
                    <p><span className="font-bold">Escrow Required:</span> {property.escrowRequired ? 'Yes' : 'No'}</p>
                    <p><span className="font-bold">Estimated ROI:</span> AED {calculateROI(property.price)} / month</p>
                  </div>
                )}
              </div>
            </div>

            {/* Agent Section */}
            {agent && (
              <div className="pt-12 border-t border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                  <User className="w-6 h-6 text-bayt-gold" />
                  <h3 className="text-xl font-black italic uppercase tracking-widest">
                    LICENSED AGENT
                  </h3>
                  {agent.status === 'verified' && (
                    <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                      <Shield className="w-3 h-3" />
                      VERIFIED
                    </div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 p-6 bg-gray-50 rounded-xl">
                  {agent.photo && (
                    <img
                      src={agent.photo}
                      alt={agent.fullName}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  )}

                  <div className="flex-1">
                    <h4 className="text-2xl font-black italic mb-2">{agent.fullName}</h4>

                    {agent.brokerageName && (
                      <p className="text-bayt-gold font-bold mb-4">
                        {agent.brokerageName.toUpperCase()}
                      </p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-bayt-gold/10 p-2 rounded-lg">
                          <Phone className="w-4 h-4 text-bayt-gold" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase">PHONE</p>
                          <p className="font-medium">{agent.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-bayt-gold/10 p-2 rounded-lg">
                          <Mail className="w-4 h-4 text-bayt-gold" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase">EMAIL</p>
                          <p className="font-medium truncate">{agent.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-white rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-bayt-gold rounded-full" />
                        <p className="text-sm font-bold text-gray-700">RERA LICENSED</p>
                      </div>
                      <p className="font-mono text-lg font-black">{agent.reraNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-bayt-dark text-white p-10 sticky top-24 shadow-[20px_20px_0px_#D4AF37]">
              <h3 className="text-2xl font-black italic uppercase mb-2">Request Dossier</h3>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-8">
                Asset Acquisition Inquiry
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input required type="text" placeholder="NAME" className="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm focus:border-bayt-gold outline-none font-bold" />
                <input required type="email" placeholder="EMAIL" className="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm focus:border-bayt-gold outline-none font-bold" />
                <input required type="tel" placeholder="WHATSAPP NO." className="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm focus:border-bayt-gold outline-none font-bold" />

                <button disabled={formStatus !== 'idle'} className="w-full bg-bayt-gold text-bayt-dark font-black italic uppercase py-5 flex items-center justify-center gap-3 hover:bg-white transition-all disabled:opacity-50">
                  {formStatus === 'sent' ? 'SENT SUCCESSFULLY' : 'ACQUIRE DATA'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
