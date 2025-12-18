import { Metadata } from 'next';
import Image from 'next/image'
import { promises as fs } from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: 'Amenities - Samm Cabins',
  description: 'Discover the premium amenities available at our luxury mountain cabins for a comfortable and memorable stay.',
};

async function getAmenities() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/content.json')
    const fileContents = await fs.readFile(filePath, 'utf8')
    const data = JSON.parse(fileContents)
    return data.amenities || []
  } catch (error) {
    console.error('Failed to load amenities:', error)
    return []
  }
}

interface Amenity {
  id: string
  name: string
  description: string
  category: string
  icon?: string
  image?: string
}

export default async function AmenitiesPage() {
  const amenities = await getAmenities()
  
  // Group amenities by category
  const groupedAmenities = amenities.reduce((acc: Record<string, Amenity[]>, amenity: Amenity) => {
    const category = amenity.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(amenity)
    return acc
  }, {})

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Premium Amenities
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Everything you need for a comfortable and luxurious mountain retreat experience.
          </p>
        </div>
      </div>

      {/* Amenities Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {Object.keys(groupedAmenities).length > 0 ? (
          <div className="space-y-16">
            {Object.entries(groupedAmenities).map(([category, items]) => (
              <div key={category}>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(items as Amenity[]).map((amenity) => (
                    <div
                      key={amenity.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      {amenity.image ? (
                        <div className="relative h-48 overflow-hidden bg-gray-200">
                          <Image
                            src={amenity.image}
                            alt={amenity.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                          <svg className="w-20 h-20 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {amenity.name}
                        </h3>
                        {amenity.description && (
                          <p className="text-gray-600">
                            {amenity.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
              <svg className="w-24 h-24 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">No Amenities Listed</h3>
              <p className="text-xl text-gray-600 mb-8">
                Add amenities from the admin panel to showcase what your cabins offer.
              </p>
              <a
                href="/admin/amenities/new"
                className="inline-block bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition"
              >
                Add First Amenity
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Features Highlight */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Designed for Your Comfort
            </h2>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto">
              Every detail is carefully considered to ensure you have the best possible experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Quality Assured</h3>
              <p className="text-purple-100">All amenities are maintained to the highest standards</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">24/7 Availability</h3>
              <p className="text-purple-100">All essential amenities available round the clock</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Guest Favorites</h3>
              <p className="text-purple-100">Amenities loved by our guests year after year</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}