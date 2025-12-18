import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

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
  longDescription?: string
}

async function getCabin(id: string): Promise<Cabin | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/admin/content`, {
      cache: 'no-store'
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.cabins.find((cabin: Cabin) => cabin.id === id)
  } catch (error) {
    console.error('Failed to fetch cabin:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const cabin = await getCabin(id)
  
  if (!cabin) {
    return {
      title: 'Cabin Not Found',
    }
  }

  return {
    title: `${cabin.name} - Samm Cabins`,
    description: cabin.description,
  }
}

export default async function CabinDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cabin = await getCabin(id)

  if (!cabin) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-400 hover:text-gray-500">
                  Home
                </Link>
              </li>
              <li>
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
              </li>
              <li>
                <Link href="/cabins" className="text-gray-400 hover:text-gray-500">
                  Cabins
                </Link>
              </li>
              <li>
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
              </li>
              <li className="text-gray-700 font-medium">{cabin.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cabin.images && cabin.images.length > 0 ? (
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="col-span-4 md:col-span-2 md:row-span-2">
              <div className="relative h-96 md:h-full rounded-2xl overflow-hidden">
                <Image
                  src={cabin.images[0]}
                  alt={cabin.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {cabin.images.slice(1, 5).map((image: string, index: number) => (
              <div key={index} className="col-span-2 md:col-span-1">
                <div className="relative h-48 rounded-xl overflow-hidden">
                  <Image
                    src={image}
                    alt={`${cabin.name} ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-8">
            <svg className="w-32 h-32 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{cabin.name}</h1>
              
              {/* Cabin Specifications */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 mb-6 border border-teal-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cabin.bedrooms > 0 && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Rooms</div>
                        <div className="font-semibold text-gray-900">{cabin.bedrooms} Room{cabin.bedrooms > 1 ? 's' : ''}</div>
                      </div>
                    </div>
                  )}
                  {cabin.bathrooms > 0 && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Facilities</div>
                        <div className="font-semibold text-gray-900">{cabin.bathrooms} Toilet{cabin.bathrooms > 1 ? 's' : ''}</div>
                      </div>
                    </div>
                  )}
                  {cabin.size && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Dimensions</div>
                        <div className="font-semibold text-gray-900">{cabin.size}</div>
                      </div>
                    </div>
                  )}
                  {cabin.capacity && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Capacity</div>
                        <div className="font-semibold text-gray-900">Up to {cabin.capacity} People</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="prose max-w-none mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Cabin</h2>
                <p className="text-gray-600 leading-relaxed">
                  {cabin.description}
                </p>
                {cabin.longDescription && (
                  <p className="text-gray-600 leading-relaxed mt-4">
                    {cabin.longDescription}
                  </p>
                )}
              </div>

              {cabin.amenities && cabin.amenities.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {cabin.amenities.map((amenity: string) => (
                      <div key={amenity} className="flex items-center gap-2 text-gray-600">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact/Quote Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Get a Quote</h3>
                {cabin.price && (
                  <div className="text-lg text-gray-600">
                    Starting from <span className="text-3xl font-bold text-teal-600">AED {cabin.price.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <Link
                  href="/contact"
                  className="block w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-center py-4 rounded-lg text-lg font-semibold hover:from-teal-700 hover:to-cyan-700 transition shadow-lg"
                >
                  Request Quote
                </Link>
                
                <a
                  href="tel:+971582012073"
                  className="block w-full border-2 border-teal-600 text-teal-600 text-center py-4 rounded-lg text-lg font-semibold hover:bg-teal-50 transition"
                >
                  📞 Call Us
                </a>
                
                <a
                  href="https://wa.me/971582012073"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border-2 border-green-600 text-green-600 text-center py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition"
                >
                  💬 WhatsApp
                </a>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <h4 className="font-semibold text-gray-900">What&apos;s Included:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Complete electrical fittings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Plug and play installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>UAE safety compliant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Customization available</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Cabins */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/cabins"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to All Cabins
        </Link>
      </div>
    </main>
  )
}
