'use client';

export default function MarketSegmentation() {
  const markets = [
    { name: 'UAE', status: '✅ Active' },
    { name: 'KSA', status: '⏳ Pending' },
    { name: 'Qatar', status: '⚠️ Scheduled' }
  ];

  return (
    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded space-y-2">
      <h2 className="text-xl font-semibold">Market Segmentation</h2>
      {markets.map((m) => (
        <div key={m.name} className="flex justify-between">
          <span>{m.name}</span>
          <span>{m.status}</span>
        </div>
      ))}
    </div>
  );
}
