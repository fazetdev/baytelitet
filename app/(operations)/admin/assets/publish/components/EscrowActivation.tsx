'use client';

export default function EscrowActivation() {
  const status = '⚠️ Pending';
  const activationDate = '2025-12-28';

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded mt-4">
      <h2 className="font-semibold mb-2">Escrow Activation</h2>
      <p>Status: {status}</p>
      <p>Scheduled Activation: {activationDate}</p>
    </div>
  );
}
