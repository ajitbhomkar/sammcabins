'use client'

import { useEffect, useState } from 'react'
import { PlusIcon, TrashIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline'
import ImageUpload from '@/components/admin/ImageUpload'
import type { GalleryImage } from '@/types/admin'
import Image from 'next/image'

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [showUpload, setShowUpload] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Exterior'
  })

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
    setUploadedImages(urls)
    setShowUpload(false)
    setShowForm(true)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create gallery image entries for uploaded images
    for (const url of uploadedImages) {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          type: 'gallery',
          data: {
            id: `gallery-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: formData.title,
            description: formData.description,
            category: formData.category,
            image: url,
          },
        }),
      })
    }
    
    // Reset form
    setShowForm(false)
    setUploadedImages([])
    setFormData({ title: '', description: '', category: 'Exterior' })
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

      {/* Image Details Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Add Image Details</h3>
              <button
                onClick={() => {
                  setShowForm(false)
                  setUploadedImages([])
                  setFormData({ title: '', description: '', category: 'Exterior' })
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
              {/* Preview uploaded images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Uploaded Images ({uploadedImages.length})
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {uploadedImages.map((url, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                      <Image src={url} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" width={500} height={500} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 text-gray-900"
                  placeholder="e.g., VIP Cabin Exterior"
                />
              </div>

              {/* Description Input */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 text-gray-900"
                  placeholder="e.g., Premium VIP porta cabin exterior view showcasing modern design..."
                />
              </div>

              {/* Category Select */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 text-gray-900"
                >
                  <option value="Exterior">Exterior</option>
                  <option value="Interior">Interior</option>
                  <option value="Amenities">Amenities</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setUploadedImages([])
                    setFormData({ title: '', description: '', category: 'Exterior' })
                  }}
                  className="px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm"
                >
                  Save Image Details
                </button>
              </div>
            </form>
          </div>
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
              <Image
                src={image.image}
                alt={image.title || 'Gallery image'}
                className="h-full w-full object-cover rounded-lg"
                width={500}
                height={500}
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
              {image.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-2 rounded-b-lg">
                  <div className="font-semibold">{image.title}</div>
                  {image.description && (
                    <div className="text-gray-300 truncate">{image.description}</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
