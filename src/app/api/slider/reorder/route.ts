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

// Read slides from file
async function readSlides(): Promise<Slide[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Write slides to file
async function writeSlides(slides: Slide[]): Promise<void> {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
  await fs.writeFile(DATA_FILE, JSON.stringify(slides, null, 2), 'utf-8');
}

// POST - Reorder slides
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, direction } = body;

    if (!id || !direction) {
      return NextResponse.json({ error: 'ID and direction required' }, { status: 400 });
    }

    const slides = await readSlides();
    const currentIndex = slides.findIndex((s) => s.id === id);

    if (currentIndex === -1) {
      return NextResponse.json({ error: 'Slide not found' }, { status: 404 });
    }

    // Sort by current order
    slides.sort((a, b) => a.order - b.order);

    if (direction === 'up' && currentIndex > 0) {
      // Swap with previous slide
      [slides[currentIndex - 1], slides[currentIndex]] = [
        slides[currentIndex],
        slides[currentIndex - 1],
      ];
    } else if (direction === 'down' && currentIndex < slides.length - 1) {
      // Swap with next slide
      [slides[currentIndex], slides[currentIndex + 1]] = [
        slides[currentIndex + 1],
        slides[currentIndex],
      ];
    }

    // Update order values
    slides.forEach((slide, index) => {
      slide.order = index + 1;
    });

    await writeSlides(slides);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error reordering slides:', error);
    return NextResponse.json({ error: 'Failed to reorder slides' }, { status: 500 });
  }
}
