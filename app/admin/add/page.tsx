'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, MapPin, DollarSign, Home, ArrowLeft, Upload } from 'lucide-react';

export default function AddPropertyPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    type: 'villa',
    city: '', // Now a plain text string
    description: '',
    latitude: '',
    longitude: '',
    imageUrl: '',
    bedrooms: '',
    bathrooms: ''
  });

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        setFormData({ ...formData, imageUrl: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Final Data:', formData);
    alert('Property Ready! Image captured and data stored in memory.');
  };

  const inputStyle = "w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-bayt-warm outline-none transition-all";

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="bg-bayt-dark text-white p-8 rounded-b-[3rem] mb-8 shadow-lg">
        <button onClick={() => router.back()} className="mb-4 flex items-center text-bayt-warm text-sm">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>
        <h1 className="text-3xl font-bold">New Listing</h1>
      </div>

      <form onSubmit={handleSubmit} className="container mx-auto px-4 space-y-6">
        {/* Image Section: Camera or Link */}
        <section className="p-6 border-2 border-dashed border-bayt-warm/30 rounded-3xl bg-bayt-warm/5 text-center">
            {previewImage ? (
              <div className="relative w-full h-48 mb-4 rounded-2xl overflow-hidden">
                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  type="button" 
                  onClick={() => setPreviewImage(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full text-xs"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer py-4"
              >
                <Camera className="w-10 h-10 mx-auto text-bayt-warm mb-2" />
                <span className="block font-bold text-bayt-dark">Tap to Take Photo</span>
              </div>
            )}
            
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              ref={fileInputRef}
              onChange={handleCapture}
              className="hidden"
            />

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">OR PASTE 360° LINK</p>
              <input 
                type="url" 
                placeholder="https://..."
                className={inputStyle}
                onChange={(e) => {
                  setFormData({...formData, imageUrl: e.target.value});
                  setPreviewImage(e.target.value);
                }}
              />
            </div>
        </section>

        <section className="space-y-4">
          <input 
            type="text" 
            placeholder="Property Title" 
            className={inputStyle} 
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required 
          />
          
          <div className="grid grid-cols-2 gap-4">
             <input 
               type="number" 
               placeholder="Price (AED)" 
               className={inputStyle} 
               onChange={(e) => setFormData({...formData, price: e.target.value})}
               required 
             />
             <input 
               type="text" 
               placeholder="City (e.g. Dubai)" 
               className={inputStyle} 
               onChange={(e) => setFormData({...formData, city: e.target.value})}
               required 
             />
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4">
           <input type="text" placeholder="Latitude" className={inputStyle} onChange={(e) => setFormData({...formData, latitude: e.target.value})} />
           <input type="text" placeholder="Longitude" className={inputStyle} onChange={(e) => setFormData({...formData, longitude: e.target.value})} />
        </section>

        <button type="submit" className="w-full bg-bayt-dark text-white py-5 rounded-2xl font-bold text-lg shadow-xl active:scale-95 transition-transform">
          Publish Listing
        </button>
      </form>
    </main>
  );
}
