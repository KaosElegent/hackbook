"use client";

import { NextUIProvider } from "@nextui-org/react";
import Navbar from "@/components/Navbar";
import  Scanner  from "@/components/Scanner";
import { useState, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

function SearchParam(){
  const urlParams = useSearchParams();
  const paramString = urlParams.get("id") || "";
  const id = paramString.split("?")[0];
  const name = paramString.split("?")[1].substring(6);
  console.log("Here are the details: ", id, name)
  return <Scanner id={id} name={name}/>
} 

export default function Qr() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    
  return (
    
      <NextUIProvider>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <SearchParam />
        </Suspense>
      </NextUIProvider>
    
  );
}
