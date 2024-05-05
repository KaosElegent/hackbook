import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function Scanner() {
  const [scanResult, setScanResult] = useState<string>('');
  const hackathonId = '663647082d5a5b43774bb3e3';
  const eventName = 'Coding Challenge';
  const router = useRouter();

  const verifyEmail = async (email:string) => {
    const response = await fetch("/api/organizers/add-points", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: hackathonId,
        email: email,
        name: eventName,
      }),
    });
    if (!response.ok) {
        setScanResult(`Error adding points to the user`);
        setTimeout(() => {
            router.refresh();
        }, 3000);
    }
    setScanResult("Successfully Reedemed Points!");
    setTimeout(() => {
        router.back();
    }, 3000);
  }

  

    function onScanSuccess(decodedText:string, decodedResult:Html5QrcodeResult) {
      // handle the scanned code as you like, for example:
      console.log(`Code matched = ${decodedText}`, decodedResult);
      try{
        verifyEmail(decodedText);
      }
      catch(e){
       console.log(e); 
      }
    }
    
    function onScanFailure(error:any) {
      // handle scan failure, usually better to ignore and keep scanning.
      // for example:
      console.warn(`Code scan error = ${error}`);
    }

    useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
    qrbox: {
      width: 250,
      height: 250
    },
      fps: 5,
    },false);
    
    
    scanner.render(onScanSuccess, onScanFailure);
    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div>
      {
        scanResult
        ? <div> {scanResult} </div>
        : <div id="reader" className="w-96"></div>
      }
    </div>
  );
}
