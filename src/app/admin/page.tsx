'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BuildingOfficeIcon, SparklesIcon, PhotoIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    cabins: 0,
    amenities: 0,
    gallery: 0,
  })

  useEffect(() => {
    fetch('/api/admin/content')
      .then((res) => res.json())
      .then((data) => {
        setStats({
          cabins: data.cabins?.length || 0,
          amenities: data.amenities?.length || 0,
          gallery: data.gallery?.length || 0,
        })
      })
  }, [])

  const cards = [
    {
      name: 'Total Cabins',
      value: stats.cabins,
      icon: BuildingOfficeIcon,
      color: 'bg-blue-500',
      href: '/admin/cabins',
    },
    {
      name: 'Amenities',
      value: stats.amenities,
      icon: SparklesIcon,
      color: 'bg-purple-500',
      href: '/admin/amenities',
    },
    {
      name: 'Gallery Images',
      value: stats.gallery,
      icon: PhotoIcon,
      color: 'bg-green-500',
      href: '/admin/gallery',
    },
  ]

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Dashboard
          </h2>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <a
            key={card.name}
            href={card.href}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow hover:shadow-md transition-shadow sm:p-6"
          >
            <div>
              <div className="absolute rounded-md p-3 bg-opacity-10" style={{backgroundColor: card.color.replace('bg-', '')}}>
                <card.icon className={`h-6 w-6 ${card.color.replace('bg-', 'text-')}`} aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{card.name}</p>
            </div>
            <div className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/admin/cabins?new=true"
            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
          >
            <div className="flex-shrink-0">
              <BuildingOfficeIcon className="h-10 w-10 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">Add New Cabin</p>
              <p className="truncate text-sm text-gray-500">Create a new cabin listing</p>
            </div>
          </Link>

          <a
            href="/admin/amenities?new=true"
            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
          >
            <div className="flex-shrink-0">
              <SparklesIcon className="h-10 w-10 text-purple-600" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">Add Amenity</p>
              <p className="truncate text-sm text-gray-500">Create a new amenity</p>
            </div>
          </a>

          <a
            href="/admin/gallery?new=true"
            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
          >
            <div className="flex-shrink-0">
              <PhotoIcon className="h-10 w-10 text-green-600" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">Upload Images</p>
              <p className="truncate text-sm text-gray-500">Add to gallery</p>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Activity placeholder */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Getting Started</h3>
        <div className="rounded-lg bg-blue-50 p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Welcome to your admin panel!</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Start by adding your first cabin, amenities, or uploading images to the gallery.
                  All content will be displayed on your website automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
