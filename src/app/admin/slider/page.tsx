'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  PhotoIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

interface Slide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  order: number;
  isActive: boolean;
}

export default function SliderAdminPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const [isSaving, setSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');

  // Form state
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    subtitle: '',
    buttonText: '',
    buttonLink: '',
    isActive: true,
  });

  useEffect(() => {
    loadSlides();
  }, []);

  const loadSlides = async () => {
    try {
      const response = await fetch('/api/slider');
      const data = await response.json();
      setSlides(data.slides || []);
    } catch (error) {
      console.error('Failed to load slides:', error);
    }
  };

  const openModal = (slide?: Slide) => {
    if (slide) {
      setEditingSlide(slide);
      setFormData({
        image: slide.image,
        title: slide.title,
        subtitle: slide.subtitle,
        buttonText: slide.buttonText,
        buttonLink: slide.buttonLink,
        isActive: slide.isActive,
      });
      setPreviewImage(slide.image);
    } else {
      setEditingSlide(null);
      setFormData({
        image: '',
        title: '',
        subtitle: '',
        buttonText: '',
        buttonLink: '',
        isActive: true,
      });
      setPreviewImage('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSlide(null);
    setFormData({
      image: '',
      title: '',
      subtitle: '',
      buttonText: '',
      buttonLink: '',
      isActive: true,
    });
    setPreviewImage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const method = editingSlide ? 'PUT' : 'POST';
      const url = editingSlide ? `/api/slider?id=${editingSlide.id}` : '/api/slider';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await loadSlides();
        closeModal();
      }
    } catch (error) {
      console.error('Failed to save slide:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this slide?')) return;

    try {
      const response = await fetch(`/api/slider?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadSlides();
      }
    } catch (error) {
      console.error('Failed to delete slide:', error);
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    try {
      const response = await fetch(`/api/slider/reorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, direction }),
      });

      if (response.ok) {
        await loadSlides();
      }
    } catch (error) {
      console.error('Failed to reorder slide:', error);
    }
  };

  const handleToggleActive = async (slide: Slide) => {
    try {
      const response = await fetch(`/api/slider?id=${slide.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...slide, isActive: !slide.isActive }),
      });

      if (response.ok) {
        await loadSlides();
      }
    } catch (error) {
      console.error('Failed to toggle slide:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Homepage Slider</h1>
            <p className="mt-2 text-gray-600">Manage your homepage hero slider images and content</p>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            Add Slide
          </button>
        </div>

        {/* Slides Grid */}
        {slides.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <PhotoIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No slides yet</h3>
            <p className="text-gray-600 mb-6">Create your first slide to get started</p>
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
              Add First Slide
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {slides
              .sort((a, b) => a.order - b.order)
              .map((slide, index) => (
                <div
                  key={slide.id}
                  className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all ${
                    !slide.isActive ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image Preview */}
                    <div className="w-full md:w-64 h-48 relative bg-gray-200">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                      />
                      {!slide.isActive && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <span className="text-white font-semibold">Inactive</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                              Slide {index + 1}
                            </span>
                            <button
                              onClick={() => handleToggleActive(slide)}
                              className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                                slide.isActive
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {slide.isActive ? 'Active' : 'Inactive'}
                            </button>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{slide.title}</h3>
                          {slide.subtitle && (
                            <p className="text-amber-600 font-semibold mb-2">{slide.subtitle}</p>
                          )}
                          {slide.buttonText && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="font-semibold">Button:</span>
                              <span>{slide.buttonText}</span>
                              <span className="text-gray-400">→</span>
                              <span className="text-blue-600">{slide.buttonLink}</span>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleReorder(slide.id, 'up')}
                            disabled={index === 0}
                            className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move up"
                          >
                            <ArrowUpIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleReorder(slide.id, 'down')}
                            disabled={index === slides.length - 1}
                            className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move down"
                          >
                            <ArrowDownIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => openModal(slide)}
                            className="p-2 text-blue-600 hover:text-blue-700"
                            title="Edit"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(slide.id)}
                            className="p-2 text-red-600 hover:text-red-700"
                            title="Delete"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Preview Link */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
          <div className="flex items-start gap-3">
            <EyeIcon className="h-6 w-6 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Preview Your Slider</h3>
              <p className="text-blue-700 mb-3">
                View your homepage slider in action by visiting the main page
              </p>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                View Homepage
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingSlide ? 'Edit Slide' : 'Add New Slide'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => {
                    setFormData({ ...formData, image: e.target.value });
                    setPreviewImage(e.target.value);
                  }}
                  placeholder="https://example.com/image.jpg or /images/slide1.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
                {previewImage && (
                  <div className="mt-3 relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={previewImage}
                      alt="Preview"
                      fill
                      className="object-cover"
                      onError={() => setPreviewImage('')}
                    />
                  </div>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  Recommended: 1920x1080px or larger. Use images from /public/images/
                </p>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Premium Porta Cabins in UAE"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="SAAM Cabins - Your Trusted Partner"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              {/* Button Text */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={formData.buttonText}
                  onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                  placeholder="View Our Cabins"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              {/* Button Link */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Button Link
                </label>
                <input
                  type="text"
                  value={formData.buttonLink}
                  onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                  placeholder="/cabins"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5 text-amber-500 rounded focus:ring-2 focus:ring-amber-500"
                />
                <label htmlFor="isActive" className="text-sm font-semibold text-gray-700">
                  Show this slide on homepage
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : editingSlide ? 'Update Slide' : 'Add Slide'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
