import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://saamcabins.com'),
  title: {
    default: 'SAAM Cabins - Luxury Mountain Getaway',
    template: '%s | SAAM Cabins',
  },
  description: 'Experience the perfect mountain getaway at SAAM Cabins. Luxurious accommodations with breathtaking views and modern amenities.',
  keywords: ['mountain cabins', 'luxury accommodation', 'vacation rentals', 'mountain getaway', 'SAAM Cabins'],
  authors: [{ name: 'SAAM Cabins' }],
  creator: 'SAAM Cabins',
  publisher: 'SAAM Cabins',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <div className="pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
