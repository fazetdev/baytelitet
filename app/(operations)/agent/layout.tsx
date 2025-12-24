'use client';
import React from 'react';

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* The shell is now invisible; it just wraps the content */}
      <div className="max-w-full overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
