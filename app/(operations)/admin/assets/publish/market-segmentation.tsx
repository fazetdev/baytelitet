'use client';

export default function MarketSegmentation() {
  const markets = [
    { nameEn: 'UAE', nameAr: 'الإمارات', status: 'Active' },
    { nameEn: 'KSA', nameAr: 'السعودية', status: 'Pending' },
    { nameEn: 'Qatar', nameAr: 'قطر', status: 'Scheduled' }
  ];

  return (
    <div className="p-8 bg-gray-50 rounded-lg space-y-4">
      <h2 className="text-xl font-bold mb-4">Market Segmentation</h2>
      {markets.map((m, idx) => (
        <div key={idx} className="flex justify-between p-4 bg-white border rounded">
          <span>{m.nameEn} / {m.nameAr}</span>
          <span>{m.status}</span>
        </div>
      ))}
    </div>
  );
}
