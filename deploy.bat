@echo off
REM Deployment script for WordPress subdomain (Windows)
REM This script builds the app and prepares files for deployment

echo 🚀 Building application...
call npm run build

echo 📦 Copying deployment files...
copy .htaccess dist\

echo ✅ Build complete!
echo.
echo 📁 Files ready for deployment in 'dist\' folder:
echo    - index.html
echo    - bundle.js
echo    - styles.css
echo    - .htaccess
echo.
echo 📤 Upload these files to your WordPress subdomain directory
echo    Example: public_html\calculator\
echo.
echo 🌐 After uploading, visit your subdomain to verify
pause

