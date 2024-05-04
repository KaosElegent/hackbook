'use client'

// VS code was complaining so I imported it in the other format
//const NextUIProvider = require('@nextui-org/react');
import { NextUIProvider } from '@nextui-org/react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StartHere from '@/components/StartHere';
import About from '@/components/About';

export default function Home() {
  return (
      <NextUIProvider>
        <Navbar />
        <main>
          <Hero/>
          <About />
          <StartHere />
          </main>
      </NextUIProvider>
  );
}
