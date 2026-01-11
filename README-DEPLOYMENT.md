# Quick Deployment Guide

## 🚀 Deploy to WordPress Subdomain

### 1. Build the Application
```bash
npm install
npm run build
```

### 2. Files to Upload
Upload these files from the `dist/` folder to your subdomain directory:

- ✅ `index.html` (or `standalone.html`)
- ✅ `bundle.js`
- ✅ `styles.css`
- ✅ `.htaccess` (optional, for server configuration)

### 3. Upload Location
Upload to your subdomain root directory, for example:
- `public_html/calculator/` (cPanel)
- `calculator.yourdomain.com/` (subdomain directory)

### 4. File Structure on Server
```
calculator.yourdomain.com/
├── index.html       ← Main entry point
├── bundle.js        ← All JavaScript (bundled)
├── styles.css       ← All CSS styles
└── .htaccess        ← Server config (optional)
```

### 5. Verify
Visit: `https://calculator.yourdomain.com`

## 📝 Important Notes

- All files must be in the same directory
- Use relative paths (already configured)
- No database required - pure static files
- Works offline after initial load

## 🔧 Troubleshooting

**Styles not loading?**
- Check `styles.css` is in the same directory
- Verify file permissions (644)

**JavaScript not working?**
- Check browser console for errors
- Verify `bundle.js` is uploaded
- Check file permissions

**404 errors?**
- Ensure all files are in subdomain root
- Check `.htaccess` is uploaded (if using)

## 📚 Full Documentation

See `DEPLOYMENT.md` for detailed instructions.

