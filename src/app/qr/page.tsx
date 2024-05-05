"use client";

import { NextUIProvider } from "@nextui-org/react";
import Navbar from "@/components/Navbar";
import  Scanner  from "@/components/Scanner";

export default function Qr() {
  
  return (
    <NextUIProvider>
      <Navbar />
      <Scanner />
    </NextUIProvider>
  );
}
