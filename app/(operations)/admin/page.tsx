'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Gulf-Grade Admin Dashboard</h1>
      <p className="text-gray-600">Quick access to compliance, publishing, and tour verification.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Link href="/(operations)/admin/assets/onboard" className="p-6 bg-blue-50 border rounded hover:bg-blue-100 transition">
          <h2 className="font-bold">Asset Onboarding</h2>
          <p className="text-sm text-gray-500 mt-2">Register new properties Gulf-compliant</p>
        </Link>

        <Link href="/(operations)/admin/assets/compliance" className="p-6 bg-green-50 border rounded hover:bg-green-100 transition">
          <h2 className="font-bold">Asset Compliance</h2>
          <p className="text-sm text-gray-500 mt-2">Track RERA and regulatory approvals</p>
        </Link>

        <Link href="/(operations)/admin/assets/publish" className="p-6 bg-yellow-50 border rounded hover:bg-yellow-100 transition">
          <h2 className="font-bold">Asset Publishing</h2>
          <p className="text-sm text-gray-500 mt-2">Manage Gulf-market property listings</p>
        </Link>

        <Link href="/(operations)/admin/tours/verify" className="p-6 bg-purple-50 border rounded hover:bg-purple-100 transition">
          <h2 className="font-bold">Tour Verification</h2>
          <p className="text-sm text-gray-500 mt-2">Approve 360° virtual tours</p>
        </Link>
      </div>
    </div>
  );
}
