'use client';

const stats = [
  { id: 'properties-listed', value: '500+', label: 'Properties Listed' },
  { id: 'asset-value', value: 'AED 2.5B', label: 'Asset Value Managed' },
  { id: 'active-investors', value: '120+', label: 'Active Investors' },
  { id: 'support', value: '24/7', label: 'Support Available' }
];

export default function MarketHighlights() {
  return (
    <section className="py-16 bg-bayt-dark text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.id}>
              <div className="text-3xl md:text-4xl font-bold mb-2 text-bayt-warm">{stat.value}</div>
              <div className="text-bayt-cool">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
