'use client';

import { useState, FormEvent } from 'react';

interface PropertyFormProps {
  lang: 'en' | 'ar';
  onSubmit?: (data: any) => void;
}

export default function PropertyForm({ lang, onSubmit }: PropertyFormProps) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [stepError, setStepError] = useState('');

  const handleNext = () => {
    if (!title.trim() || price <= 0 || !heroImage) {
      setStepError('Please fill all required fields');
      return;
    }
    setStepError('');
    setStep(step + 1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ title, price, heroImage });
    }
  };

  return (
    <form onSubmit={handleSubmit} role="form">
      {step === 1 && (
        <>
          <label>
            Title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            Price
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </label>

          <label>
            Hero Image
            <input
              type="file"
              onChange={(e) => setHeroImage(e.target.files?.[0] || null)}
            />
          </label>

          {stepError && <p role="alert">{stepError}</p>}

          <button type="button" onClick={handleNext}>
            Next
          </button>
        </>
      )}

      {step > 1 && <button type="submit">Submit</button>}
    </form>
  );
}
