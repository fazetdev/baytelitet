'use client';
import React, { useState } from 'react';
import { Building2, MapPin, BadgePercent, FileText, Camera, Save, Loader2 } from 'lucide-react';
import { useProperties } from '@/app/context/useProperties';
import { useAgents } from '@/app/context/useAgents';

export default function AddListingForm({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addProperty } = useProperties();
  const { agents, loading: agentsLoading } = useAgents();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      // Get the first agent to act as the "current user"
      const currentAgent = agents.length > 0 ? agents[0] : null;

      const newProperty = {
        title: data.title as string,
        price: Number(data.price),
        currency: 'AED',
        city: 'Dubai',
        type: data.type as string,
        description: 'New listing added by agent',
        beds: 0,
        baths: 0,
        area: Number(data.size) || 0,
        areaUnit: 'sqft',
        address: 'Address not specified',
        state: 'Dubai',
        country: 'UAE',
        emirate: 'Dubai',
        heroImage: '',
        agentId: currentAgent?.id || '000000000000000000000001',
        agentName: currentAgent?.name || 'Unassigned Agent',
        agentLicense: '',
        commissionRate: 2.0,
        escrowRequired: false,
        offPlan: data.type === 'Off-Plan',
        status: 'draft',
        category: 'sale',
        reraNumber: data.permitNumber as string || 'RERA-PENDING',
        lat: 25.2048,
        lng: 55.2708
      };

      // Save to database via API
      await addProperty(newProperty);
      
      // Success
      onComplete();
    } catch (err) {
      console.error('Failed to add listing:', err);
      setError(err instanceof Error ? err.message : 'Failed to add listing');
    } finally {
      setLoading(false);
    }
  };

  if (agentsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 text-[#D4AF37] animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-[#D4AF37] font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
            <Building2 className="w-4 h-4" /> Property Identity
          </h3>
          <div className="space-y-4">
            <input 
              name="title" 
              required 
              placeholder="Property Title" 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-[#D4AF37] outline-none" 
              disabled={loading}
            />
            <select 
              name="type" 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none appearance-none"
              disabled={loading}
            >
              <option value="Ready">Ready to Move</option>
              <option value="Off-Plan">Off-Plan</option>
            </select>
            <div className="grid grid-cols-2 gap-4">
              <input 
                name="price" 
                type="number" 
                required 
                placeholder="Price (AED)" 
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                disabled={loading}
              />
              <input 
                name="size" 
                type="number" 
                required 
                placeholder="Sq.Ft" 
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-[#D4AF37] font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
            <FileText className="w-4 h-4" /> Legal Compliance
          </h3>
          <div className="space-y-4">
            <input 
              name="permitNumber" 
              required 
              placeholder="Trakheesi Permit Number" 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
              disabled={loading}
            />
            <input 
              name="permitExpiry" 
              type="date" 
              required 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
              disabled={loading}
            />
            <input 
              name="developer" 
              placeholder="Developer" 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
              disabled={loading}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button 
          type="button" 
          onClick={onComplete} 
          className="px-8 py-4 rounded-2xl text-xs font-black uppercase text-gray-400 hover:text-white transition-colors"
          disabled={loading}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={loading} 
          className="bg-[#D4AF37] text-black px-12 py-4 rounded-2xl font-black uppercase text-xs flex items-center gap-3 disabled:opacity-50 hover:bg-[#e6c158] transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Publish Listing
            </>
          )}
        </button>
      </div>
    </form>
  );
}
