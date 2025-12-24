'use client';

import { useGulfAssetStore } from '@/store/GulfAssetStore';

interface ComplianceDashboardProps {
  lang: 'en' | 'ar';
}

export default function ComplianceDashboard({ lang }: ComplianceDashboardProps) {
  const { assets } = useGulfAssetStore();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        {lang === 'en' ? 'Compliance Dashboard' : 'لوحة الامتثال'}
      </h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">{lang === 'en' ? 'Title' : 'العنوان'}</th>
            <th className="border p-2">{lang === 'en' ? 'RERA Status' : 'حالة ريـرا'}</th>
            <th className="border p-2">{lang === 'en' ? 'Escrow' : 'الضمان'}</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="border p-2">{asset.title}</td>
              <td className="border p-2">{asset.complianceStatus}</td>
              <td className="border p-2">
                {asset.escrowRequired ? (lang === 'en' ? 'Yes' : 'نعم') : (lang === 'en' ? 'No' : 'لا')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
