export interface Cabin {
  id: string
  name: string
  slug?: string
  description: string
  longDescription?: string
  price: number
  pricePerNight?: number // alias for price
  capacity: number
  bedrooms: number
  bathrooms: number
  size?: string // dimensions of the cabin
  image?: string
  images?: string[] // array of images
  gallery?: string[]
  amenities: string[]
  featured?: boolean
  available?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface Amenity {
  id: string
  name: string
  category: string
  description: string
  icon: string
  image: string
}

export interface GalleryImage {
  id: string
  title: string
  description: string
  category: string
  image: string
}

export interface SiteSettings {
  logo: string
  siteName: string
  tagline: string
  theme: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    textColor: string
    backgroundColor: string
  }
  fonts: {
    heading: string
    body: string
  }
  contact: {
    phone: string
    email: string
    address: string
  }
  social: {
    facebook: string
    instagram: string
    twitter: string
    linkedin: string
  }
}

export interface AdminData {
  cabins: Cabin[]
  amenities: Amenity[]
  gallery: GalleryImage[]
  siteSettings?: SiteSettings
}
