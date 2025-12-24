'use client';

export default function RERAPublication() {
  const status = '✅ Complete';
  const publicationDate = '2025-12-20';

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded mt-4">
      <h2 className="font-semibold mb-2">RERA Approval</h2>
      <p>Status: {status}</p>
      <p>Publication Date: {publicationDate}</p>
    </div>
  );
}
