"use client";

import { NextUIProvider } from "@nextui-org/react";
import Navbar from "@/components/Navbar";
import  Scanner  from "@/components/Scanner";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function Qr() {
    const urlParams = useSearchParams();
    const paramString = urlParams.get("id") || "";
    const id = paramString.split("?")[0];
    const name = paramString.split("?")[1].substring(6);
    console.log("Here are the details: ", id, name)
  return (
    <NextUIProvider>
      <Navbar />
      <Scanner id={id} name={name}/>
    </NextUIProvider>
  );
}
