'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-bayt-dark text-white overflow-hidden min-h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bayt1.jpg"
          alt="Gulf luxury real estate skyline"
          fill
          priority
          quality={80}
          className="object-cover opacity-50"
          sizes="100vw"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-bayt-dark to-gray-900" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 py-32 md:py-48">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Sales Enablement for
            <span className="block text-bayt-cool">Gulf Property Developers</span>
          </h1>

          <p className="text-xl md:text-2xl text-bayt-light mb-10 max-w-3xl mx-auto opacity-90">
            A Gulf-first real estate platform concept designed for off-plan projects,
            investor decision-making, and culturally aligned sales workflows.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-bayt-warm text-bayt-dark font-bold rounded-xl hover:bg-yellow-600 transition-all transform hover:-translate-y-1 shadow-2xl"
            >
              <Search className="w-5 h-5" />
              Browse Properties
            </Link>

            <Link
              href="/agents"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-bayt-warm text-bayt-warm font-bold rounded-xl hover:bg-bayt-warm hover:text-bayt-dark transition-all transform hover:-translate-y-1"
            >
              Book a Private Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
