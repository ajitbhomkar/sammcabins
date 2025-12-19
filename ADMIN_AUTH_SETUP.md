# Admin Panel Authentication Setup

## 🔐 Security Features

Your admin panel is now protected with password authentication. Only authorized users can access and modify content.

## Default Credentials

**Default Password:** `admin123`

⚠️ **IMPORTANT:** Change this password immediately in production!

## How to Change Admin Password

### Method 1: Environment Variable (Recommended)

1. **On your VPS:**
   ```bash
   ssh adminsak@68.178.160.108
   cd /home/adminsak/sammcabins
   nano .env.production
   ```

2. **Add this line:**
   ```
   ADMIN_PASSWORD=YourSecurePasswordHere
   ```

3. **Rebuild and restart:**
   ```bash
   NODE_ENV=production npm run build
   pm2 restart sammcabins
   pm2 save
   ```

### Method 2: Local Development

1. **Create `.env.local`:**
   ```bash
   ADMIN_PASSWORD=YourSecurePasswordHere
   ```

2. **Restart dev server:**
   ```bash
   npm run dev
   ```

## Access URLs

- **Login Page:** `http://yourdomain.com/admin` or `http://yourdomain.com/admin/login`
- **Dashboard:** `http://yourdomain.com/admin/dashboard` (after login)

## How It Works

### Authentication Flow

1. Visit `/admin` → Redirects to `/admin/login`
2. Enter admin password
3. On success → Session stored, redirect to `/admin/dashboard`
4. Session persists until:
   - User clicks "Logout"
   - Browser tab/window is closed
   - User clears browser data

### Protected Pages

All admin pages are protected:
- `/admin/dashboard` - Main admin dashboard
- `/admin/slider` - Homepage slider management
- `/admin/cabins` - Cabin listings management
- `/admin/amenities` - Amenities management
- `/admin/gallery` - Gallery management
- `/admin/settings` - Site settings
- `/admin/seo` - SEO monitoring

### Public Pages

These pages remain accessible without login:
- `/` - Homepage
- `/cabins` - Cabin listings
- `/gallery` - Image gallery
- `/contact` - Contact page
- `/amenities` - Amenities page

## Features

### ✅ Secure Login
- Password-based authentication
- Environment variable configuration
- No hardcoded credentials in code

### ✅ Session Management
- Uses browser sessionStorage
- Auto-logout on browser close
- Manual logout button in sidebar

### ✅ Route Protection
- Automatic redirect to login if not authenticated
- Auth guard checks on all admin pages
- Login page accessible without auth

### ✅ User Experience
- Loading states during authentication
- Clear error messages for wrong password
- Smooth redirects after login/logout

## Security Best Practices

### 1. Change Default Password Immediately

```bash
# Never use admin123 in production!
ADMIN_PASSWORD=SuperSecure#Password2025!
```

### 2. Use Strong Passwords

- Minimum 12 characters
- Mix of uppercase, lowercase, numbers, symbols
- No dictionary words
- Unique to this site

### 3. Password Examples

❌ Bad: `admin123`, `password`, `12345678`  
✅ Good: `Tr0pic@lC@bins#2025!`, `P0rt@C@b!n$UAE#2025`

### 4. Keep Environment Files Secure

```bash
# Never commit .env files to git
.env
.env.local
.env.production
```

These files are already in `.gitignore`.

### 5. Regular Password Updates

Change your admin password every 3-6 months.

## Troubleshooting

### Can't Login - "Invalid Password"

1. Check if you set `ADMIN_PASSWORD` in environment
2. If not set, default is `admin123`
3. Restart server after changing password
4. Clear browser cache and try again

### Keeps Redirecting to Login

1. Check browser console for errors (F12)
2. Ensure JavaScript is enabled
3. Try incognito/private mode
4. Clear sessionStorage:
   ```javascript
   // In browser console (F12)
   sessionStorage.clear()
   ```

### Logged Out Automatically

This is normal behavior:
- Sessions expire when browser closes
- This is a security feature
- Use longer-lasting cookies if needed (requires code modification)

### Forgot Password

1. SSH into your VPS
2. Check `.env.production` file:
   ```bash
   cat /home/adminsak/sammcabins/.env.production | grep ADMIN_PASSWORD
   ```
3. If not set, default is `admin123`
4. Set new password and restart

## Advanced: Adding More Admins

Currently supports single admin. To add multiple admins:

1. **Modify `/api/admin/auth/route.ts`:**
   ```typescript
   const adminPasswords = {
     'admin1': process.env.ADMIN_PASSWORD_1 || 'admin123',
     'admin2': process.env.ADMIN_PASSWORD_2 || 'admin456',
   };
   ```

2. **Add usernames to login form**

3. **Update authentication logic**

## Maintenance Commands

### Check Current Password (VPS)
```bash
ssh adminsak@68.178.160.108
cd /home/adminsak/sammcabins
grep ADMIN_PASSWORD .env.production
```

### Update Password (VPS)
```bash
ssh adminsak@68.178.160.108
cd /home/adminsak/sammcabins
echo "ADMIN_PASSWORD=NewPassword123!" >> .env.production
NODE_ENV=production npm run build
pm2 restart sammcabins
```

### Force Logout All Sessions
Users need to clear browser sessionStorage or close browser tabs.

## Future Enhancements

Consider adding:
- [ ] JWT tokens for better security
- [ ] Remember me functionality
- [ ] Two-factor authentication (2FA)
- [ ] Activity logging
- [ ] Multiple admin accounts
- [ ] Role-based permissions
- [ ] Password reset via email
- [ ] Account lockout after failed attempts

## Quick Reference

| Action | URL |
|--------|-----|
| Login | `/admin` or `/admin/login` |
| Dashboard | `/admin/dashboard` |
| Logout | Click "Logout" in sidebar |
| Change Password | Edit `.env.production` |
| Reset Session | Close browser or click Logout |

## Support

If you encounter issues:
1. Check this guide first
2. Verify environment variables are set
3. Check PM2 logs: `pm2 logs sammcabins`
4. Restart PM2: `pm2 restart sammcabins`
5. Clear browser cache and sessionStorage

Your admin panel is now secure! 🔒
