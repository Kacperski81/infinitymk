import type { Metadata } from "next";
import { Aboreto, Lato, Red_Hat_Text, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

import Logo from "@/components/frame/logo";

const aboreto = Aboreto({
  // sans-serif
  variable: "--font-aboreto",
  subsets: ['latin'],
  weight: '400'
})

const lato = Lato({
  // sans-serif
  variable: "--font-lato",
  subsets: ['latin'],
  weight: '300'
})

const redHatText = Red_Hat_Text({
  // sans-serif
  variable: "--font-red-hat-text",
  subsets: ['latin'],
  weight: '400',
})

const cormorantGaramond = Cormorant_Garamond({
  // serif
  variable: "--font-cormorant-garamond",
  subsets: ['latin'],
  weight: '400',
})


export const metadata: Metadata = {
  title: "InfinityMK Hair, Nails & Beauty Salon | Putney & Wandsworth, London",
  description: "InfinityMK is your premier hair, nail, and beauty salon in Putney and Wandsworth. We offer a full range of services, including expert haircuts, colouring, manicures, pedicures, and professional beauty treatments. Book your appointment today near Putney High Street.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-(--main-400)">
      <body
        className={`${aboreto.variable} ${lato.variable} ${redHatText.variable} ${cormorantGaramond.variable} antialiased`}
      >
        <div className="min-h-screen flex justify-center">
          <div className="relative w-full max-w-[2000px]">
            <Logo />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
