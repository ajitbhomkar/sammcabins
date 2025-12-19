import Hero from '@/components/Hero'
import HeroSlider from '@/components/HeroSlider'
import Link from 'next/link'
import Image from 'next/image'
import { promises as fs } from 'fs'
import path from 'path'

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

interface FeaturedContent {
  cabins: Cabin[]
  gallery: unknown[]
}

interface Slide {
  id: string
  image: string
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
  order: number
  isActive: boolean
}

async function getFeaturedContent(): Promise<FeaturedContent> {
  try {
    const filePath = path.join(process.cwd(), 'src/data/content.json')
    const fileContents = await fs.readFile(filePath, 'utf8')
    const data = JSON.parse(fileContents)
    return {
      cabins: data.cabins || [],
      gallery: data.gallery || []
    }
  } catch (error) {
    console.error('Failed to load content:', error)
    return { cabins: [], gallery: [] }
  }
}

async function getSlides(): Promise<Slide[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'slides.json')
    const fileContents = await fs.readFile(filePath, 'utf8')
    const slides = JSON.parse(fileContents)
    return slides.filter((slide: Slide) => slide.isActive)
  } catch (error) {
    // Return default slides if file doesn't exist
    return [
      {
        id: '1',
        image: '/images/cabins/cabin1.jpg',
        title: 'Premium Porta Cabins in UAE',
        subtitle: 'SAAM Cabins - Your Trusted Partner',
        buttonText: 'View Our Cabins',
        buttonLink: '/cabins',
        order: 1,
        isActive: true,
      },
      {
        id: '2',
        image: '/images/cabins/cabin2.jpg',
        title: 'Office & Security Cabins',
        subtitle: 'Quality Solutions for Every Need',
        buttonText: 'Explore Products',
        buttonLink: '/cabins',
        order: 2,
        isActive: true,
      },
      {
        id: '3',
        image: '/images/cabins/cabin3.jpg',
        title: 'Fast Delivery Across UAE',
        subtitle: 'Dubai • Sharjah • Abu Dhabi • Ajman',
        buttonText: 'Contact Us',
        buttonLink: '/contact',
        order: 3,
        isActive: true,
      },
    ]
  }
}

export default async function Home() {
  const { cabins } = await getFeaturedContent()
  const slides = await getSlides()
  const featuredCabins = cabins.slice(0, 3)

  return (
    <main>
      {/* Hero Slider */}
      <HeroSlider slides={slides} autoPlayInterval={5000} />
      
      {/* Featured Cabins Section */}
      {featuredCabins.length > 0 ? (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Featured Cabins
              </h2>
              <p className="text-xl text-gray-600">
                Discover our most popular mountain retreats
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCabins.map((cabin) => (
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
                      {cabin.size && (
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                          {cabin.size}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <svg className="w-20 h-20 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                      {cabin.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {cabin.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-700">
                      {cabin.bedrooms > 0 && (
                        <span className="flex items-center gap-1">
                          <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          {cabin.bedrooms} Room{cabin.bedrooms > 1 ? 's' : ''}
                        </span>
                      )}
                      {cabin.bathrooms > 0 && (
                        <span className="flex items-center gap-1">
                          <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {cabin.bathrooms} Toilet{cabin.bathrooms > 1 ? 's' : ''}
                        </span>
                      )}
                      {cabin.capacity > 0 && (
                        <span className="flex items-center gap-1">
                          <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {cabin.capacity} People
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/cabins"
                className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-teal-700 hover:to-cyan-700 transition shadow-lg"
              >
                View All Cabins
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gray-50 rounded-2xl p-12">
              <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Cabins Yet</h3>
              <p className="text-gray-600 mb-6">Add your first cabin from the admin panel to get started</p>
              <Link href="/admin/cabins/new" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Add Cabin
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose SAAM Cabins?
            </h2>
            <p className="text-xl text-gray-600">
              Quality porta cabin solutions for all your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Luxury Cabins</h3>
              <p className="text-gray-600">Modern amenities in a rustic setting with premium comfort</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Prime Location</h3>
              <p className="text-gray-600">Nestled in breathtaking natural beauty with stunning views</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Great Service</h3>
              <p className="text-gray-600">24/7 support for your perfect stay with personal touch</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready for Your Mountain Getaway?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Book your cabin today and create unforgettable memories in nature
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cabins"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              View Available Cabins
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

