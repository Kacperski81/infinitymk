import type { Metadata } from "next";
import { Aboreto, Lato, Red_Hat_Text } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

import AnimatedMenu from "@/components/frame/animated-menu";
import Frame from "@/components/frame/frame";
import Logo from "@/components/frame/logo";
import Footer from "@/components/footer";
import BookNowFab from "@/components/fab/book-now-fab";
import { ThemeProvider } from "@/components/theme/theme-provider";

const aboreto = Aboreto({
  // sans-serif
  variable: "--font-aboreto",
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

const lato = Lato({
  // sans-serif
  variable: "--font-lato",
  subsets: ['latin'],
  weight: '300',
  display: 'swap',
})

const redHatText = Red_Hat_Text({
  // sans-serif
  variable: "--font-red-hat-text",
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "InfinityMK Hair, Nails & Beauty Salon | Putney & Wandsworth, London",
  description: "InfinityMK is your premier hair, nail, and beauty salon in Putney and Wandsworth. We offer a full range of services, including expert haircuts, colouring, manicures, pedicures, and professional beauty treatments. Book your appointment today near Putney High Street.",
};

// Runs before hydration to restore a saved theme without FOUC.
// Manual choice in localStorage wins, then OS preference, then amber.
const themeInitScript = `
(function(){
  try{
    var t=localStorage.getItem('theme');
    if(t==='dark'){document.documentElement.classList.add('dark');return;}
    if(t==='amber'){return;}
  }catch(e){}
  if(window.matchMedia('(prefers-color-scheme:dark)').matches){
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${aboreto.variable} ${lato.variable} ${redHatText.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="min-h-screen flex justify-center">
            <div className="relative w-full max-w-[2000px]">
              {/* <Logo /> */}
              <Frame />
              <Suspense fallback={null}>
                <AnimatedMenu />
              </Suspense>
              {children}
              {/* <Footer /> */}
            </div>
          </div>
          <BookNowFab />
        </ThemeProvider>
      </body>
    </html>
  );
}
