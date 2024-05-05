"use client";

import { NextUIProvider } from "@nextui-org/react";
import Navbar from "@/components/Navbar";
import Leaderboard from "@/components/Leaderboard";
import Hackathons from "@/components/Hackathons";
import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";
import  Scanner  from "@/components/Scanner";

export default function Qr() {
  
  return (
    <NextUIProvider>
      <Navbar />
      <Scanner />
    </NextUIProvider>
  );
}
