'use client'

import { useEffect, useCallback } from 'react'

interface SiteSettings {
  theme?: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
  }
  fonts?: {
    heading: string
    body: string
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const applyTheme = useCallback((settings: SiteSettings) => {
    if (settings.theme) {
      // Apply CSS variables for theme colors
      document.documentElement.style.setProperty('--color-primary', settings.theme.primaryColor)
      document.documentElement.style.setProperty('--color-secondary', settings.theme.secondaryColor)
      document.documentElement.style.setProperty('--color-accent', settings.theme.accentColor)
    }

    if (settings.fonts) {
      // Load Google Fonts dynamically
      const headingFont = settings.fonts.heading.replace(/ /g, '+')
      const bodyFont = settings.fonts.body.replace(/ /g, '+')
      
      const fontLink = document.createElement('link')
      fontLink.href = `https://fonts.googleapis.com/css2?family=${headingFont}:wght@400;500;600;700;800&family=${bodyFont}:wght@300;400;500;600&display=swap`
      fontLink.rel = 'stylesheet'
      
      // Remove old font link if exists
      const oldLink = document.getElementById('dynamic-fonts')
      if (oldLink) {
        oldLink.remove()
      }
      
      fontLink.id = 'dynamic-fonts'
      document.head.appendChild(fontLink)

      // Apply font families
      document.documentElement.style.setProperty('--font-heading', `'${settings.fonts.heading}', sans-serif`)
      document.documentElement.style.setProperty('--font-body', `'${settings.fonts.body}', sans-serif`)
    }
  }, [])

  useEffect(() => {
    // Fetch settings
    fetch('/api/admin/content')
      .then((res) => res.json())
      .then((data) => {
        if (data.siteSettings) {
          applyTheme(data.siteSettings)
        }
      })
      .catch((error) => console.error('Error loading theme:', error))
  }, [applyTheme])

  return <>{children}</>
}
