'use client';

import Link from 'next/link';
import { useUserRole } from '@/context/useUserRole';

export default function CTASection() {
  const { role } = useUserRole();

  const primaryCTA = (() => {
    switch (role) {
      case 'buyer':
        return { label: 'Browse Luxury Properties', href: '/properties' };
      case 'investor':
        return { label: 'Analyze Returns & Yields', href: '/calculator' };
      case 'developer':
        return { label: 'Access Developer Dashboard', href: '/agents' };
      case 'agent':
        return { label: 'Manage Leads & Listings', href: '/agents' };
      default:
        return { label: 'Explore Bayt Elite', href: '/properties' };
    }
  })();

  const secondaryCTA = (() => {
    switch (role) {
      case 'developer':
      case 'agent':
        return { label: 'View Platform Capabilities', href: '/agents' };
      default:
        return { label: 'Explore Investment Tools', href: '/calculator' };
    }
  })();

  const roleMessage = role
    ? `Tailored for ${role.charAt(0).toUpperCase() + role.slice(1)}s`
    : 'Choose your role above for a personalized experience';

  return (
    <section className="py-20 bg-gradient-to-r from-bayt-dark via-gray-900 to-bayt-dark text-white">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Elevate Your Gulf Real Estate Strategy?
          </h2>

          <p className="text-xl text-bayt-cool mb-4">
            {roleMessage}
          </p>

          <p className="text-bayt-light opacity-90 mb-10 max-w-2xl mx-auto">
            Bayt Elite is built specifically for Gulf real estate — combining luxury, compliance, and sales intelligence.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href={primaryCTA.href}
              className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-bayt-warm to-yellow-700 text-bayt-dark font-bold rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 shadow-xl min-w-[220px]"
              aria-label={primaryCTA.label}
            >
              {primaryCTA.label}
            </Link>

            <Link
              href={secondaryCTA.href}
              className="inline-flex items-center justify-center px-10 py-4 bg-transparent border-2 border-bayt-warm text-bayt-warm font-bold rounded-xl hover:bg-bayt-warm hover:text-bayt-dark transition-all duration-300 min-w-[220px]"
              aria-label={secondaryCTA.label}
            >
              {secondaryCTA.label}
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t border-white/20">
            <p className="text-bayt-cool text-sm">
              Trusted by Gulf-focused developers, investors, and real estate professionals
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
