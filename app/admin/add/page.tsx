'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, ArrowLeft, Trash2, LayoutDashboard } from 'lucide-react';
import { useProperties } from '@/context/useProperties';

export default function AddPropertyPage() {
  const router = useRouter();
  const { addProperty, properties } = useProperties();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    city: '',
    latitude: '25.2048',
    longitude: '55.2708',
    imageUrl: '',
  });

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProp = {
      id: Date.now(),
      title: formData.title,
      location: formData.city,
      price: Number(formData.price),
      type: 'villa' as any,
      city: formData.city,
      images: [formData.imageUrl || 'https://via.placeholder.com/800x600?text=No+Image'],
      description: 'Portfolio Listing.',
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      bedrooms: 3,
      bathrooms: 3,
      virtualTour: true
    };
    
    addProperty(newProp);
    alert('Property Added to Portfolio!');
    router.push('/properties');
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-bayt-dark text-white p-8 rounded-b-[3rem] mb-6">
        <button onClick={() => router.back()} className="mb-4 flex items-center text-bayt-warm"><ArrowLeft className="w-4 h-4 mr-1"/> Back</button>
        <h1 className="text-3xl font-bold">Management Panel</h1>
        <p className="text-sm text-gray-400 mt-1 italic">Portfolio Mode: Client-side storage enabled.</p>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* FORM SECTION */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-[2rem] shadow-sm">
          <h2 className="text-xl font-bold mb-4">Add New Property</h2>
          <div className="p-6 border-2 border-dashed border-bayt-warm rounded-3xl bg-bayt-warm/5 text-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            {previewImage ? <img src={previewImage} className="w-full h-40 object-cover rounded-xl"/> : <><Camera className="w-10 h-10 mx-auto text-bayt-warm mb-2"/><p className="text-sm font-bold">Capture Photo</p></>}
            <input type="file" accept="image/*" capture="environment" ref={fileInputRef} hidden onChange={(e) => {
              const reader = new FileReader();
              reader.onload = () => { setPreviewImage(reader.result as string); setFormData({...formData, imageUrl: reader.result as string}); };
              if(e.target.files?.[0]) reader.readAsDataURL(e.target.files[0]);
            }} />
          </div>
          
          <input type="text" placeholder="Title (e.g. Palm Villa)" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" required onChange={e => setFormData({...formData, title: e.target.value})} />
          <input type="number" placeholder="Price (AED)" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" required onChange={e => setFormData({...formData, price: e.target.value})} />
          <input type="text" placeholder="City" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" required onChange={e => setFormData({...formData, city: e.target.value})} />
          <button type="submit" className="w-full bg-bayt-dark text-white py-5 rounded-2xl font-bold hover:bg-bayt-warm transition-colors shadow-lg shadow-bayt-dark/20">Publish Listing</button>
        </form>

        {/* LIST SECTION (To show what is already there) */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm">
           <h2 className="text-xl font-bold mb-4">Current Inventory</h2>
           <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {properties.map(p => (
                <div key={p.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold text-sm truncate w-32">{p.title}</p>
                      <p className="text-xs text-gray-500">{p.city}</p>
                    </div>
                  </div>
                  <button onClick={() => alert('Delete logic triggered - this will be synced to DB next')} className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
           </div>
        </div>
      </div>
    </main>
  );
}
