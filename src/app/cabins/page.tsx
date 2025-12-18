import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Porta Cabin Solutions - SAAM Cabins',
  description: 'Explore our range of high-quality porta cabins including site offices, security cabins, and ablution units. Custom solutions available across UAE.',
};

const cabins = [
  {
    id: 1,
    name: 'Site Office (12 x 3.6m)',
    description: 'Spacious site office with 2 rooms, pantry, and toilet. Features complete electrical fittings and modern amenities.',
    price: 'Contact for Quote',
    image: '/images/cabins/site-office.jpg',
    amenities: ['2 Rooms', 'Pantry', 'Toilet', 'LED Lighting', 'Power Sockets', 'Data Points'],
  },
  {
    id: 2,
    name: 'Security Cabin (2 x 2m)',
    description: 'Standard fire-rated security cabin with complete electrical fittings and professional-grade construction.',
    price: 'Contact for Quote',
    image: '/images/cabins/security-cabin.jpg',
    amenities: ['LED Lighting', 'Power Sockets', 'Data Points', 'Outdoor Light', 'Split AC Optional', 'Plug & Play'],
  },
  {
    id: 3,
    name: 'Ablution Unit (6 x 3.6m)',
    description: 'Complete ablution unit with multiple toilets and shower facilities. Includes all sanitary fittings and electrical installations.',
    price: 'Contact for Quote',
    image: '/images/cabins/toilet-unit.jpg',
    amenities: ['Multiple Units', 'Washbasins', 'Exhaust Fans', 'LED Lighting', 'Water Connection', 'Drainage System'],
  },
];

export default function Cabins() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white pt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Porta Cabin Solutions
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We provide high-quality porta cabins manufactured in our Sharjah facility. From site offices to security cabins, we deliver custom solutions across UAE.
            </p>
          </div>

          <div className="mt-16 space-y-20">
            {cabins.map((cabin) => (
              <div key={cabin.id} className="relative isolate flex flex-col gap-8 lg:flex-row">
                <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                  <img
                    src={cabin.image}
                    alt={cabin.name}
                    className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div>
                  <div className="flex items-center gap-x-4 text-xs">
                    <span className="text-gray-500">{cabin.price}</span>
                  </div>
                  <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                      <span className="absolute inset-0" />
                      {cabin.name}
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-gray-600">{cabin.description}</p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                    {cabin.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
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