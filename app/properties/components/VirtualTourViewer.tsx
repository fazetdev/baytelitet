'use client';

import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture, PerspectiveCamera } from '@react-three/drei';
import { AlertCircle } from 'lucide-react';

// Error Boundary Component
class TourErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full bg-bayt-dark text-white p-4 text-center">
          <AlertCircle className="w-8 h-8 text-bayt-warm mb-2" />
          <p className="text-sm font-bold">360° View Unavailable</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function Scene({ imageUrl }: { imageUrl: string }) {
  const texture = useTexture(imageUrl || '');
  
  return (
    <>
      <ambientLight intensity={1.2} />
      {/* 2 is the numeric constant for THREE.BackSide */}
      <Sphere args={[10, 64, 32]} scale={[1, 1, -1]}>
        <meshBasicMaterial map={texture} side={2} />
      </Sphere>
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        rotateSpeed={-0.4}
        autoRotate={true}
        autoRotateSpeed={0.3}
      />
    </>
  );
}

export default function VirtualTourViewer({ imageUrl }: { imageUrl: string }) {
  if (!imageUrl) return null;

  return (
    <div className="w-full h-full bg-bayt-dark relative overflow-hidden rounded-2xl">
      <TourErrorBoundary>
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center text-white bg-bayt-dark/20 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-bayt-warm"></div>
          </div>
        }>
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 0.1]} />
            <Scene imageUrl={imageUrl} />
          </Canvas>
        </Suspense>
      </TourErrorBoundary>
    </div>
  );
}
