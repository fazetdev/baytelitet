'use client';

const highlights = [
  { label: 'Off-Plan Delivery Rate', value: '85%' },
  { label: 'Golden Visa Eligible', value: '✓' },
  { label: 'Average ROI', value: '7.5%' },
  { label: 'Asset Value Managed', value: 'AED 2.5B' },
];

export default function MarketHighlights() {
  return (
    <section className="py-20 bg-bayt-dark text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">Gulf Market Highlights</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-3xl font-bold mb-2 text-bayt-warm">{item.value}</div>
              <div className="text-bayt-light">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
