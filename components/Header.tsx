'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calculator, Building, Map, Users, Settings, Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
  { name: 'Properties', path: '/properties', icon: <Building className="w-5 h-5" /> },
  { name: 'Calculator', path: '/calculator', icon: <Calculator className="w-5 h-5" /> },
  { name: 'Tours', path: '/tours', icon: <Map className="w-5 h-5" /> },
  { name: 'Agents', path: '/agents', icon: <Users className="w-5 h-5" /> },
  { name: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">BE</span>
            </div>
            <div>
              <div className="font-bold text-xl text-gray-900">Bayt Elite</div>
              <div className="text-xs text-gray-600">Gulf Sales Enablement</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path || 
                (item.path !== '/' && pathname?.startsWith(item.path));
              
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <div className="py-4">
              <div className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.path || 
                    (item.path !== '/' && pathname?.startsWith(item.path));
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
              
              {/* Mobile Menu Footer */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="px-4">
                  <div className="text-sm text-gray-500 mb-2">Need help?</div>
                  <a 
                    href="tel:+9718001234" 
                    className="block text-blue-600 font-semibold hover:text-blue-700"
                  >
                    +971 800 1234
                  </a>
                  <a 
                    href="mailto:support@baytelite.com" 
                    className="block text-gray-600 text-sm hover:text-gray-900"
                  >
                    support@baytelite.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
