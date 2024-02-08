import type { Viewport } from "next";
import { GoogleTagManager } from '@next/third-parties/google'
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <GTM />
    </html>
  );
}

function GTM() {
  const gtmID = process.env.NEXT_PUBLIC_GTM_ID;
  if (gtmID == undefined) {
    return null
  }
  return <GoogleTagManager gtmId={gtmID} />
}