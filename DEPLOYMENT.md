# Deployment Guide - Weather App

This guide will help you deploy your weather app to GitHub Pages or other hosting platforms.

## 🚀 Option 1: GitHub Pages (Free)

### Step 1: Install GitHub Pages Plugin

```bash
npm install --save-dev gh-pages
```

### Step 2: Update package.json

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://YOUR_USERNAME.github.io/weather-app"
}
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 3: Update vite.config.js

Add the base path for GitHub Pages:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/weather-app/'
})
```

Replace `weather-app` with your repository name.

### Step 4: Deploy

```bash
npm run deploy
```

This will:
1. Build your app
2. Deploy to the `gh-pages` branch
3. Make it available at `https://YOUR_USERNAME.github.io/weather-app`

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select `gh-pages` branch
4. Click **Save**

Your site will be live in a few minutes!

---

## 🌐 Option 2: Vercel (Recommended - Easiest)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Deploy

```bash
vercel
```

Follow the prompts:
- Link to existing project or create new
- Confirm project settings
- Deploy!

Your app will be live instantly with a URL like `https://weather-app.vercel.app`

### Alternative: Deploy via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Sign in with GitHub
4. Click **New Project**
5. Import your repository
6. Click **Deploy**

Vercel will automatically:
- Detect it's a Vite + React project
- Build and deploy
- Set up automatic deployments on every push

---

## ☁️ Option 3: Netlify

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Build and Deploy

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Alternative: Deploy via GitHub

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Sign in with GitHub
4. Click **New site from Git**
5. Select your repository
6. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
7. Click **Deploy site**

---

## 📦 Option 4: Manual Deployment

### Step 1: Build

```bash
npm run build
```

### Step 2: Upload dist folder

Upload the contents of the `dist` folder to any web hosting service:
- Shared hosting (cPanel, etc.)
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- Any static hosting service

---

## 🔧 Important Notes

### Base Path Configuration

If deploying to a subdirectory (like GitHub Pages), make sure to:
1. Set the `base` in `vite.config.js`
2. Update all asset paths if needed

### Environment Variables

If you need to add API keys later:
1. Create a `.env` file (add to `.gitignore`)
2. Use `import.meta.env.VITE_YOUR_VAR` in code
3. Configure in your hosting platform

### CORS Issues

The Open-Meteo API doesn't require CORS configuration, but if you switch APIs:
- Configure CORS headers
- Use a proxy if needed

---

## ✅ Post-Deployment Checklist

- [ ] Test the live URL
- [ ] Verify all features work
- [ ] Check mobile responsiveness
- [ ] Test search functionality
- [ ] Verify unit switching
- [ ] Check loading and error states
- [ ] Update README with live URL
- [ ] Share your project! 🎉

---

## 🆘 Troubleshooting

### 404 Errors on GitHub Pages

- Make sure `base` in `vite.config.js` matches your repo name
- Ensure `homepage` in `package.json` is correct
- Check that `gh-pages` branch exists

### Assets Not Loading

- Verify asset paths are relative
- Check that `base` path is correct
- Clear browser cache

### Build Fails

- Check Node.js version (should be 16+)
- Delete `node_modules` and reinstall
- Check for TypeScript errors if using TS

---

## 🎉 You're Done!

Your weather app is now live! Share it with the world and get feedback from the Frontend Mentor community.

