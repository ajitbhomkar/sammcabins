export interface Cabin {
  _id: string
  _type: 'cabin'
  name: string
  slug: {
    current: string
  }
  description?: string
  longDescription?: any[]
  price: number
  capacity: number
  bedrooms: number
  bathrooms: number
  mainImage: any
  gallery?: any[]
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
  image?: any
}

export interface GalleryImage {
  _id: string
  _type: 'gallery'
  title: string
  image: any
  category?: string
  caption?: string
  order: number
}
