'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface ImageUploadProps {
  value?: string | string[]
  onChange: (value: string | string[]) => void
  multiple?: boolean
  folder?: string
  label?: string
  onUploadComplete?: (urls: string[]) => void
}

export default function ImageUpload({
  value,
  onChange,
  multiple = false,
  folder = 'uploads',
  label = 'Upload Image',
  onUploadComplete
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const images = Array.isArray(value) ? value : value ? [value] : []

  const handleUpload = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', folder)

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) throw new Error('Upload failed')
        const data = await response.json()
        return data.url
      })

      const urls = await Promise.all(uploadPromises)

      if (multiple) {
        onChange([...images, ...urls])
      } else {
        onChange(urls[0])
      }
      
      if (onUploadComplete) {
        onUploadComplete(urls)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }, [folder, multiple, images, onChange, onUploadComplete])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files)
    }
  }, [handleUpload])

  const removeImage = (index: number) => {
    if (multiple) {
      const newImages = images.filter((_, i) => i !== index)
      onChange(newImages.length > 0 ? newImages : [])
    } else {
      onChange('')
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple={multiple}
          accept="image/*"
          onChange={(e) => handleUpload(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />

        <div className="text-center">
          <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            {uploading ? (
              'Uploading...'
            ) : (
              <>
                <span className="font-semibold text-blue-600">Click to upload</span> or
                drag and drop
              </>
            )}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>

      {/* Preview */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div key={index} className="relative group aspect-square">
              <Image
                src={img}
                alt={`Upload ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
