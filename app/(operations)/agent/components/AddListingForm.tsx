'use client';
import React, { useState } from 'react';
import { Building2, MapPin, BadgePercent, FileText, Camera, Save } from 'lucide-react';
import { useGulfAssetStore } from '@/lib/stores/gulfAssetStore';
import { useAgents } from '@/app/context/useAgents';

export default function AddListingForm({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(false);
  const { addProperty } = useGulfAssetStore();
  const { agents } = useAgents();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Get the first verified agent to act as the "current user"
    const currentAgent = agents.find(a => a.status === 'verified') || agents[0];

    const newProperty = {
      title: data.title as string,
      price: Number(data.price),
      currency: 'AED',
      city: 'Dubai', // Default or could be a field
      type: data.type as string,
      complianceStatus: 'pending', // Requires admin verification
      agentId: currentAgent?.id || 'anonymous',
      agentName: currentAgent?.fullName || 'Unassigned Agent',
      details: {
        sqft: Number(data.size),
        permitNumber: data.permitNumber as string,
        permitExpiry: data.permitExpiry as string,
        developer: data.developer as string
      }
    };

    // SAVE TO STORE
    addProperty(newProperty as any);

    setTimeout(() => {
      setLoading(false);
      onComplete();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-[#D4AF37] font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
            <Building2 className="w-4 h-4" /> Property Identity
          </h3>
          <div className="space-y-4">
            <input name="title" required placeholder="Property Title" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-[#D4AF37] outline-none" />
            <select name="type" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none appearance-none">
              <option value="Ready">Ready to Move</option>
              <option value="Off-Plan">Off-Plan</option>
            </select>
            <div className="grid grid-cols-2 gap-4">
              <input name="price" type="number" required placeholder="Price (AED)" className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none" />
              <input name="size" type="number" required placeholder="Sq.Ft" className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-[#D4AF37] font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
            <FileText className="w-4 h-4" /> Legal Compliance
          </h3>
          <div className="space-y-4">
            <input name="permitNumber" required placeholder="Trakheesi Permit Number" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none" />
            <input name="permitExpiry" type="date" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none" />
            <input name="developer" placeholder="Developer" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none" />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button type="button" onClick={onComplete} className="px-8 py-4 rounded-2xl text-xs font-black uppercase text-gray-400">Cancel</button>
        <button type="submit" disabled={loading} className="bg-[#D4AF37] text-black px-12 py-4 rounded-2xl font-black uppercase text-xs flex items-center gap-3 disabled:opacity-50">
          {loading ? 'Publishing...' : <><Save className="w-4 h-4" /> Publish Listing</>}
        </button>
      </div>
    </form>
  );
}
