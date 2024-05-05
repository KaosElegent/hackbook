"use client";

// VS code was complaining so I imported it in the other format
//const NextUIProvider = require('@nextui-org/react');
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "@/components/Navbar";
import Leaderboard from "@/components/Leaderboard";
import Hackathons from "@/components/Hackathons";

export default function Editing() {
  return (
    <NextUIProvider>
      <Navbar />
      <main className="grid grid-cols-4 gap-4 mt-8">
        <Hackathons />
        <div className="col-span-3">
          <p>editing</p>
          <Leaderboard />
        </div>
      </main>
    </NextUIProvider>
  );
}
