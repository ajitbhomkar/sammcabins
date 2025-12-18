import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'src/data/content.json')

interface ContentData {
  cabins: unknown[]
  amenities: unknown[]
  gallery: unknown[]
}

export async function GET() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return NextResponse.json(JSON.parse(data))
  } catch {
    return NextResponse.json({ cabins: [], amenities: [], gallery: [] })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // If it's a full data replacement (old API style)
    if (body.cabins !== undefined || body.amenities !== undefined || body.gallery !== undefined) {
      await fs.writeFile(DATA_FILE, JSON.stringify(body, null, 2))
      return NextResponse.json({ success: true })
    }
    
    // Handle CRUD actions
    const { action, type, id, data: itemData } = body
    
    // Read current data
    let content: ContentData = { cabins: [], amenities: [], gallery: [] }
    try {
      const fileData = await fs.readFile(DATA_FILE, 'utf-8')
      content = JSON.parse(fileData)
    } catch {
      // File doesn't exist, use empty structure
    }
    
    // Determine which array to modify
    const arrayKey = type === 'cabin' ? 'cabins' : type === 'amenity' ? 'amenities' : 'gallery'
    
    if (action === 'create') {
      // Add new item
      content[arrayKey].push(itemData)
    } else if (action === 'update') {
      // Update existing item
      const index = content[arrayKey].findIndex((item: unknown) => (item as { id: string }).id === id)
      if (index !== -1) {
        const existing = content[arrayKey][index] as Record<string, unknown>
        content[arrayKey][index] = { ...existing, ...itemData }
      } else {
        return NextResponse.json({ error: 'Item not found' }, { status: 404 })
      }
    } else if (action === 'delete') {
      // Delete item
      content[arrayKey] = content[arrayKey].filter((item: unknown) => (item as { id: string }).id !== id)
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
    
    // Save updated data
    await fs.writeFile(DATA_FILE, JSON.stringify(content, null, 2))
    return NextResponse.json({ success: true, data: itemData })
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
  }
}
