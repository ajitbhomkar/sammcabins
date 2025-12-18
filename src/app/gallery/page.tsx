'use client'

import { useState } from 'react'
import { Metadata } from 'next';
import Image from 'next/image'

async function getGalleryImages() {
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
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [images, setImages] = useState<any[]>([])
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  // Load images on client side
  useState(() => {
    getGalleryImages().then((data) => {
      setImages(data)
      setLoading(false)
    })
  })

  const categories = ['all', ...new Set(images.map((img) => img.category))]
  const filteredImages = filterCategory === 'all' 
    ? images 
    : images.filter((img) => img.category === filterCategory)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Gallery
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Explore our stunning collection of cabin photos and discover your perfect retreat.
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                filterCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } shadow-md`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="text-lg text-gray-500">Loading gallery...</div>
          </div>
        ) : filteredImages.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {filteredImages.map((image: any, index: number) => (
              <div
                key={image.id || index}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative aspect-auto">
                    <Image
                      src={image.src}
                      alt={image.alt || 'Gallery image'}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-white font-medium">{image.caption}</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
              <svg className="w-24 h-24 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">No Images Yet</h3>
              <p className="text-xl text-gray-600 mb-8">
                Start uploading beautiful images to showcase your cabins and amenities.
              </p>
              <a
                href="/admin/gallery"
                className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
              >
                Upload Images
              </a>
            </div>
          </div>
        )}
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
              src={selectedImage.src}
              alt={selectedImage.alt || 'Gallery image'}
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
            {selectedImage.caption && (
              <div className="bg-white mt-4 p-4 rounded-lg">
                <p className="text-gray-900 font-medium">{selectedImage.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}