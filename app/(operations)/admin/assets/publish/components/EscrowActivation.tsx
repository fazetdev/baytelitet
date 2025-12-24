'use client';

export default function EscrowActivation() {
  const status = '⚠️ Pending';

  return (
    <div className="p-4 mb-4 bg-yellow-50 border border-yellow-200 rounded">
      <h2 className="text-lg font-semibold">Escrow Activation</h2>
      <p>Status: {status}</p>
    </div>
  );
}
