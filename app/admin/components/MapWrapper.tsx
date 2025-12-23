'use client';
import dynamic from 'next/dynamic';

// This prevents the "Window is not defined" error during build
const PropertyMap = dynamic(() => import('./PropertyMap'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-white/5 animate-pulse rounded-[2.5rem] flex items-center justify-center">
      <span className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Loading Map Engine...</span>
    </div>
  )
});

export default PropertyMap;
