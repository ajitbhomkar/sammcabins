import { Metadata } from 'next';
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Our Cabins - Samm Cabins',
  description: 'Explore our collection of luxury mountain cabins with modern amenities and breathtaking views.',
};

interface Cabin {
  id: string
  name: string
  description: string
  price: number
  capacity: number
  bedrooms: number
  bathrooms: number
  size: string
  amenities: string[]
  featured: boolean
  images: string[]
}

async function getCabins(): Promise<Cabin[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/admin/content`, {
      cache: 'no-store'
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.cabins || []
  } catch (error) {
    console.error('Failed to fetch cabins:', error)
    return []
  }
}

export default async function CabinsPage() {
  const cabins = await getCabins()

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Luxury Cabins
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover your perfect mountain retreat. Each cabin is designed for comfort and tranquility.
          </p>
        </div>
      </div>

      {/* Cabins Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {cabins.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cabins.map((cabin) => (
              <Link
                key={cabin.id}
                href={`/cabins/${cabin.id}`}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {cabin.images && cabin.images[0] ? (
                  <div className="relative h-64 overflow-hidden bg-gray-200">
                    <Image
                      src={cabin.images[0]}
                      alt={cabin.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {cabin.name}
                      </h3>
                      <div className="text-white/90 text-sm">
                        {cabin.size}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <svg className="w-20 h-20 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                )}
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {cabin.description}
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {cabin.bedrooms > 0 && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          <span className="font-medium">{cabin.bedrooms} Room{cabin.bedrooms > 1 ? 's' : ''}</span>
                        </div>
                      )}
                      {cabin.bathrooms > 0 && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium">{cabin.bathrooms} Toilet{cabin.bathrooms > 1 ? 's' : ''}</span>
                        </div>
                      )}
                      {cabin.capacity > 0 && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span className="font-medium">{cabin.capacity} People</span>
                        </div>
                      )}
                      {cabin.size && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                          <span className="font-medium">{cabin.size}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 rounded-lg font-semibold group-hover:from-teal-700 group-hover:to-cyan-700 transition">
                    View Details & Get Quote
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
              <svg className="w-24 h-24 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">No Cabins Available Yet</h3>
              <p className="text-xl text-gray-600 mb-8">
                We&apos;re preparing our beautiful cabins for you. Check back soon or add cabins from the admin panel.
              </p>
              <Link
                href="/admin/cabins/new"
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
              >
                Add Your First Cabin
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Contact us for custom requests or special accommodations
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  )
}