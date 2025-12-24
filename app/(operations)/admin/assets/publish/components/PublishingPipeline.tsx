'use client';

export default function PublishingPipeline() {
  const pipeline = [
    { step: 'RERA Approval', status: '✅ Complete' },
    { step: 'Escrow Activation', status: '⚠️ Pending' },
    { step: 'Market Distribution', status: '⏳ Scheduled' }
  ];

  return (
    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
      <h2 className="text-lg font-semibold mb-2">Publishing Pipeline</h2>
      <ul className="list-disc list-inside">
        {pipeline.map((item) => (
          <li key={item.step}>{item.step} - {item.status}</li>
        ))}
      </ul>
    </div>
  );
}
