# Deployment Guide for WordPress Subdomain

This guide will help you deploy the Seller Net Proceeds Calculator as a standalone page on a WordPress subdomain (e.g., `calculator.yourdomain.com`).

## 📋 Prerequisites

1. WordPress hosting with subdomain capability
2. FTP/SFTP access or cPanel File Manager
3. Built production files from `dist/` folder

## 🚀 Deployment Steps

### Step 1: Build the Application

```bash
npm install
npm run build
```

This will create all necessary files in the `dist/` folder:
- `index.html` - Main HTML file (main entry point)
- `bundle.js` - All JavaScript bundled
- `styles.css` - All CSS styles
- `tool.html` - Prerendered HTML (optional, not needed for standalone)

**Note:** After building, copy the `.htaccess` file from the project root to the `dist/` folder:
```bash
# Linux/Mac
cp .htaccess dist/

# Windows
copy .htaccess dist\
```

Or use the deployment script:
```bash
# Linux/Mac
./deploy.sh

# Windows
deploy.bat
```

### Step 2: Set Up Subdomain

1. **In cPanel or WordPress hosting panel:**
   - Go to Subdomains section
   - Create a new subdomain (e.g., `calculator`)
   - Point it to a directory (e.g., `public_html/calculator` or `calculator.yourdomain.com`)

2. **Note the subdomain directory path** - you'll upload files here

### Step 3: Upload Files

Upload these files from the `dist/` folder to your subdomain directory:

```
calculator.yourdomain.com/
├── index.html
├── bundle.js
├── styles.css
└── .htaccess (optional, for clean URLs)
```

**Important:** Upload all files to the root of the subdomain directory, not in a subfolder.

### Step 4: Configure .htaccess (Optional but Recommended)

If your hosting supports `.htaccess`, upload the provided `.htaccess` file to:
- Enable proper MIME types
- Set caching headers
- Handle routing (if needed)

### Step 5: Verify Deployment

1. Visit your subdomain: `https://calculator.yourdomain.com`
2. The calculator should load and function properly
3. Test all features (input fields, calculations, theme toggle)

## 📁 File Structure on Server

```
public_html/
└── calculator/          (or your subdomain directory)
    ├── index.html       ← Main entry point
    ├── bundle.js        ← All JavaScript
    ├── styles.css       ← All CSS
    └── .htaccess        ← Server configuration
```

## 🔧 Troubleshooting

### Issue: Styles not loading
- **Solution:** Check that `styles.css` is in the same directory as `index.html`
- Verify file paths in `index.html` are relative (not absolute)

### Issue: JavaScript not working
- **Solution:** Check browser console for errors
- Verify `bundle.js` is uploaded and accessible
- Check file permissions (should be 644)

### Issue: 404 errors
- **Solution:** Ensure `.htaccess` is uploaded (if using)
- Check subdomain directory path is correct
- Verify file names match exactly (case-sensitive)

### Issue: CORS errors
- **Solution:** This shouldn't happen with standalone deployment
- If using API calls, ensure CORS headers are set on server

## 🔒 Security Considerations

1. **File Permissions:**
   - HTML/CSS/JS files: `644`
   - Directories: `755`

2. **HTTPS:**
   - Ensure SSL certificate is installed for subdomain
   - Force HTTPS redirect if needed

3. **No Sensitive Data:**
   - All calculations are client-side
   - No API keys or secrets in client code

## 📝 Notes

- The app is fully self-contained (no external dependencies except CDN Tailwind)
- All assets are bundled into single files for fast loading
- Works offline after initial load (except for CDN resources)
- No database required - pure static files

## 🎯 Quick Checklist

- [ ] Build completed successfully (`npm run build`)
- [ ] Subdomain created and pointing to directory
- [ ] All files uploaded to subdomain directory
- [ ] `.htaccess` uploaded (if using)
- [ ] File permissions set correctly
- [ ] SSL certificate active
- [ ] Tested on subdomain URL
- [ ] All features working correctly

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify all files are uploaded
3. Check file paths in `index.html`
4. Ensure subdomain DNS is properly configured

