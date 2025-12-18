'use client'

import { useEffect, useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import type { Cabin } from '@/types/admin'

export default function CabinsPage() {
  const [cabins, setCabins] = useState<Cabin[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCabins()
  }, [])

  const loadCabins = async () => {
    try {
      const res = await fetch('/api/admin/content')
      const data = await res.json()
      setCabins(data.cabins || [])
    } catch (error) {
      console.error('Failed to load cabins:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteCabin = async (id: string) => {
    if (!confirm('Are you sure you want to delete this cabin?')) return

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          type: 'cabin',
          id,
        }),
      })

      if (res.ok) {
        loadCabins()
      }
    } catch (error) {
      console.error('Failed to delete cabin:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Cabins</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all cabins including their name, capacity, price and features.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <a
            href="/admin/cabins/new"
            className="block rounded-md bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-500"
          >
            <PlusIcon className="inline-block h-5 w-5 mr-1 -mt-1" />
            Add Cabin
          </a>
        </div>
      </div>

      {cabins.length === 0 ? (
        <div className="mt-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No cabins</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new cabin.</p>
          <div className="mt-6">
            <a
              href="/admin/cabins/new"
              className="inline-flex items-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500"
            >
              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              New Cabin
            </a>
          </div>
        </div>
      ) : (
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Name
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Capacity
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Price
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Rooms
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cabins.map((cabin) => (
                    <tr key={cabin.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {cabin.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {cabin.capacity} People
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        AED {cabin.price?.toLocaleString() || 0}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {cabin.bedrooms > 0 ? `${cabin.bedrooms} Room${cabin.bedrooms > 1 ? 's' : ''}` : 'N/A'}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a
                          href={`/admin/cabins/${cabin.id}`}
                          className="text-teal-600 hover:text-teal-900 mr-4"
                        >
                          <PencilIcon className="inline-block h-5 w-5" />
                          <span className="sr-only">, {cabin.name}</span>
                        </a>
                        <button
                          onClick={() => deleteCabin(cabin.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="inline-block h-5 w-5" />
                          <span className="sr-only">, {cabin.name}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
