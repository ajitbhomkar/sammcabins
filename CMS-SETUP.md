# 🎨 CMS Setup Guide - Sanity Studio

This guide will help you set up the Sanity CMS admin panel to manage your cabin content, images, and amenities.

## 🚀 Quick Start

### 1. Install Sanity CLI

```bash
npm install -g @sanity/cli
```

### 2. Initialize Sanity Project

```bash
cd studio
npm install

# Or if studio folder doesn't exist yet:
sanity init
```

Follow the prompts:
- Create new project
- Project name: Saam Cabins
- Use default dataset: Yes
- Output path: ./studio
- Template: Clean project

### 3. Deploy Sanity Studio

```bash
cd studio
sanity deploy
```

Choose a hostname (e.g., `saamcabins`)

Your admin panel will be live at: **https://saamcabins.sanity.studio**

### 4. Get Your Project Credentials

After setup, note these values:
- **Project ID**: Found in `studio/sanity.config.ts`
- **Dataset**: Usually "production"

### 5. Add to Environment Variables

**On VPS:**
```bash
nano ~/sammcabins/shared/.env.production
```

Add:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
```

**Locally:**
```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

---

## 📝 Content Types

### Cabins
- Name, description, pricing
- Capacity, bedrooms, bathrooms
- Main image & gallery
- Amenities (references)
- Featured flag
- Availability status

### Amenities
- Name & category
- Description
- Icon name (Heroicons)
- Image

### Gallery
- Title & image
- Category (cabins, nature, activities, etc.)
- Caption
- Display order

---

## 🖼️ How to Use the Admin Panel

### Adding a New Cabin

1. Go to https://saamcabins.sanity.studio
2. Click **"Cabin"** in the sidebar
3. Click **"Create new Cabin"**
4. Fill in the details:
   - **Name**: e.g., "Mountain View Cabin"
   - **Slug**: Click "Generate" (creates URL-friendly name)
   - **Description**: Short summary
   - **Price**: Per night amount
   - **Capacity**: Number of guests
   - **Bedrooms** & **Bathrooms**: Numbers
   - **Main Image**: Click to upload
   - **Gallery**: Add multiple images
   - **Amenities**: Select from list
   - **Featured**: Check if this is a featured cabin
5. Click **"Publish"**

### Adding Images to Gallery

1. Click **"Gallery Image"**
2. Click **"Create new Gallery Image"**
3. Upload image
4. Add title and caption
5. Select category
6. Set display order (lower numbers appear first)
7. Publish

### Adding Amenities

1. Click **"Amenity"**
2. Create new
3. Add name, category, description
4. Upload image
5. Add icon name (optional)
6. Publish

---

## 🔗 Connecting to Your Next.js App

### Install Dependencies

```bash
npm install next-sanity @sanity/image-url @portabletext/react
```

### Fetch Cabins in Your App

```typescript
// src/app/cabins/page.tsx
import {client} from '@/lib/sanity.client'

export default async function CabinsPage() {
  const cabins = await client.fetch(`
    *[_type == "cabin" && available == true] | order(featured desc, name asc) {
      _id,
      name,
      slug,
      description,
      price,
      capacity,
      bedrooms,
      bathrooms,
      mainImage,
      featured
    }
  `)

  return (
    <div>
      {cabins.map((cabin) => (
        <CabinCard key={cabin._id} cabin={cabin} />
      ))}
    </div>
  )
}

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 3600 // Revalidate every hour
```

### Display Images

```typescript
import {urlFor} from '@/lib/sanity.client'
import Image from 'next/image'

<Image
  src={urlFor(cabin.mainImage).width(800).height(600).url()}
  alt={cabin.name}
  width={800}
  height={600}
/>
```

---

## 🔐 API Tokens (Optional)

For write operations or private data:

1. Go to https://sanity.io/manage
2. Select your project
3. Go to **API** → **Tokens**
4. Create new token with Editor permissions
5. Add to `.env.production`:
   ```env
   SANITY_API_TOKEN=your_token_here
   ```

---

## 🎯 Common GROQ Queries

### Get All Featured Cabins
```groq
*[_type == "cabin" && featured == true]
```

### Get Cabin by Slug
```groq
*[_type == "cabin" && slug.current == $slug][0]
```

### Get Amenities by Category
```groq
*[_type == "amenity" && category == "outdoor"]
```

### Get Gallery Images (sorted)
```groq
*[_type == "gallery"] | order(order asc)
```

### Get Cabin with Amenities
```groq
*[_type == "cabin"] {
  ...,
  amenities[]->{
    _id,
    name,
    category,
    image
  }
}
```

---

## 📱 Studio Customization

Edit `studio/sanity.config.ts` to customize:
- Studio title
- Logo
- Color scheme
- Plugins

---

## 🆘 Troubleshooting

### Can't Access Studio
- Check if deployed: `sanity deploy`
- Verify URL: https://YOUR_HOSTNAME.sanity.studio

### Images Not Loading
- Check Project ID in `.env`
- Verify image URLs with `urlFor()` helper

### Content Not Updating
- Check ISR revalidation time
- Clear cache: Delete `.next` folder and rebuild

---

## 📚 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Next.js Integration](https://www.sanity.io/plugins/next-sanity)
- [Image URLs](https://www.sanity.io/docs/image-urls)

---

## 🎉 You're Ready!

1. Deploy studio: `sanity deploy`
2. Access admin: https://saamcabins.sanity.studio
3. Add content (cabins, amenities, gallery)
4. Deploy your Next.js app
5. Content appears automatically!

Happy content managing! 🏡✨
