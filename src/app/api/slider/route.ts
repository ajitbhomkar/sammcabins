import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'slides.json');

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

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read slides from file
async function readSlides(): Promise<Slide[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Return default slides if file doesn't exist
    return [
      {
        id: '1',
        image: '/images/cabins/cabin1.jpg',
        title: 'Premium Porta Cabins in UAE',
        subtitle: 'SAAM Cabins - Your Trusted Partner',
        buttonText: 'View Our Cabins',
        buttonLink: '/cabins',
        order: 1,
        isActive: true,
      },
      {
        id: '2',
        image: '/images/cabins/cabin2.jpg',
        title: 'Office & Security Cabins',
        subtitle: 'Quality Solutions for Every Need',
        buttonText: 'Explore Products',
        buttonLink: '/cabins',
        order: 2,
        isActive: true,
      },
      {
        id: '3',
        image: '/images/cabins/cabin3.jpg',
        title: 'Fast Delivery Across UAE',
        subtitle: 'Dubai • Sharjah • Abu Dhabi • Ajman',
        buttonText: 'Contact Us',
        buttonLink: '/contact',
        order: 3,
        isActive: true,
      },
    ];
  }
}

// Write slides to file
async function writeSlides(slides: Slide[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(slides, null, 2), 'utf-8');
}

// GET - Fetch all slides
export async function GET() {
  try {
    const slides = await readSlides();
    return NextResponse.json({ slides });
  } catch (error) {
    console.error('Error reading slides:', error);
    return NextResponse.json({ error: 'Failed to read slides' }, { status: 500 });
  }
}

// POST - Create new slide
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const slides = await readSlides();

    const newSlide: Slide = {
      id: Date.now().toString(),
      image: body.image,
      title: body.title,
      subtitle: body.subtitle || '',
      buttonText: body.buttonText || '',
      buttonLink: body.buttonLink || '',
      order: slides.length + 1,
      isActive: body.isActive !== undefined ? body.isActive : true,
    };

    slides.push(newSlide);
    await writeSlides(slides);

    return NextResponse.json({ slide: newSlide });
  } catch (error) {
    console.error('Error creating slide:', error);
    return NextResponse.json({ error: 'Failed to create slide' }, { status: 500 });
  }
}

// PUT - Update slide
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Slide ID required' }, { status: 400 });
    }

    const body = await request.json();
    const slides = await readSlides();
    const slideIndex = slides.findIndex((s) => s.id === id);

    if (slideIndex === -1) {
      return NextResponse.json({ error: 'Slide not found' }, { status: 404 });
    }

    slides[slideIndex] = {
      ...slides[slideIndex],
      image: body.image,
      title: body.title,
      subtitle: body.subtitle || '',
      buttonText: body.buttonText || '',
      buttonLink: body.buttonLink || '',
      isActive: body.isActive !== undefined ? body.isActive : slides[slideIndex].isActive,
    };

    await writeSlides(slides);

    return NextResponse.json({ slide: slides[slideIndex] });
  } catch (error) {
    console.error('Error updating slide:', error);
    return NextResponse.json({ error: 'Failed to update slide' }, { status: 500 });
  }
}

// DELETE - Delete slide
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Slide ID required' }, { status: 400 });
    }

    const slides = await readSlides();
    const filteredSlides = slides.filter((s) => s.id !== id);

    if (filteredSlides.length === slides.length) {
      return NextResponse.json({ error: 'Slide not found' }, { status: 404 });
    }

    // Reorder remaining slides
    filteredSlides.forEach((slide, index) => {
      slide.order = index + 1;
    });

    await writeSlides(filteredSlides);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting slide:', error);
    return NextResponse.json({ error: 'Failed to delete slide' }, { status: 500 });
  }
}
