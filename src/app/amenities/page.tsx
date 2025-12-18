import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Features & Specifications - SAAM Cabins',
  description: 'Discover the standard features and specifications of our porta cabins, including electrical fittings, sanitary installations, and customization options.',
};

const amenities = [
  {
    category: 'Electrical Fittings',
    items: [
      {
        name: 'LED Lighting',
        description: 'False ceiling LED lights for energy-efficient illumination throughout the cabin',
        image: '/images/amenities/led-light.jpg',
      },
      {
        name: 'Power & Data',
        description: 'Multiple power sockets and data points for all your connectivity needs',
        image: '/images/amenities/power-socket.jpg',
      },
      {
        name: 'Electrical DB',
        description: 'Professional-grade electrical distribution board with safety features',
        image: '/images/amenities/electrical-db.jpg',
      },
    ],
  },
  {
    category: 'Climate Control',
    items: [
      {
        name: 'Split AC Options',
        description: 'Optional 1.5 ton split AC installation for comfortable temperature control',
        image: '/images/amenities/ac.jpg',
      },
      {
        name: 'Exhaust Fans',
        description: 'High-quality exhaust fans in toilets and wet areas for proper ventilation',
        image: '/images/amenities/fan.jpg',
      },
      {
        name: 'Outdoor Lighting',
        description: 'Outdoor bulk lights for security and visibility',
        image: '/images/amenities/outdoor-light.jpg',
      },
    ],
  },
  {
    category: 'Sanitary Installations',
    items: [
      {
        name: 'Complete Bathroom',
        description: 'WC, washbasin, mirror, paper holder, and towel holder in toilet units',
        image: '/images/amenities/bathroom.jpg',
      },
      {
        name: 'Water Systems',
        description: 'Optional water tank and septic tank installations available',
        image: '/images/amenities/water-tank.jpg',
      },
      {
        name: 'Plumbing',
        description: 'Professional plumbing setup with water and drainage connections',
        image: '/images/amenities/plumbing.jpg',
      },
    ],
  },
];

export default function Amenities() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white pt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Standard Features
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our porta cabins come equipped with high-quality standard features and the flexibility to add optional amenities based on your needs.
            </p>
          </div>

          <div className="mt-16 space-y-20">
            {amenities.map((category, categoryIndex) => (
              <div key={category.category} className="mx-auto max-w-7xl">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
                  {category.category}
                </h2>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {category.items.map((amenity, index) => (
                    <div key={amenity.name} className="relative isolate rounded-2xl bg-white shadow-lg">
                      <div className="relative aspect-[16/9]">
                        <img
                          src={amenity.image}
                          alt={amenity.name}
                          className="absolute inset-0 h-full w-full rounded-t-2xl object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-semibold text-gray-900">{amenity.name}</h3>
                        <p className="mt-2 text-sm text-gray-600">{amenity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}