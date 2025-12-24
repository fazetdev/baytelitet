'use client';

export default function ReraApproval() {
  const steps = [
    { step: 'RERA Approval', status: '✅ Complete' },
    { step: 'Documentation Check', status: '⚠️ Pending' }
  ];

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded">
      <h2 className="font-semibold mb-2">RERA Approval</h2>
      <ul className="list-disc ml-5">
        {steps.map((item, idx) => (
          <li key={idx}>{item.step}: {item.status}</li>
        ))}
      </ul>
    </div>
  );
}
