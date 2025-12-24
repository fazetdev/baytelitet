'use client';

import { useState } from 'react';
import { useGulfAssetStore } from '@/store/GulfAssetStore';

interface PropertyFormProps {
  lang: 'en' | 'ar';
}

export default function PropertyForm({ lang }: PropertyFormProps) {
  const { addAsset } = useGulfAssetStore();
  const [property, setProperty] = useState({
    title: '',
    location: '',
    price: '',
    reraNumber: '',
    escrowRequired: false,
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = property.price > 500000
      ? (lang === 'en' ? 'RERA Tier-1 Approval Required' : 'الموافقة من ريـرا المستوى 1 مطلوبة')
      : (lang === 'en' ? 'Auto-approved' : 'تمت الموافقة تلقائيًا');

    setStatus(validation);
    addAsset({ ...property, complianceStatus: validation });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder={lang === 'en' ? 'Title' : 'العنوان'}
        value={property.title}
        onChange={e => setProperty({ ...property, title: e.target.value })}
        className="input"
      />
      <input
        type="text"
        placeholder={lang === 'en' ? 'Location' : 'الموقع'}
        value={property.location}
        onChange={e => setProperty({ ...property, location: e.target.value })}
        className="input"
      />
      <input
        type="number"
        placeholder={lang === 'en' ? 'Price' : 'السعر'}
        value={property.price}
        onChange={e => setProperty({ ...property, price: Number(e.target.value) })}
        className="input"
      />
      <input
        type="text"
        placeholder={lang === 'en' ? 'RERA Number' : 'رقم ريـرا'}
        value={property.reraNumber}
        onChange={e => setProperty({ ...property, reraNumber: e.target.value })}
        className="input"
      />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={property.escrowRequired}
          onChange={e => setProperty({ ...property, escrowRequired: e.target.checked })}
        />
        <span>{lang === 'en' ? 'Escrow Required' : 'الضمان مطلوب'}</span>
      </label>

      <button type="submit" className="btn-primary">
        {lang === 'en' ? 'Submit' : 'إرسال'}
      </button>

      {status && <p className="mt-2 text-blue-600">{status}</p>}
    </form>
  );
}
