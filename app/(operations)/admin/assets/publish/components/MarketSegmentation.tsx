'use client';

export default function MarketSegmentation() {
  const markets = ['UAE', 'KSA', 'Qatar'];
  return (
    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
      <h2 className="text-lg font-semibold mb-2">Market Segmentation</h2>
      <ul className="list-disc list-inside">
        {markets.map((market) => (
          <li key={market}>{market} - Status: ⏳ Pending</li>
        ))}
      </ul>
    </div>
  );
}
