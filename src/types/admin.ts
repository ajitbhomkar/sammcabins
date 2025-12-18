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
  src: string
  alt: string
  category: string
  caption: string
  order: number
}

export interface AdminData {
  cabins: Cabin[]
  amenities: Amenity[]
  gallery: GalleryImage[]
}
