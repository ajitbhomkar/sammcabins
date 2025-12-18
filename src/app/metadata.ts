import { Metadata } from 'next';

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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saamcabins.com',
    title: 'SAAM Cabins - Luxury Mountain Getaway',
    description: 'Experience the perfect mountain getaway at SAAM Cabins. Luxurious accommodations with breathtaking views and modern amenities.',
    siteName: 'SAAM Cabins',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAAM Cabins - Luxury Mountain Getaway',
    description: 'Experience the perfect mountain getaway at SAAM Cabins. Luxurious accommodations with breathtaking views and modern amenities.',
    creator: '@saamcabins',
    site: '@saamcabins',
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
    // Add other verification codes as needed
  },
};