# 🚀 Quick Start Guide

## Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser to http://localhost:5173
```

## Test the App

1. **Search for a city**: Type "New York" or any city name
2. **Toggle units**: Click "Units" dropdown and switch between Metric/Imperial
3. **Select a day**: Click on any day in the 7-day forecast
4. **View hourly**: Scroll through the hourly forecast for the selected day

## Build for Production

```bash
npm run build
```

Output will be in the `dist` folder.

## Deploy to GitHub

### Quick Deploy (GitHub Pages)

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# Update vite.config.js base to "/your-repo-name/"

# Deploy
npm run deploy
```

### Or Use Vercel (Easiest)

1. Push code to GitHub
2. Go to vercel.com
3. Import repository
4. Deploy!

See `DEPLOYMENT.md` for detailed instructions.

## Project Structure

- `src/components/` - All React components
- `src/utils/api.js` - API integration
- `src/App.jsx` - Main app
- `assets/` - Fonts and images
- `tailwind.config.js` - Tailwind configuration

## Features

✅ City search  
✅ Current weather  
✅ 7-day forecast  
✅ Hourly forecast  
✅ Unit switching (Metric/Imperial)  
✅ Loading states  
✅ Error handling  
✅ Responsive design  

## Need Help?

- Check `SETUP_GUIDE.md` for detailed setup
- Check `DEPLOYMENT.md` for deployment
- Check `PROJECT_SUMMARY.md` for overview

