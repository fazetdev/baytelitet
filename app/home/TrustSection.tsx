'use client';

export default function TrustSection() {
  const trustItems = [
    {
      id: 'escrow',
      emoji: '🔒',
      title: 'Escrow Protection',
      description: 'All payments secured through DLD-verified escrow accounts'
    },
    {
      id: 'rera',
      emoji: '📋',
      title: 'RERA Compliance',
      description: 'Full compliance with Gulf real estate regulations'
    },
    {
      id: 'cultural',
      emoji: '🕌',
      title: 'Lifestyle & Community Intelligence',
      description: 'Prayer times, Qibla direction & community layouts'
    }
  ];

  return (
    <section className="py-20 bg-bayt-dark text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-6">Built on Trust & Transparency</h2>
          <p className="text-xl text-bayt-cool">
            Every feature is designed to build confidence in your transactions
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {trustItems.map((item) => (
            <div key={item.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-bayt-cool/50">
              <div className="text-4xl mb-4 text-bayt-warm">{item.emoji}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-bayt-cool">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
