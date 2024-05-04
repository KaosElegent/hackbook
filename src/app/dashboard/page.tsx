"use client";

// VS code was complaining so I imported it in the other format
//const NextUIProvider = require('@nextui-org/react');
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "@/components/Navbar";
import Leaderboard from "@/components/Leaderboard";

export default function Home() {
  return (
    <NextUIProvider>
      <Navbar />
      <main>
        <Leaderboard />
      </main>
    </NextUIProvider>
  );
}
