# Custom Admin Panel

A beautiful, user-friendly admin panel for managing your cabin rental website content.

## Features

✨ **Modern UI/UX**: Built with Tailwind CSS and Headless UI for a sleek interface
📱 **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
🖼️ **Drag & Drop Upload**: Easy image uploading with preview
📊 **Dashboard**: Quick overview of your content statistics
🏠 **Cabin Management**: Create, edit, and delete cabin listings
⭐ **Amenity Manager**: Organize amenities by category
🖼️ **Gallery Manager**: Upload and organize images with filtering

## Accessing the Admin Panel

Navigate to: **`http://yourdomain.com/admin`**

## Dashboard

The dashboard provides:
- Quick statistics (total cabins, amenities, gallery images)
- Quick action cards to add new content
- Getting started guide

## Managing Cabins

### List View (`/admin/cabins`)
- View all cabins in a table format
- See key information: name, capacity, price, bedrooms
- Quick edit and delete actions

### Create/Edit Cabin (`/admin/cabins/new`)
- **Basic Information**
  - Cabin name (required)
  - Description (required)
  - Capacity (number of guests)
  - Price per night
  - Number of bedrooms
  - Number of bathrooms

- **Images**
  - Drag & drop multiple images
  - Preview uploaded images
  - Remove images before saving

## Managing Amenities

### List View (`/admin/amenities`)
- View amenities grouped by category
- Categories: Basic, Entertainment, Kitchen, Outdoor, Safety, Other
- Card-based layout with images

### Create Amenity (`/admin/amenities/new`)
- Amenity name
- Category selection
- Description
- Upload image

## Gallery Management

### Gallery View (`/admin/gallery`)
- Grid view of all images
- Filter by category
- Upload multiple images at once
- Delete images with hover overlay
- Shows total image count

### Upload Images
- Click "Upload Images" button
- Drag & drop or click to select multiple files
- Images are automatically added to gallery

## File Storage

All content is stored in two places:

1. **JSON Database**: `/src/data/content.json`
   - Stores all content metadata (cabins, amenities, gallery info)
   - Easy to backup and version control

2. **Image Files**: `/public/images/`
   - `/public/images/cabins/` - Cabin images
   - `/public/images/amenities/` - Amenity images
   - `/public/images/gallery/` - Gallery images

## API Routes

The admin panel uses these API endpoints:

### Content API (`/api/admin/content`)
```typescript
// GET - Fetch all content
GET /api/admin/content

// POST - Create, update, or delete content
POST /api/admin/content
{
  action: 'create' | 'update' | 'delete',
  type: 'cabin' | 'amenity' | 'gallery',
  data: { ... } // For create/update
  id: 'item-id' // For update/delete
}
```

### Upload API (`/api/admin/upload`)
```typescript
// POST - Upload images
POST /api/admin/upload
FormData {
  file: File,
  folder: 'cabins' | 'amenities' | 'gallery'
}

// Response
{
  url: '/images/{folder}/{filename}'
}
```

## Security Considerations

🚨 **IMPORTANT**: This admin panel does NOT include authentication by default!

Before deploying to production, you should:

1. **Add Authentication**
   - Use Next-Auth or similar
   - Protect all `/admin/*` routes
   - Add login page at `/admin/login`

2. **Secure API Routes**
   - Add authentication checks to API routes
   - Validate user permissions
   - Add CSRF protection

3. **Environment Variables**
   ```env
   ADMIN_EMAIL=your@email.com
   ADMIN_PASSWORD_HASH=your-hashed-password
   ```

### Example Auth Protection

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin-token')
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
}
```

## Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

## Customization

### Adding New Fields to Cabins

1. Update the Cabin interface in `/src/types/admin.ts`
2. Add form fields in `/src/app/admin/cabins/new/page.tsx`
3. Update the table view in `/src/app/admin/cabins/page.tsx`

### Changing Categories

Edit the categories array in the respective component:
- Amenities: `/src/app/admin/amenities/new/page.tsx`
- Gallery: Update the category filter logic in `/src/app/admin/gallery/page.tsx`

### Styling

All components use Tailwind CSS. To customize:
- Colors: Update `tailwind.config.js`
- Components: Edit files in `/src/components/admin/`
- Layout: Modify `/src/components/admin/AdminLayout.tsx`

## Backup & Restore

### Backup Content
```bash
# Copy the JSON database
cp src/data/content.json backup/content-$(date +%Y%m%d).json

# Backup images
tar -czf backup/images-$(date +%Y%m%d).tar.gz public/images/
```

### Restore Content
```bash
# Restore JSON database
cp backup/content-20250101.json src/data/content.json

# Restore images
tar -xzf backup/images-20250101.tar.gz -C public/
```

## Troubleshooting

### Images Not Uploading
- Check folder permissions on `/public/images/`
- Verify API route is working: `curl -X POST http://localhost:3000/api/admin/upload`
- Check browser console for errors

### Content Not Saving
- Check `/src/data/content.json` exists and is writable
- Verify API route: `curl http://localhost:3000/api/admin/content`
- Check server logs for errors

### Layout Issues
- Clear browser cache
- Rebuild: `npm run build`
- Check for missing Tailwind classes

## Future Enhancements

Potential features to add:
- [ ] Authentication & user management
- [ ] Image optimization & resizing
- [ ] Bulk operations (delete multiple, export)
- [ ] Search & advanced filtering
- [ ] Drag & drop reordering
- [ ] Rich text editor for descriptions
- [ ] Image cropping tool
- [ ] Content versioning & history
- [ ] Analytics & insights
- [ ] Email notifications
- [ ] Calendar for bookings

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the code in `/src/app/admin/` and `/src/components/admin/`
3. Check the API routes in `/src/app/api/admin/`

---

**Built with**: Next.js 14, React 19, TypeScript, Tailwind CSS, Headless UI
