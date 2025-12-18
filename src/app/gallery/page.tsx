import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Product Gallery - SAAM Cabins',
  description: 'Browse our gallery of high-quality porta cabins including site offices, security cabins, toilet units, and custom solutions.',
};

const galleryImages = [
  {
    src: '/images/gallery/office-1.jpg',
    alt: 'Site Office with 2 rooms, pantry, and toilet (12 x 3.6m)',
    category: 'Site Offices',
  },
  {
    src: '/images/gallery/office-2.jpg',
    alt: 'Open hall office space (12 x 3.6m)',
    category: 'Site Offices',
  },
  {
    src: '/images/gallery/security-1.jpg',
    alt: 'Standard Fire Rated Security Cabin (2 x 2m)',
    category: 'Security Cabins',
  },
  {
    src: '/images/gallery/security-2.jpg',
    alt: 'Security Cabin with attached toilet (3 x 3m)',
    category: 'Security Cabins',
  },
  {
    src: '/images/gallery/toilet-1.jpg',
    alt: 'Single Toilet Unit (1.5 x 1.5m)',
    category: 'Toilet Units',
  },
  {
    src: '/images/gallery/toilet-2.jpg',
    alt: 'Ablution Unit with multiple toilets (12 x 3.6m)',
    category: 'Toilet Units',
  },
  {
    src: '/images/gallery/interior-1.jpg',
    alt: 'Interior view of office cabin with furnishings',
    category: 'Interiors',
  },
  {
    src: '/images/gallery/custom-1.jpg',
    alt: 'Custom porta cabin solution for specific requirements',
    category: 'Custom Solutions',
  },
];

export default function Gallery() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white pt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Product Gallery
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Explore our range of high-quality porta cabins manufactured at our Sharjah facility. Custom solutions available.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image) => (
                <div key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 hover:bg-opacity-30">
                    <div className="absolute bottom-4 left-4">
                      <span className="rounded-full bg-white/70 px-3 py-1 text-sm font-medium text-gray-900 backdrop-blur-sm">
                        {image.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}