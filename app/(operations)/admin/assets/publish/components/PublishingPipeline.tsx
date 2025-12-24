'use client';

import MarketSegmentation from './MarketSegmentation';
import EscrowActivation from './EscrowActivation';

export default function PublishingPipeline() {
  const pipeline = [
    { step: 'RERA Approval', status: '✅ Complete' },
    { step: 'Escrow Activation', status: '⚠️ Pending' },
    { step: 'Market Distribution', status: '⏳ Scheduled' }
  ];

  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
      <h1 className="text-xl font-bold mb-4">Gulf Publishing Pipeline</h1>
      <ul className="space-y-2">
        {pipeline.map((item) => (
          <li key={item.step} className="flex justify-between bg-gray-50/20 p-2 rounded">
            <span>{item.step}</span>
            <span>{item.status}</span>
          </li>
        ))}
      </ul>
      <MarketSegmentation />
      <EscrowActivation />
    </div>
  );
}
