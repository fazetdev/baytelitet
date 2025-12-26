'use client';

import AdminDashboard from './components/AdminDashboard';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AdminPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase">Admin Portal</h1>
        <p className="text-gray-600 mt-2">Gulf Real Estate Compliance Dashboard</p>
      </div>
      
      <Suspense fallback={<LoadingSpinner />}>
        <AdminDashboard />
      </Suspense>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Data updates automatically. Last sync times vary by Gulf jurisdiction.
        </p>
      </div>
    </div>
  );
}
