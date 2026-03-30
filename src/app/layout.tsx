import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "./footer/Footer";
import NavBar from "./navbar/NavBar";

import ReactQueryProvider from "@/hooks/ReactQueryProvider";


const mainFontFamily = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Clothes",
  description: "Clothing store for the modern individual",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    
      <body className={`${mainFontFamily.variable}`}>
      <ReactQueryProvider>
          <NavBar />
          {children}
          <Footer />
      </ReactQueryProvider>
      </body>
    </html>
  );
}
