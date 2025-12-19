# Homepage Slider Setup Guide

## Overview
Your homepage now features a beautiful, configurable hero slider that you can manage entirely through the admin panel at `/admin/slider`.

## Features

### ✨ Slider Features
- **Auto-play**: Slides automatically transition every 5 seconds
- **Navigation**: Arrow buttons and dot indicators for manual control
- **Responsive**: Perfectly adapts to mobile, tablet, and desktop screens
- **Smooth Transitions**: Elegant fade and slide animations
- **Pause on Interaction**: Auto-play pauses when user clicks arrows/dots, resumes after 10 seconds

### 🎛️ Admin Panel Features
- **Add/Edit/Delete Slides**: Full CRUD operations
- **Drag to Reorder**: Use up/down arrows to change slide order
- **Toggle Active/Inactive**: Show or hide slides without deleting
- **Live Preview**: View your changes on the homepage immediately
- **Image Preview**: See how images look before saving

## How to Manage Slides

### Access the Admin Panel
1. Navigate to: `http://yourdomain.com/admin/slider` or `http://68.178.160.108:3000/admin/slider`
2. You'll see all your current slides in order

### Add a New Slide
1. Click the **"Add Slide"** button (top right)
2. Fill in the form:
   - **Image URL**: Path to your image (e.g., `/images/slider/slide1.jpg`)
   - **Title**: Main headline (e.g., "Premium Porta Cabins in UAE")
   - **Subtitle**: Optional tagline (e.g., "SAAM Cabins - Your Trusted Partner")
   - **Button Text**: Call-to-action text (e.g., "View Our Cabins")
   - **Button Link**: Where button leads (e.g., `/cabins`)
   - **Active**: Check to show on homepage
3. Click **"Add Slide"**

### Edit a Slide
1. Click the **pencil icon** (edit) on any slide
2. Update any fields
3. Click **"Update Slide"**

### Reorder Slides
1. Use the **up/down arrow** buttons to change slide order
2. Changes take effect immediately

### Delete a Slide
1. Click the **trash icon** (delete) on any slide
2. Confirm deletion

### Toggle Active/Inactive
1. Click the **Active/Inactive** badge on any slide
2. Inactive slides won't show on homepage but remain in database

## Adding Images

### Recommended Image Specifications
- **Size**: 1920x1080px or larger (Full HD)
- **Aspect Ratio**: 16:9 (landscape)
- **Format**: JPG or PNG
- **File Size**: Under 500KB (optimized for web)
- **Subject**: Centered, with room for text overlay

### Upload Images to Your Server

#### Via SSH (Recommended for VPS)
```bash
# Connect to your VPS
ssh adminsak@68.178.160.108

# Create slider images directory
mkdir -p /home/adminsak/sammcabins/public/images/slider

# Exit SSH
exit

# Upload from your local machine
scp /path/to/your/image.jpg adminsak@68.178.160.108:/home/adminsak/sammcabins/public/images/slider/

# Or upload multiple images
scp /path/to/images/*.jpg adminsak@68.178.160.108:/home/adminsak/sammcabins/public/images/slider/
```

#### Via FTP/SFTP
1. Use FileZilla or similar FTP client
2. Connect to: `68.178.160.108`
3. Navigate to: `/home/adminsak/sammcabins/public/images/slider/`
4. Upload your images

#### Using Existing Images
You can also use images already in your project:
- `/images/cabins/cabin1.jpg`
- `/images/cabins/cabin2.jpg`
- `/images/gallery/image1.jpg`
- etc.

### Image URL Format
When adding slides, use these URL formats:
- **From public folder**: `/images/slider/slide1.jpg`
- **From cabins folder**: `/images/cabins/cabin1.jpg`
- **External URL**: `https://example.com/image.jpg` (not recommended)

## Default Slides

Your slider comes with 3 default slides:

### Slide 1: Premium Porta Cabins
- **Title**: Premium Porta Cabins in UAE
- **Subtitle**: SAAM Cabins - Your Trusted Partner
- **Button**: View Our Cabins → /cabins

### Slide 2: Office & Security Cabins
- **Title**: Office & Security Cabins
- **Subtitle**: Quality Solutions for Every Need
- **Button**: Explore Products → /cabins

### Slide 3: Fast Delivery
- **Title**: Fast Delivery Across UAE
- **Subtitle**: Dubai • Sharjah • Abu Dhabi • Ajman
- **Button**: Contact Us → /contact

## Customization Tips

### For Best Results
1. **Keep titles short**: 3-8 words work best
2. **Use action words**: "Discover", "Explore", "Get Started"
3. **Consistent style**: Use similar image styles for professional look
4. **Dark images work best**: Text overlay is white/light colored
5. **Limit slides**: 3-5 slides is optimal (too many = overwhelming)

### Text Overlay Tips
- Titles appear in **large white bold text**
- Subtitles appear in **amber/gold color** (brand color)
- Both are centered and responsive
- Dark overlay (50% black) makes text readable on any image

### Call-to-Action Strategy
- Slide 1: Lead to main product page (`/cabins`)
- Slide 2: Lead to specific category or feature
- Slide 3: Lead to contact form (`/contact`)
- Vary your CTAs to guide different user journeys

## Technical Details

### File Storage
- Slides data: `/data/slides.json` (auto-created)
- Images: `/public/images/slider/` (you create this)

### API Endpoints
- `GET /api/slider` - Fetch all slides
- `POST /api/slider` - Create new slide
- `PUT /api/slider?id={id}` - Update slide
- `DELETE /api/slider?id={id}` - Delete slide
- `POST /api/slider/reorder` - Reorder slides

### Auto-play Settings
To change auto-play interval, edit `/src/app/page.tsx`:
```tsx
<HeroSlider slides={slides} autoPlayInterval={5000} />
```
Change `5000` to desired milliseconds (5000 = 5 seconds)

## Troubleshooting

### Images Not Showing
1. **Check file path**: Ensure path starts with `/images/`
2. **Check file exists**: Verify image is in `public/images/` folder
3. **Check permissions**: Run `chmod 644 /home/adminsak/sammcabins/public/images/slider/*.jpg`
4. **Clear cache**: Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

### Slides Not Updating
1. **Check browser cache**: Hard refresh (Ctrl+Shift+R)
2. **Check data file**: Verify `/data/slides.json` exists and has correct content
3. **Check permissions**: Run `chmod 644 /home/adminsak/sammcabins/data/slides.json`
4. **Restart server**: `pm2 restart sammcabins`

### Slider Not Auto-playing
1. Check browser console for JavaScript errors
2. Ensure you have multiple active slides
3. Clear browser cache

## Example Workflow

### Adding Professional Slider Images

1. **Find or create images**:
   - Take photos of your porta cabins
   - Use professional stock photos
   - Ensure images show your products/services

2. **Optimize images** (online tools):
   - Visit: https://tinypng.com or https://squoosh.app
   - Upload your images
   - Download optimized versions

3. **Upload to server**:
   ```bash
   scp slide1.jpg adminsak@68.178.160.108:/home/adminsak/sammcabins/public/images/slider/
   ```

4. **Add in admin panel**:
   - Go to `/admin/slider`
   - Click "Add Slide"
   - Image URL: `/images/slider/slide1.jpg`
   - Fill in title, subtitle, button details
   - Save

5. **Preview**:
   - Click "View Homepage" button
   - See your new slide in action!

## Best Practices

### Do's ✅
- Use high-quality, professional images
- Keep text concise and readable
- Test on mobile devices
- Limit to 3-5 slides maximum
- Use consistent image styles
- Update seasonally or for promotions

### Don'ts ❌
- Don't use low-resolution images
- Don't add too much text
- Don't use more than 6 slides
- Don't mix portrait and landscape images
- Don't forget to test on mobile
- Don't use images with existing text (hard to read)

## Need Help?

If you need assistance:
1. Check this guide first
2. Review the troubleshooting section
3. Check browser console for errors (F12)
4. Verify file paths and permissions
5. Test with default slides first

Enjoy your beautiful new homepage slider! 🎉
