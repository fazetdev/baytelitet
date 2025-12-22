'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, MapPin, DollarSign, Home, Percent, ArrowLeft } from 'lucide-react';

export default function AddPropertyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    type: 'villa',
    city: 'dubai',
    description: '',
    latitude: '',
    longitude: '',
    imageUrl: '',
    bedrooms: '',
    bathrooms: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, we just log it. Data management logic comes next.
    console.log('Form Captured:', formData);
    alert('Form is working! Data management logic is next.');
  };

  const inputStyle = "w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-bayt-warm outline-none transition-all";

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="bg-bayt-dark text-white p-8 rounded-b-[3rem] mb-8 shadow-lg">
        <button onClick={() => router.back()} className="mb-4 flex items-center text-bayt-warm text-sm">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>
        <h1 className="text-3xl font-bold">New Property</h1>
        <p className="text-gray-400 mt-2">Draft your next virtual listing</p>
      </div>

      <form onSubmit={handleSubmit} className="container mx-auto px-4 space-y-6">
        <section className="space-y-4">
          <label className="block">
            <span className="text-sm font-bold text-gray-700 ml-2">Property Title</span>
            <input 
              type="text" 
              placeholder="e.g., Luxury Palm Villa"
              className={inputStyle}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required 
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
             <label>
               <span className="text-sm font-bold text-gray-700 ml-2">Price (AED)</span>
               <input 
                 type="number" 
                 className={inputStyle}
                 onChange={(e) => setFormData({...formData, price: e.target.value})}
                 required 
               />
             </label>
             <label>
               <span className="text-sm font-bold text-gray-700 ml-2">City</span>
               <select 
                 className={inputStyle}
                 onChange={(e) => setFormData({...formData, city: e.target.value})}
               >
                 <option value="dubai">Dubai</option>
                 <option value="abu-dhabi">Abu Dhabi</option>
                 <option value="sharjah">Sharjah</option>
               </select>
             </label>
          </div>
        </section>

        <section className="p-6 border-2 border-dashed border-bayt-warm/30 rounded-3xl bg-bayt-warm/5 text-center">
            <Camera className="w-8 h-8 mx-auto text-bayt-warm mb-2" />
            <span className="block font-bold text-bayt-dark mb-2">360° Image Link</span>
            <input 
              type="url" 
              placeholder="https://..."
              className={inputStyle}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              required 
            />
        </section>

        <section className="grid grid-cols-2 gap-4">
           <label>
             <span className="text-sm font-bold text-gray-700 ml-2">Lat</span>
             <input type="text" placeholder="25.11" className={inputStyle} onChange={(e) => setFormData({...formData, latitude: e.target.value})} />
           </label>
           <label>
             <span className="text-sm font-bold text-gray-700 ml-2">Long</span>
             <input type="text" placeholder="55.13" className={inputStyle} onChange={(e) => setFormData({...formData, longitude: e.target.value})} />
           </label>
        </section>

        <button type="submit" className="w-full bg-bayt-dark text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-bayt-dark/20 active:scale-95 transition-transform">
          Verify Form
        </button>
      </form>
    </main>
  );
}
