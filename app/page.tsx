import Link from 'next/link';
import Image from 'next/image';
import { Calculator, Home, Map, Users, Settings, Globe } from 'lucide-react';

// The color definitions have been moved to tailwind.config.js
// We use classes like 'bg-bayt-dark' instead of complex Hex strings

export default function HomePage() {
  const features = [
    {
      icon: <Calculator className="w-8 h-8" />,
      title: 'Dynamic Payment Calculator',
      description: 'Real-time payment plans with Hijri/Gregorian timelines',
      // Financial features use the warm gold accent
      color: 'from-bayt-warm to-yellow-800', 
      href: '/calculator'
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: 'Smart Property Listings',
      description: '360° virtual tours with neighborhood context',
      // Property/Listing features use the cool gray accent
      color: 'from-bayt-cool to-gray-500', 
      href: '/properties'
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: 'Virtual Tours',
      description: 'Interactive 3D property walkthroughs',
      color: 'from-bayt-cool to-gray-500', 
      href: '/tours'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Cultural Intelligence',
      description: 'Prayer times, Qibla direction & Ramadan modes',
      // Cultural features use the dedicated green accent
      color: 'from-bayt-cultural to-emerald-700', 
      href: '/settings'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Agent Dashboard',
      description: 'Lead tracking & analytics for developers',
      // Agent/Sales features use the warm gold accent
      color: 'from-bayt-warm to-yellow-800', 
      href: '/agents'
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: 'Market Tools',
      description: 'Golden Visa checker, rental yield calculator',
      color: 'from-bayt-warm to-yellow-800', 
      href: '/settings'
    }
  ];

  const stats = [
    { value: '500+', label: 'Properties Listed' },
    { value: 'AED 2.5B', label: 'Transaction Volume' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Uses Image with Dark Overlay */}
      <section className="relative bg-bayt-dark text-white overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/bayt1.jpg"
          alt="Luxury Dubai interior with skyline view"
          layout="fill"
          objectFit="cover"
          quality={80}
          className="z-0"
        />
        {/* Dark Overlay (Primary Dark Color with Opacity) */}
        <div className="absolute inset-0 bg-bayt-dark opacity-80 z-10"></div>
        
        <div className="relative z-20 container mx-auto px-6 py-32 md:py-48">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Redefining Real Estate
              <span className="block text-bayt-cool">in the Gulf Region</span>
            </h1>
            <p className="text-xl md:text-2xl text-bayt-light mb-10 max-w-3xl mx-auto opacity-90">
              Bayt Elite combines cutting-edge technology with deep cultural understanding
              to deliver the ultimate sales enablement platform for Gulf developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/properties"
                className="px-8 py-4 bg-bayt-warm text-bayt-dark font-bold rounded-xl hover:bg-opacity-90 transition-all transform hover:-translate-y-1 shadow-2xl"
              >
                Explore Properties
              </Link>
              <Link 
                href="/calculator"
                className="px-8 py-4 bg-transparent border-2 border-bayt-warm text-bayt-warm font-bold rounded-xl hover:bg-bayt-warm hover:text-bayt-dark transition-all transform hover:-translate-y-1"
              >
                Try Calculator
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative z-20 bg-bayt-dark/70 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-bayt-warm">{stat.value}</div>
                  <div className="text-bayt-cool">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-bayt-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-bayt-dark mb-4">
              Complete Sales Enablement Suite
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to sell properties faster and smarter in the Gulf market
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link 
                key={index} 
                href={feature.href}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:border-bayt-warm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-bayt-dark mb-3 group-hover:text-bayt-warm">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <div className="text-bayt-warm font-semibold flex items-center gap-2">
                    Explore feature
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Transparency Section */}
      <section className="py-20 bg-bayt-dark text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Built on Trust & Transparency
            </h2>
            <p className="text-xl text-bayt-cool mb-12">
              Every feature is designed to build confidence in your transactions
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-bayt-cool/50">
                <div className="text-4xl mb-4 text-bayt-warm">🔒</div>
                <h3 className="text-xl font-bold mb-3">Escrow Protection</h3>
                <p className="text-bayt-cool">All payments secured through regulated escrow accounts</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-bayt-cool/50">
                <div className="text-4xl mb-4 text-bayt-warm">📋</div>
                <h3 className="text-xl font-bold mb-3">RERA Compliance</h3>
                <p className="text-bayt-cool">Full compliance with Gulf real estate regulations</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-bayt-cool/50">
                <div className="text-4xl mb-4 text-bayt-cultural">🕌</div>
                <h3 className="text-xl font-bold mb-3">Cultural Integration</h3>
                <p className="text-bayt-cool">Prayer times, Qibla direction & Islamic financing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              className="px-8 py-4 bg-bayt-dark text-bayt-warm font-bold rounded-xl hover:bg-opacity-90 transition-all shadow-2xl"
            >
              Browse Properties
            </Link>
            <Link 
              href="/agents"
              className="px-8 py-4 bg-transparent border-2 border-bayt-dark text-bayt-dark font-bold rounded-xl hover:bg-white/10 transition-all"
            >
              Agent Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
