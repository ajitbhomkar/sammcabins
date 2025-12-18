'use client'

import { useEffect, useState } from 'react'
import { PlusIcon, TrashIcon, FunnelIcon } from '@heroicons/react/24/outline'
import ImageUpload from '@/components/admin/ImageUpload'
import type { GalleryImage } from '@/types/admin'

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [showUpload, setShowUpload] = useState(false)

  useEffect(() => {
    loadGallery()
  }, [])

  const loadGallery = async () => {
    try {
      const res = await fetch('/api/admin/content')
      const data = await res.json()
      setImages(data.gallery || [])
    } catch (error) {
      console.error('Failed to load gallery:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteImage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          type: 'gallery',
          id,
        }),
      })

      if (res.ok) {
        loadGallery()
      }
    } catch (error) {
      console.error('Failed to delete image:', error)
    }
  }

  const handleUploadComplete = async (urls: string[]) => {
    // Create gallery image entries for uploaded images
    for (const url of urls) {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          type: 'gallery',
          data: {
            id: `gallery-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            src: url,
            alt: 'Gallery image',
            category: 'Uncategorized',
            caption: '',
            order: images.length,
          },
        }),
      })
    }
    setShowUpload(false)
    loadGallery()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    )
  }

  const categories = ['all', ...new Set(images.map((img) => img.category))]
  const filteredImages = filterCategory === 'all' 
    ? images 
    : images.filter((img) => img.category === filterCategory)

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Gallery</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your image gallery. {images.length} total images.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Upload Images
          </button>
        </div>
      </div>

      {/* Upload Section */}
      {showUpload && (
        <div className="mt-6 bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload New Images</h3>
          <ImageUpload
            value={[]}
            onChange={() => {}}
            onUploadComplete={handleUploadComplete}
            multiple={true}
            folder="gallery"
            label="Upload Gallery Images"
          />
        </div>
      )}

      {/* Filter */}
      <div className="mt-6 flex items-center gap-4">
        <FunnelIcon className="h-5 w-5 text-gray-400" />
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filterCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredImages.length === 0 ? (
        <div className="mt-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No images</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by uploading some images.</p>
          <div className="mt-6">
            <button
              onClick={() => setShowUpload(true)}
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Upload Images
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredImages.map((image) => (
            <div key={image.id} className="group relative aspect-square">
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => deleteImage(image.id)}
                  className="bg-red-600 text-white rounded-full p-2 hover:bg-red-700"
                >
                  <TrashIcon className="h-5 w-5" />
                  <span className="sr-only">Delete</span>
                </button>
              </div>
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 rounded-b-lg">
                  {image.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
