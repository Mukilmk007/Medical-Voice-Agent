import type { Metadata } from "next";
import { Geist, Geist_Mono,Outfit } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClinIQ AI",
  description: "AI powered medical voice agent",
};

const outfit = Outfit({ subsets: ['latin']})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased ${outfit.className}`}
        >
          <Provider>
            {children}
            <Toaster />
          </Provider>
          
        </body>
      </html>
    </ClerkProvider>
    
  );
}
