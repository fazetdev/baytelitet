'use client';

export default function ReraApproval() {
  const status = '✅ Complete';

  return (
    <div className="p-4 mb-4 bg-green-50 border border-green-200 rounded">
      <h2 className="text-lg font-semibold">RERA Approval</h2>
      <p>Status: {status}</p>
    </div>
  );
}
