# Domain Setup Guide for saamzgroup.com

## Step 1: Configure DNS Records

Go to your domain registrar (where you bought saamzgroup.com) and add these DNS records:

### A Record (Main domain)
```
Type: A
Name: @
Value: 68.178.160.108
TTL: 3600
```

### A Record (www subdomain)
```
Type: A
Name: www
Value: 68.178.160.108
TTL: 3600
```

## Step 2: Install Nginx on VPS

SSH into your VPS and run:

```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

## Step 3: Configure Nginx Reverse Proxy

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/saamzgroup.com
```

Paste this configuration:

```nginx
server {
    listen 80;
    listen [::]:80;
    
    server_name saamzgroup.com www.saamzgroup.com;
    
    # Logging
    access_log /var/log/nginx/saamzgroup.access.log;
    error_log /var/log/nginx/saamzgroup.error.log;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml+rss application/rss+xml font/truetype font/opentype image/svg+xml;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/saamzgroup.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Step 4: Install SSL Certificate (HTTPS)

Install Certbot:

```bash
sudo apt install certbot python3-certbot-nginx -y
```

Get SSL certificate:

```bash
sudo certbot --nginx -d saamzgroup.com -d www.saamzgroup.com
```

Auto-renewal (should be automatic):

```bash
sudo systemctl status certbot.timer
```

## Step 5: Update Next.js Configuration

Update your `.env.production` or deployment:

```bash
NEXT_PUBLIC_BASE_URL=https://saamzgroup.com
```

## Step 6: Verify Setup

1. Wait for DNS propagation (5-30 minutes)
2. Visit: http://saamzgroup.com
3. Should redirect to: https://saamzgroup.com
4. Check SSL: https://www.ssllabs.com/ssltest/

## Troubleshooting

### Check Nginx status:
```bash
sudo systemctl status nginx
sudo nginx -t
```

### Check Nginx logs:
```bash
sudo tail -f /var/log/nginx/saamzgroup.error.log
```

### Check if port 80/443 are open:
```bash
sudo ufw status
sudo ufw allow 80
sudo ufw allow 443
```

### Test domain resolution:
```bash
nslookup saamzgroup.com
ping saamzgroup.com
```

## DNS Propagation

After adding DNS records, it may take 5-30 minutes to propagate. Check status:
- https://dnschecker.org
- https://www.whatsmydns.net

## Common Issues

1. **DNS not resolving**: Wait longer, or check DNS records
2. **502 Bad Gateway**: PM2 not running (`pm2 status`)
3. **SSL certificate fails**: Check domain points to correct IP
4. **Site not loading**: Check Nginx logs and PM2 logs
