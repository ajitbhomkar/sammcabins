'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SiteSettings } from '@/types/admin'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>('')

  // Available Google Fonts
  const availableFonts = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Poppins',
    'Raleway',
    'Nunito',
    'Playfair Display',
    'Merriweather'
  ]

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/content')
      const data = await response.json()
      if (data.siteSettings) {
        setSettings(data.siteSettings)
        setLogoPreview(data.siteSettings.logo)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    if (!settings) return

    setSaving(true)
    try {
      // Upload logo if changed
      let logoUrl = settings.logo
      if (logoFile) {
        const formData = new FormData()
        formData.append('file', logoFile)

        const uploadResponse = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        })

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json()
          logoUrl = uploadData.url
        }
      }

      // Update settings
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateSettings',
          settings: { ...settings, logo: logoUrl },
        }),
      })

      if (response.ok) {
        alert('Settings saved successfully!')
        fetchSettings()
        // Reload the page to apply new theme
        window.location.reload()
      } else {
        alert('Failed to save settings')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading settings...</div>
      </div>
    )
  }

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Failed to load settings</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/admin"
              className="text-teal-600 hover:text-teal-700 mb-2 inline-block"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
            <p className="text-gray-600 mt-2">
              Customize your website logo, theme, and fonts
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        <div className="space-y-6">
          {/* Logo Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Logo & Branding
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) =>
                    setSettings({ ...settings, siteName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) =>
                    setSettings({ ...settings, tagline: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo
                </label>
                <div className="flex items-center space-x-4">
                  {logoPreview && (
                    <div className="w-32 h-32 border-2 border-gray-200 rounded-lg overflow-hidden bg-white flex items-center justify-center relative">
                      <Image
                        src={logoPreview}
                        alt="Logo preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG or SVG (recommended: 200x60px)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Theme Colors */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Theme Colors
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={settings.theme.primaryColor}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        theme: { ...settings.theme, primaryColor: e.target.value },
                      })
                    }
                    className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.theme.primaryColor}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        theme: { ...settings.theme, primaryColor: e.target.value },
                      })
                    }
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={settings.theme.secondaryColor}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        theme: { ...settings.theme, secondaryColor: e.target.value },
                      })
                    }
                    className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.theme.secondaryColor}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        theme: { ...settings.theme, secondaryColor: e.target.value },
                      })
                    }
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accent Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={settings.theme.accentColor}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        theme: { ...settings.theme, accentColor: e.target.value },
                      })
                    }
                    className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.theme.accentColor}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        theme: { ...settings.theme, accentColor: e.target.value },
                      })
                    }
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Typography
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heading Font
                </label>
                <select
                  value={settings.fonts.heading}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      fonts: { ...settings.fonts, heading: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {availableFonts.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-2" style={{ fontFamily: settings.fonts.heading }}>
                  Preview: The quick brown fox jumps
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Body Font
                </label>
                <select
                  value={settings.fonts.body}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      fonts: { ...settings.fonts, body: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {availableFonts.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-2" style={{ fontFamily: settings.fonts.body }}>
                  Preview: The quick brown fox jumps over the lazy dog
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  value={settings.contact.phone}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, phone: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={settings.contact.email}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, email: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={settings.contact.address}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, address: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Social Media Links
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook
                </label>
                <input
                  type="url"
                  value={settings.social.facebook}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      social: { ...settings.social, facebook: e.target.value },
                    })
                  }
                  placeholder="https://facebook.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                  value={settings.social.instagram}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      social: { ...settings.social, instagram: e.target.value },
                    })
                  }
                  placeholder="https://instagram.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Twitter
                </label>
                <input
                  type="url"
                  value={settings.social.twitter}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      social: { ...settings.social, twitter: e.target.value },
                    })
                  }
                  placeholder="https://twitter.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={settings.social.linkedin}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      social: { ...settings.social, linkedin: e.target.value },
                    })
                  }
                  placeholder="https://linkedin.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button (Bottom) */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-lg font-semibold"
          >
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
