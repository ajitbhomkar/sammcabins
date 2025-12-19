import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/components/Navigation";
import Topbar from "@/components/Topbar";
import TopContactBar from "@/components/TopContactBar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import StructuredData from "@/components/StructuredData";
import GoogleAnalytics from "@/components/GoogleAnalytics";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://saamzgroup.com'),
  title: {
    default: 'SAAM Cabins - Premium Porta Cabins in UAE | Sharjah, Dubai, Abu Dhabi',
    template: '%s | SAAM Cabins UAE',
  },
  description: 'Leading porta cabin manufacturer in UAE. Premium quality portable cabins for offices, security, site offices, and accommodation in Dubai, Sharjah, Abu Dhabi. ISO certified, weather-resistant, custom solutions.',
  keywords: [
    'porta cabin UAE',
    'portable cabins Dubai',
    'porta cabins Sharjah',
    'office cabin UAE',
    'security cabin',
    'site office cabin',
    'prefab cabins Dubai',
    'container office UAE',
    'portable buildings UAE',
    'modular cabins Sharjah',
    'porta cabin manufacturer',
    'porta cabin suppliers UAE',
    'portable accommodation UAE',
    'site office porta cabin',
    'security guard cabin',
    'VIP cabin UAE',
    'toilet unit porta cabin',
    'custom porta cabin Dubai'
  ],
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
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: 'https://saamzgroup.com',
    title: 'SAAM Cabins - Premium Porta Cabins in UAE',
    description: 'Leading porta cabin manufacturer in UAE. Premium quality portable cabins for offices, security, and accommodation.',
    siteName: 'SAAM Cabins',
    images: [
      {
        url: '/images/uploads/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SAAM Cabins - Porta Cabins UAE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAAM Cabins - Premium Porta Cabins in UAE',
    description: 'Leading porta cabin manufacturer in UAE. Quality portable cabins for all needs.',
    images: ['/images/uploads/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://saamzgroup.com',
  },
  verification: {
    google: 'your-google-search-console-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
        <GoogleAnalytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <TopContactBar />
          <Topbar />
          <Navigation />
          <div className="pt-20">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
