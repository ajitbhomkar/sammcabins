'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import ImageUpload from '@/components/admin/ImageUpload'
import type { Cabin } from '@/types/admin'

export default function EditCabinPage() {
  const router = useRouter()
  const params = useParams()
  const cabinId = params.id as string
  
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [formData, setFormData] = useState<Partial<Cabin>>({
    name: '',
    description: '',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    price: 0,
    pricePerNight: 0,
    images: [],
    amenities: [],
  })

  useEffect(() => {
    loadCabin()
  }, [cabinId])

  const loadCabin = async () => {
    try {
      const res = await fetch('/api/admin/content')
      const data = await res.json()
      const cabin = data.cabins?.find((c: Cabin) => c.id === cabinId)
      
      if (cabin) {
        setFormData(cabin)
      } else {
        alert('Cabin not found')
        router.push('/admin/cabins')
      }
    } catch (error) {
      console.error('Failed to load cabin:', error)
      alert('Failed to load cabin')
    } finally {
      setInitialLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          type: 'cabin',
          id: cabinId,
          data: formData,
        }),
      })

      if (res.ok) {
        router.push('/admin/cabins')
      } else {
        alert('Failed to update cabin')
      }
    } catch (error) {
      console.error('Failed to update cabin:', error)
      alert('Failed to update cabin')
    } finally {
      setLoading(false)
    }
  }

  const removeImage = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images?.filter((img: string) => img !== url) || [],
    }))
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">Loading cabin...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900">
            Edit Cabin: {formData.name}
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button
            type="button"
            onClick={() => router.push('/admin/cabins')}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Cabin Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                id="description"
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                  Capacity (People)
                </label>
                <input
                  type="number"
                  id="capacity"
                  min="1"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price (AED)
                </label>
                <input
                  type="number"
                  id="price"
                  min="0"
                  value={formData.price || formData.pricePerNight || 0}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value), pricePerNight: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                  Rooms
                </label>
                <input
                  type="number"
                  id="bedrooms"
                  min="0"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
                  Toilets
                </label>
                <input
                  type="number"
                  id="bathrooms"
                  min="0"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                  Size / Dimensions
                </label>
                <input
                  type="text"
                  id="size"
                  placeholder="e.g., 20ft x 8ft or 12 x 3.6 meter"
                  value={formData.size || ''}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="featured" className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Featured Cabin</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
          
          <div>
            <label htmlFor="amenities" className="block text-sm font-medium text-gray-700 mb-2">
              Amenities (one per line)
            </label>
            <textarea
              id="amenities"
              rows={6}
              value={Array.isArray(formData.amenities) ? formData.amenities.join('\n') : ''}
              onChange={(e) => setFormData({ ...formData, amenities: e.target.value.split('\n').filter(Boolean) })}
              placeholder="Air Conditioning&#10;WiFi Internet&#10;24/7 Security&#10;Parking Space"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            />
            <p className="mt-2 text-sm text-gray-500">Enter each amenity on a new line</p>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Images</h3>
          
          <ImageUpload
            value={formData.images}
            onChange={(value) => setFormData({ ...formData, images: Array.isArray(value) ? value : [value] })}
            multiple={true}
            folder="cabins"
            label="Upload Cabin Images"
          />

          {formData.images && formData.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {formData.images.map((url: string, index: number) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Cabin ${index + 1}`}
                    className="h-24 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push('/admin/cabins')}
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
