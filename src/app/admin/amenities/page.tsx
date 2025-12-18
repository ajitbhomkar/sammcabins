'use client'

import { useEffect, useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import type { Amenity } from '@/types/admin'

export default function AmenitiesPage() {
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAmenities()
  }, [])

  const loadAmenities = async () => {
    try {
      const res = await fetch('/api/admin/content')
      const data = await res.json()
      setAmenities(data.amenities || [])
    } catch (error) {
      console.error('Failed to load amenities:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteAmenity = async (id: string) => {
    if (!confirm('Are you sure you want to delete this amenity?')) return

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          type: 'amenity',
          id,
        }),
      })

      if (res.ok) {
        loadAmenities()
      }
    } catch (error) {
      console.error('Failed to delete amenity:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    )
  }

  const groupedAmenities = amenities.reduce((acc, amenity) => {
    const category = amenity.category || 'Other'
    if (!acc[category]) acc[category] = []
    acc[category].push(amenity)
    return acc
  }, {} as Record<string, Amenity[]>)

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Amenities</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage amenities available at your cabins.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <a
            href="/admin/amenities/new"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <PlusIcon className="inline-block h-5 w-5 mr-1 -mt-1" />
            Add Amenity
          </a>
        </div>
      </div>

      {amenities.length === 0 ? (
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
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No amenities</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new amenity.</p>
          <div className="mt-6">
            <a
              href="/admin/amenities/new"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              New Amenity
            </a>
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {Object.entries(groupedAmenities).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-lg font-medium text-gray-900 mb-4">{category}</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((amenity) => (
                  <div
                    key={amenity.id}
                    className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
                  >
                    {amenity.image && (
                      <div className="flex-shrink-0">
                        <img src={amenity.image} alt={amenity.name} className="h-10 w-10 rounded-lg object-cover" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">{amenity.name}</p>
                      {amenity.description && (
                        <p className="truncate text-sm text-gray-500">{amenity.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`/admin/amenities/${amenity.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <PencilIcon className="h-5 w-5" />
                        <span className="sr-only">Edit</span>
                      </a>
                      <button
                        onClick={() => deleteAmenity(amenity.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
