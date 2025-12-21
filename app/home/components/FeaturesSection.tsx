'use client';

import Link from 'next/link';
import { Calculator, Home, Globe, Users } from 'lucide-react';

interface Feature {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
  href: string;
}

const features: Feature[] = [
  {
    id: 'calculator',
    icon: <Calculator className="w-8 h-8" />,
    title: 'Dynamic Payment Calculator',
    description: 'Real-time payment plans with Hijri/Gregorian timelines',
    color: 'from-bayt-warm to-yellow-800',
    href: '/calculator',
  },
  {
    id: 'smart-property',
    icon: <Home className="w-8 h-8" />,
    title: 'Smart Property Listings',
    description: '360° virtual tours included by default',
    color: 'from-bayt-cool to-gray-500',
    href: '/properties',
  },
  {
    id: 'lifestyle-intel',
    icon: <Globe className="w-8 h-8" />,
    title: 'Lifestyle & Community Intelligence',
    description: 'Privacy, Majlis layouts, Masjid proximity, and local amenities',
    color: 'from-bayt-cultural to-emerald-700',
    href: '/settings',
  },
  {
    id: 'agent-dashboard',
    icon: <Users className="w-8 h-8" />,
    title: 'Agent Dashboard',
    description: 'Lead tracking & analytics for developers',
    color: 'from-bayt-warm to-yellow-800',
    href: '/agents',
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-bayt-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-bayt-dark mb-4">Complete Sales Enablement Suite</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to sell properties faster and smarter in the Gulf market
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link key={feature.id} href={feature.href} className="group block">
              <div className={`bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:border-bayt-warm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full`}>
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-bayt-dark mb-3 group-hover:text-bayt-warm">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="text-bayt-warm font-semibold flex items-center gap-2">
                  Explore feature <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
