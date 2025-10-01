import React from 'react';
import { Suspense } from 'react';
import Hero from '@/components/hero/Hero';

export default function Home() {
  return (
    <Suspense fallback={<div className="w-full h-screen bg-black" />}>
      <Hero />
    </Suspense>
  );
}
