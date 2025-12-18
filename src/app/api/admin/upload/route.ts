import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'uploads'
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create unique filename
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name.replace(/\s/g, '-')}`
    const uploadDir = path.join(process.cwd(), 'public', 'images', folder)
    
    // Create directory if it doesn't exist
    await mkdir(uploadDir, { recursive: true })
    
    const filepath = path.join(uploadDir, filename)
    await writeFile(filepath, buffer)

    const url = `/images/${folder}/${filename}`
    
    return NextResponse.json({ url, filename })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
