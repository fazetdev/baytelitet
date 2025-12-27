import React from 'react';

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4">Elite Agents Network</h1>
        <p className="text-xl text-gray-600 mb-12">
          Connecting top-tier professionals with premium Gulf real estate opportunities.
        </p>
        
        <div className="max-w-md mx-auto bg-gray-50 p-10 rounded-2xl shadow-sm border border-gray-200">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-[#1A1A1A]">Agent Store</h2>
          <p className="text-gray-600 mb-8">
            Access exclusive marketing materials, virtual tour licenses, and lead generation tools.
          </p>
          <button className="w-full bg-[#B8860B] text-white px-8 py-4 rounded-xl font-bold hover:bg-yellow-800 transition-all">
            Enter Store
          </button>
        </div>
      </div>
    </div>
  );
}
