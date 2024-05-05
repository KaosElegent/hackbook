import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StartHere from '@/components/StartHere';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <NextUIProvider>
      <Navbar/>
      <main>
        <Hero />
        <StartHere />
        <Footer />
      </main>
    </NextUIProvider>
  );
}
