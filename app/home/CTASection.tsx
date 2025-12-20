'use client';

import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-bayt-warm to-yellow-800">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-bayt-dark mb-6">
          Ready to Transform Your Property Sales?
        </h2>
        <p className="text-xl text-bayt-dark opacity-90 mb-10 max-w-2xl mx-auto">
          Join leading Gulf developers who trust Bayt Elite for their sales enablement needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/properties"
            className="inline-flex items-center justify-center px-8 py-4 bg-bayt-dark text-bayt-warm font-bold rounded-xl hover:bg-opacity-90 transition-all shadow-2xl"
          >
            Browse Properties
          </Link>
          <Link 
            href="/agents"
            className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-bayt-dark text-bayt-dark font-bold rounded-xl hover:bg-white/10 transition-all"
          >
            Agent Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
