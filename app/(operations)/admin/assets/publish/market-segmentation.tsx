'use client';

interface MarketSegmentationProps {
  lang: 'en' | 'ar';
}

export default function MarketSegmentation({ lang }: MarketSegmentationProps) {
  const markets = [
    { region: 'UAE', status: '✅ Approved' },
    { region: 'KSA', status: '⏳ Pending' },
    { region: 'Qatar', status: '⚠️ Pending' }
  ];

  return (
    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
      <h2 className="text-xl font-semibold mb-2">{lang === 'en' ? 'Market Segmentation' : 'تقسيم السوق'}</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">{lang === 'en' ? 'Region' : 'المنطقة'}</th>
            <th className="border-b p-2">{lang === 'en' ? 'Status' : 'الحالة'}</th>
          </tr>
        </thead>
        <tbody>
          {markets.map((m) => (
            <tr key={m.region}>
              <td className="border-b p-2">{lang === 'en' ? m.region : m.region === 'UAE' ? 'الإمارات' : m.region === 'KSA' ? 'السعودية' : 'قطر'}</td>
              <td className="border-b p-2">{m.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
