export interface Cabin {
  _id: string
  _type: 'cabin'
  name: string
  slug: {
    current: string
  }
  description?: string
  longDescription?: unknown[]
  price: number
  capacity: number
  bedrooms: number
  bathrooms: number
  mainImage: unknown
  gallery?: unknown[]
  amenities?: Amenity[]
  featured: boolean
  available: boolean
}

export interface Amenity {
  _id: string
  _type: 'amenity'
  name: string
  category: string
  description?: string
  icon?: string
  image?: unknown
}

export interface GalleryImage {
  _id: string
  _type: 'gallery'
  title: string
  image: unknown
  category?: string
  caption?: string
  order: number
}
