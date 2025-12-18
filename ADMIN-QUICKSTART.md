# Admin Panel Quick Start Guide

## 🎯 What You Have Now

A complete custom admin panel with beautiful UI/UX for managing your cabin rental website!

## 📁 Files Created

### Admin Pages
- `/src/app/admin/layout.tsx` - Admin panel wrapper layout
- `/src/app/admin/page.tsx` - Dashboard with statistics
- `/src/app/admin/cabins/page.tsx` - Cabin list view
- `/src/app/admin/cabins/new/page.tsx` - Create new cabin form
- `/src/app/admin/amenities/page.tsx` - Amenities list (grouped by category)
- `/src/app/admin/amenities/new/page.tsx` - Create new amenity form
- `/src/app/admin/gallery/page.tsx` - Gallery manager with upload

### Components
- `/src/components/admin/AdminLayout.tsx` - Sidebar navigation layout
- `/src/components/admin/ImageUpload.tsx` - Drag & drop image uploader

### API Routes
- `/src/app/api/admin/content/route.ts` - CRUD operations for all content
- `/src/app/api/admin/upload/route.ts` - Image upload handler

### Data & Types
- `/src/types/admin.ts` - TypeScript interfaces for Cabin, Amenity, GalleryImage
- `/src/data/content.json` - JSON database for content storage

## 🚀 Quick Start

### 1. Access the Admin Panel
```
http://localhost:3000/admin
```

### 2. Dashboard Features
- View statistics (total cabins, amenities, images)
- Quick action cards to add new content
- Beautiful responsive design

### 3. Manage Cabins
- **List**: View all cabins in a table
- **Create**: Click "Add Cabin" button
  - Fill in name, description, capacity, price, bedrooms, bathrooms
  - Upload multiple images with drag & drop
  - Click "Create Cabin"
- **Edit**: Click pencil icon on any cabin
- **Delete**: Click trash icon (with confirmation)

### 4. Manage Amenities
- **List**: View amenities grouped by category
- **Create**: Click "Add Amenity" button
  - Enter name, select category, add description
  - Upload amenity image
  - Click "Create Amenity"
- **Categories**: Basic, Entertainment, Kitchen, Outdoor, Safety, Other

### 5. Manage Gallery
- **Upload**: Click "Upload Images" button
  - Drag & drop multiple images
  - Images automatically added to gallery
- **Filter**: Click category buttons to filter images
- **Delete**: Hover over image and click trash icon

## 📱 UI/UX Features

✅ **Fully Responsive** - Works on mobile, tablet, desktop
✅ **Drag & Drop Upload** - Easy image uploading
✅ **Live Preview** - See images before saving
✅ **Confirmation Dialogs** - Prevent accidental deletions
✅ **Loading States** - Shows progress during operations
✅ **Empty States** - Helpful prompts when no content exists
✅ **Category Organization** - Amenities grouped logically
✅ **Grid & Table Views** - Optimal layout for each content type

## 🎨 Design System

- **Primary Color**: Indigo (customizable in Tailwind config)
- **Icons**: Heroicons (included)
- **UI Components**: Headless UI (accessible, unstyled)
- **Typography**: Clean, modern font stack
- **Spacing**: Consistent padding and margins
- **Shadows**: Subtle depth for cards and buttons

## 📸 Image Management

### Upload Locations
```
/public/images/cabins/     - Cabin images
/public/images/amenities/  - Amenity images
/public/images/gallery/    - Gallery images
```

### Features
- Multiple file upload
- Automatic naming (timestamp-based)
- Preview before save
- Remove uploaded images
- Optimized for web display

## 🗄️ Data Storage

### JSON Database
```json
{
  "cabins": [
    {
      "id": "cabin-1234567890",
      "name": "Cozy Cabin",
      "description": "...",
      "capacity": 4,
      "price": 150,
      "bedrooms": 2,
      "bathrooms": 1,
      "images": ["/images/cabins/..."],
      "amenities": []
    }
  ],
  "amenities": [...],
  "gallery": [...]
}
```

### File Location
`/src/data/content.json`

## 🔐 Important: Authentication

⚠️ **The admin panel does NOT have authentication yet!**

Before deploying to production, you MUST add authentication:

### Option 1: Next-Auth (Recommended)
```bash
npm install next-auth
```

### Option 2: Simple Password Protection
Add a login page and middleware to protect `/admin/*` routes

### Option 3: HTTP Basic Auth
Use your web server (Nginx) to add basic authentication

**See ADMIN-PANEL.md for detailed authentication setup**

## 🛠️ Customization

### Change Colors
Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    }
  }
}
```

### Add New Fields to Cabin
1. Update `/src/types/admin.ts`
2. Add input in `/src/app/admin/cabins/new/page.tsx`
3. Update table in `/src/app/admin/cabins/page.tsx`

### Change Categories
Edit the `categories` array in `/src/app/admin/amenities/new/page.tsx`

## 📦 Next Steps

### 1. Test the Admin Panel
```bash
npm run dev
# Visit http://localhost:3000/admin
# Create a test cabin, amenity, and upload images
```

### 2. Add Authentication
Choose and implement one of the authentication options above

### 3. Deploy to Production
```bash
# Push to GitHub
git add .
git commit -m "Add custom admin panel"
git push

# GitHub Actions will deploy automatically
```

### 4. Update Your Main Pages
Connect the admin content to your public pages:
- Update `/src/app/cabins/page.tsx` to fetch from `/api/admin/content`
- Update `/src/app/amenities/page.tsx` similarly
- Update `/src/app/gallery/page.tsx` similarly

## 🔄 Connecting Content to Public Pages

### Example: Display Cabins on Public Page

```typescript
// In any page.tsx
export default async function CabinsPage() {
  const res = await fetch('http://localhost:3000/api/admin/content', {
    cache: 'no-store' // or use revalidation
  })
  const data = await res.json()
  const cabins = data.cabins

  return (
    <div className="grid grid-cols-3 gap-6">
      {cabins.map((cabin) => (
        <div key={cabin.id} className="cabin-card">
          <img src={cabin.images[0]} alt={cabin.name} />
          <h3>{cabin.name}</h3>
          <p>{cabin.description}</p>
          <p>${cabin.price}/night</p>
        </div>
      ))}
    </div>
  )
}
```

## 📊 Admin Panel Structure

```
/admin
├── Dashboard (stats, quick actions)
├── /cabins
│   ├── List view (table)
│   └── /new (create form)
├── /amenities
│   ├── List view (cards by category)
│   └── /new (create form)
└── /gallery
    └── Grid view with upload
```

## 💡 Tips

1. **Test locally first** before deploying
2. **Backup content.json** regularly
3. **Add authentication** before making it public
4. **Use the ImageUpload component** - it handles everything
5. **Check browser console** if issues occur
6. **Empty states guide you** when no content exists

## 🐛 Troubleshooting

### Can't save content
- Check file permissions on `/src/data/content.json`
- Verify API route is working
- Check server console for errors

### Images not uploading
- Check `/public/images/` folder exists
- Verify API route: `/api/admin/upload`
- Check file size limits

### Page not loading
- Run `npm run build` to check for errors
- Clear browser cache
- Check terminal for errors

## 📚 Documentation

- **ADMIN-PANEL.md** - Complete documentation with all features
- **DEPLOYMENT.md** - Production deployment guide
- **ARCHITECTURE.md** - System architecture and diagrams

---

## ✅ You're Ready!

Your custom admin panel is complete with:
- ✨ Beautiful, responsive UI
- 🖼️ Drag & drop image uploads
- 📊 Dashboard with statistics
- 🏠 Complete cabin management
- ⭐ Amenity organization
- 🖼️ Gallery management

**Next**: Add authentication, test thoroughly, then deploy! 🚀
