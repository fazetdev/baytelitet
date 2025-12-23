'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Home, 
  CheckCircle2, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/agent', icon: LayoutDashboard },
    { name: 'Lead Inbox', href: '/agent/leads', icon: Users },
    { name: 'My Listings', href: '/agent/listings', icon: Home },
    { name: 'Deal Pipeline', href: '/agent/pipeline', icon: CheckCircle2 },
  ];

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-white">
      {/* SIDEBAR */}
      <aside className="w-20 lg:w-64 border-r border-white/10 flex flex-col bg-black/50 backdrop-blur-xl fixed h-full z-50">
        <div className="p-6">
          <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center font-black text-black text-xl">
            B
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.2)]' 
                    : 'text-gray-500 hover:bg-white/5 hover:text-[#D4AF37]'
                }`}
              >
                <item.icon className="w-6 h-6 shrink-0" />
                <span className="hidden lg:block font-bold text-sm uppercase tracking-widest italic">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-4 p-4 w-full text-gray-500 hover:text-red-400 transition-colors">
            <LogOut className="w-6 h-6" />
            <span className="hidden lg:block font-bold text-sm uppercase italic">Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 pl-20 lg:pl-64">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
