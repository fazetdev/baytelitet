'use client';

import { useState, useEffect } from 'react';
import PropertyForm from '@/components/PropertyForm';
import { useGulfAssetStore } from '@/lib/stores/gulfAssetStore';

export default function TestPropertyIntegration() {
  const { properties, loading, error, loadProperties, clearError } = useGulfAssetStore();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  const handleSuccess = () => {
    setShowForm(false);
    loadProperties();
    alert('Property submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Property Integration Test</h1>
          <p className="text-gray-600 mt-2">Testing API integration for Gulf Property Form</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Controls and Status */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Controls</h2>
              <div className="space-y-4">
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  {showForm ? 'Hide Form' : 'Show Property Form'}
                </button>

                <button
                  onClick={loadProperties}
                  disabled={loading}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Refresh Properties'}
                </button>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <p className="text-red-800 font-medium">Error:</p>
                      <button onClick={clearError} className="text-red-600 hover:text-red-800 text-sm">
                        Dismiss
                      </button>
                    </div>
                    <p className="text-red-600 text-sm mt-1">{error}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Form or Properties List */}
          <div className="lg:col-span-2">
            {showForm ? (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">Property Form</h2>
                  <p className="text-gray-600 mt-1">Fill out all 5 steps with Gulf-compliant data</p>
                </div>
                <div className="p-4">
                  <PropertyForm lang="en" onSuccess={handleSuccess} />
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Properties</h2>
                {loading ? (
                  <p>Loading properties...</p>
                ) : properties.length === 0 ? (
                  <p>No properties yet.</p>
                ) : (
                  <ul>
                    {properties.map((p) => (
                      <li key={p.id}>
                        {p.title} - {p.price} {p.currency} ({p.city})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
