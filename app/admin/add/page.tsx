'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, ArrowLeft, MapPin, Navigation, Home, DollarSign } from 'lucide-react';
import { useProperties } from '@/context/useProperties';

export default function AddPropertyPage() {
  const router = useRouter();
  const { addProperty } = useProperties();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    city: '',
    location: '',
    type: 'villa',
    latitude: '',
    longitude: '',
    imageUrl: '',
    bedrooms: '3',
    bathrooms: '3'
  });

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProp = {
      id: Date.now(),
      title: formData.title,
      location: formData.location || formData.city,
      price: Number(formData.price),
      type: formData.type as any,
      city: formData.city,
      images: [formData.imageUrl || 'https://via.placeholder.com/800x600?text=No+Image'],
      description: `Professional listing in ${formData.city}.`,
      latitude: Number(formData.latitude) || 25.2048,
      longitude: Number(formData.longitude) || 55.2708,
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      virtualTour: true
    };
    
    addProperty(newProp);
    alert('Property Published with GPS Coordinates!');
    router.push('/properties');
  };

  const inputStyle = "w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-bayt-warm transition-all";

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="bg-bayt-dark text-white p-8 rounded-b-[3rem] mb-8">
        <button onClick={() => router.back()} className="mb-4 flex items-center text-bayt-warm"><ArrowLeft className="w-4 h-4 mr-1"/> Back</button>
        <h1 className="text-3xl font-bold">Property Management</h1>
        <p className="text-gray-400">Add detailed listing with 360° assets</p>
      </div>

      <form onSubmit={handleSubmit} className="container mx-auto px-4 space-y-6">
        {/* Photo Capture */}
        <section className="p-6 border-2 border-dashed border-bayt-warm/30 rounded-3xl bg-bayt-warm/5 text-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          {previewImage ? <img src={previewImage} className="w-full h-48 object-cover rounded-2xl shadow-md"/> : <><Camera className="w-12 h-12 mx-auto text-bayt-warm mb-2"/><p className="font-bold text-bayt-dark">Tap to Capture Property Photo</p></>}
          <input type="file" accept="image/*" capture="environment" ref={fileInputRef} hidden onChange={(e) => {
            const reader = new FileReader();
            reader.onload = () => { setPreviewImage(reader.result as string); setFormData({...formData, imageUrl: reader.result as string}); };
            if(e.target.files?.[0]) reader.readAsDataURL(e.target.files[0]);
          }} />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Property Title" className={inputStyle} required onChange={e => setFormData({...formData, title: e.target.value})} />
          <div className="grid grid-cols-2 gap-2">
            <input type="number" placeholder="Price (AED)" className={inputStyle} required onChange={e => setFormData({...formData, price: e.target.value})} />
            <select className={inputStyle} onChange={e => setFormData({...formData, type: e.target.value})}>
              <option value="villa">Villa</option>
              <option value="apartment">Apartment</option>
              <option value="penthouse">Penthouse</option>
              <option value="townhouse">Townhouse</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="City (e.g. Dubai)" className={inputStyle} required onChange={e => setFormData({...formData, city: e.target.value})} />
          <input type="text" placeholder="Exact Location (e.g. Palm Jumeirah)" className={inputStyle} onChange={e => setFormData({...formData, location: e.target.value})} />
        </div>

        {/* GPS COORDINATES */}
        <div className="bg-gray-100 p-6 rounded-[2rem] space-y-4">
          <h3 className="flex items-center gap-2 font-bold text-bayt-dark"><Navigation className="w-4 h-4 text-bayt-warm"/> Map Coordinates</h3>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Latitude (e.g. 25.112)" className={inputStyle} onChange={e => setFormData({...formData, latitude: e.target.value})} />
            <input type="text" placeholder="Longitude (e.g. 55.139)" className={inputStyle} onChange={e => setFormData({...formData, longitude: e.target.value})} />
          </div>
        </div>

        <button type="submit" className="w-full bg-bayt-dark text-white py-6 rounded-3xl font-bold text-lg shadow-xl shadow-bayt-dark/30 active:scale-95 transition-all">
          Publish Professional Listing
        </button>
      </form>
    </main>
  );
}
