'use client';

export default function EscrowActivation() {
  const status = '⚠️ Pending';

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded mt-4">
      <h2 className="font-semibold mb-2">Escrow Activation</h2>
      <p>Status: {status}</p>
    </div>
  );
}
