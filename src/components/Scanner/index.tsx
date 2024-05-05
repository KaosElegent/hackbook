import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";
import { redirect } from 'next/navigation'

interface ScannerProps {
    id: string;
    name: string;
}

export default function Scanner({id, name}: ScannerProps) {
  const [scanResult, setScanResult] = useState<string>('');
  const [hackathonID, setHackathonID] = useState<string>('');
  const [eventName, setEventName] = useState<string>('');

  const verifyEmail = async (email:string) => {
    console.log("Here are the details: ", id, email, name)
    const response = await fetch("/api/organizers/add-points", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        email: email,
        name: name,
      }),
    });
    if (!response.ok) {
        setScanResult(`Error adding points to the user`);
        setTimeout(() => {
            redirect('/qr');
        }, 3000);
    }
    setScanResult("Successfully Reedemed Points!");
    setTimeout(() => {
        redirect('/dashboard')
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
