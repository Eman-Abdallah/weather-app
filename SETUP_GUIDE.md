# Weather App - Setup & Development Guide

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

### Step 3: Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Step 4: Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
weather-app-main/
├── assets/
│   ├── fonts/          # DM Sans & Bricolage Grotesque fonts
│   └── images/          # Weather icons, logos, backgrounds
├── design/              # Design mockups (reference)
├── src/
│   ├── components/      # React components
│   │   ├── UnitsDropdown.jsx
│   │   ├── SearchBar.jsx
│   │   ├── CurrentWeather.jsx
│   │   ├── DailyForecast.jsx
│   │   ├── HourlyForecast.jsx
│   │   ├── LoadingState.jsx
│   │   ├── ErrorState.jsx
│   │   └── NoResultsState.jsx
│   ├── utils/
│   │   └── api.js      # Open-Meteo API integration
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # React entry point
│   └── index.css       # Global styles & font imports
├── index.html
├── package.json
├── tailwind.config.js  # Tailwind configuration
├── vite.config.js      # Vite configuration
└── postcss.config.js   # PostCSS configuration
```

## 🎨 Features Implemented

✅ **Search Functionality**
- Search for any city worldwide
- Real-time location geocoding
- Error handling for invalid locations

✅ **Current Weather Display**
- Temperature with unit conversion
- Weather condition icons
- Location name and country
- Feels like temperature
- Humidity percentage
- Wind speed
- Precipitation amount

✅ **7-Day Forecast**
- Daily high/low temperatures
- Weather condition icons
- Interactive day selection
- Responsive grid layout

✅ **Hourly Forecast**
- 24-hour temperature forecast
- Weather condition icons
- Precipitation probability
- Scrollable horizontal layout
- Updates based on selected day

✅ **Unit System Toggle**
- Switch between Metric and Imperial
- Automatic unit conversion for:
  - Temperature (Celsius/Fahrenheit)
  - Wind Speed (km/h or mph)
  - Precipitation (mm or in)

✅ **State Management**
- Loading states with spinner
- Error states with retry functionality
- No results state for invalid searches
- Smooth transitions

✅ **Responsive Design**
- Mobile-first approach
- Desktop layout optimization
- Touch-friendly interactions
- Accessible focus states

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Open-Meteo API** - Free weather API (no key required)

## 📱 API Integration

The app uses the [Open-Meteo API](https://open-meteo.com/):
- **Geocoding API**: Converts city names to coordinates
- **Weather API**: Fetches current, hourly, and daily forecasts

No API key required! The API is completely free.

## 🎯 Testing Checklist

Before deploying, test the following:

- [ ] Search for a valid city (e.g., "New York")
- [ ] Search for an invalid city (should show no results)
- [ ] Toggle between Metric and Imperial units
- [ ] Select different days in the daily forecast
- [ ] Verify hourly forecast updates when selecting different days
- [ ] Test on mobile viewport (375px)
- [ ] Test on desktop viewport (1440px)
- [ ] Check all hover states
- [ ] Check all focus states
- [ ] Verify loading spinner appears during search
- [ ] Test error state retry functionality

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically use the next available port.

### Fonts Not Loading
Make sure the font files are in `assets/fonts/` and the paths in `src/index.css` are correct.

### API Errors
- Check your internet connection
- Verify the Open-Meteo API is accessible
- Check browser console for detailed error messages

### Build Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear Vite cache: `rm -rf node_modules/.vite`

## 📝 Next Steps

1. **Customize**: Update the footer attribution with your name
2. **Enhance**: Add more features like:
   - Weather alerts
   - Historical data
   - Multiple location favorites
   - Dark/light theme toggle
3. **Deploy**: Follow the deployment guide below

