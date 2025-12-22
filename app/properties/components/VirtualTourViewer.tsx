'use client';

import { Globe, AlertCircle, Maximize2 } from 'lucide-react';
import { useState } from 'react';

export default function VirtualTourViewer({ imageUrl }: { imageUrl: string }) {
  const [error, setError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Safe image validation
  const isValidImage = imageUrl && 
    (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) &&
    imageUrl.includes('.');

  if (!isValidImage) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-bayt-dark/90 to-bayt-warm/70 flex flex-col items-center justify-center p-8 text-center">
        <Globe className="w-20 h-20 text-white/60 mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Virtual Tour Preview</h3>
        <p className="text-white/80 max-w-md">Interactive 360° visualization will be available soon</p>
        <div className="mt-6 text-sm text-white/50">
          <AlertCircle className="inline w-4 h-4 mr-2" />
          Image source not configured
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative group">
      {/* Main Image Display */}
      <div className="w-full h-full flex items-center justify-center bg-black">
        <img 
          src={imageUrl}
          alt="Property visual preview"
          className={`w-full h-full object-contain transition-all duration-300 ${
            isExpanded ? 'scale-105' : ''
          }`}
          onError={() => setError(true)}
          loading="lazy"
        />
        
        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-colors"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute bottom-4 left-4 text-white text-sm bg-black/40 px-3 py-1 rounded-full">
            360° Interactive Mode
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 bg-red-900/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center p-8">
            <AlertCircle className="w-12 h-12 text-white mx-auto mb-4" />
            <p className="text-white font-bold">Failed to load image</p>
            <p className="text-white/70 text-sm mt-2">Check the image URL</p>
          </div>
        </div>
      )}
    </div>
  );
}
