'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface GalleryImage {
  id: string
  title: string
  description: string
  category: string
  image: string
}

async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/admin/content`, {
      cache: 'no-store'
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.gallery || []
  } catch (error) {
    console.error('Failed to fetch gallery:', error)
    return []
  }
}

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  // Load images on client side
  useEffect(() => {
    getGalleryImages().then((data) => {
      setImages(data)
      setLoading(false)
    })
  }, [])

  const categories = ['all', ...new Set(images.map((img) => img.category))]
  const filteredImages = filterCategory === 'all' 
    ? images 
    : images.filter((img) => img.category === filterCategory)

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Parallax Effect */}
      <div className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-800 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight">
            OUR CABINS
          </h1>
          <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto font-light">
            Discover excellence in every design. Quality craftsmanship meets modern innovation.
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-lg shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                  filterCategory === category
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600"></div>
            <p className="text-lg text-gray-500 mt-4">Loading gallery...</p>
          </div>
        ) : filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image, index: number) => (
              <div
                key={image.id || index}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  {/* Number Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-gradient-to-br from-teal-600 to-cyan-600 text-white w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={image.image}
                      alt={image.title || 'Gallery image'}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Dark overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    
                    {/* Title and Description overlay - shows on hover */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <h4 className="text-2xl font-bold text-white mb-2">
                        {image.title}
                      </h4>
                      {image.description && (
                        <p className="text-white/90 text-sm leading-relaxed">{image.description}</p>
                      )}
                      {image.category && (
                        <span className="inline-block mt-3 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full self-start">
                          {image.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white rounded-3xl shadow-2xl p-16 max-w-2xl mx-auto">
              <div className="w-32 h-32 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-16 h-16 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-4">No Images Yet</h3>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Start uploading beautiful images to showcase your cabins and amenities.
              </p>
              <a
                href="/admin/gallery"
                className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Upload Images
              </a>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Want To Work With Us?
          </h2>
          <p className="text-xl text-teal-100 mb-10">
            Let&apos;s create something amazing together. Hit the button and start your journey.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-teal-600 px-12 py-5 rounded-full text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            Let&apos;s Work Together
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="max-w-5xl max-h-[90vh] overflow-auto">
            <Image
              src={selectedImage.image}
              alt={selectedImage.title || 'Gallery image'}
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
            {selectedImage.description && (
              <div className="bg-white mt-4 p-4 rounded-lg">
                <p className="text-gray-900 font-medium">{selectedImage.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}