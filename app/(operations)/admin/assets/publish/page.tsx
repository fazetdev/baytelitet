'use client';

import ReraApproval from './components/ReraApproval';
import EscrowActivation from './components/EscrowActivation';
import MarketSegmentation from './components/MarketSegmentation';

export default function PublishingWorkflow() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Gulf Publishing Workflow</h1>
      <ReraApproval />
      <EscrowActivation />
      <MarketSegmentation />
    </div>
  );
}
