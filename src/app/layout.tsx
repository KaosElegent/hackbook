import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const monty = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HackBook",
  description: "GDSC Hacks projects ...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark my-4">
      <UserProvider>
        <body className={monty.className}>{children}</body>
      </UserProvider>
    </html>
  );
}
