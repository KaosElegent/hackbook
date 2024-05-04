"use client";

import { NextUIProvider } from "@nextui-org/react";
import Navbar from "@/components/Navbar";
import Leaderboard from "@/components/Leaderboard";
import Hackathons from "@/components/Hackathons";
import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

export default function Qr() {

  useEffect(() => {
    function onScanSuccess(decodedText:string, decodedResult:Html5QrcodeResult) {
      // handle the scanned code as you like, for example:
      console.log(`Code matched = ${decodedText}`, decodedResult);
    }
    
    function onScanFailure(error:any) {
      // handle scan failure, usually better to ignore and keep scanning.
      // for example:
      console.warn(`Code scan error = ${error}`);
    }
  
    const scanner = new Html5QrcodeScanner('reader', {
    qrbox: {
      width: 250,
      height: 250
    },
      fps: 5,
    },false);
  
    scanner.render(onScanSuccess, onScanFailure);
  }, []);

  return (
    <NextUIProvider>
      <Navbar />
      <div id="reader" className="w-96"></div>
    </NextUIProvider>
  );
}
