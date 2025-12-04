import { useState, useEffect } from 'react'
import UnitsDropdown from './components/UnitsDropdown'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import DailyForecast from './components/DailyForecast'
import HourlyForecast from './components/HourlyForecast'
import LoadingState from './components/LoadingState'
import ErrorState from './components/ErrorState'
import NoResultsState from './components/NoResultsState'
import { fetchWeatherData, fetchLocationCoordinates } from './utils/api'

function App() {
  const [units, setUnits] = useState({
    system: 'metric', // 'metric' or 'imperial'
    temperature: 'celsius', // 'celsius' or 'fahrenheit'
    windSpeed: 'kmh', // 'kmh' or 'mph'
    precipitation: 'mm' // 'mm' or 'in'
  })
  
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedDay, setSelectedDay] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch weather data when location changes
  const handleSearch = async (query) => {
    if (!query.trim()) return
    
    setLoading(true)
    setError(null)
    setSearchQuery(query)
    
    try {
      const coords = await fetchLocationCoordinates(query)
      if (!coords) {
        setError('no-results')
        setLoading(false)
        return
      }
      
      const data = await fetchWeatherData(coords.latitude, coords.longitude, units)
      setWeatherData({
        ...data,
        location: coords
      })
      setSelectedDay(0)
      setError(null)
    } catch (err) {
      setError('api-error')
      console.error('Error fetching weather:', err)
    } finally {
      setLoading(false)
    }
  }

  // Update weather data when units change
  useEffect(() => {
    if (weatherData && weatherData.coords) {
      const updateWeather = async () => {
        try {
          const data = await fetchWeatherData(
            weatherData.coords.latitude, 
            weatherData.coords.longitude, 
            units
          )
          setWeatherData({
            ...data,
            location: weatherData.location
          })
        } catch (err) {
          console.error('Error updating weather:', err)
        }
      }
      updateWeather()
    }
  }, [units.temperature, units.windSpeed, units.precipitation])

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-0 font-dm-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-6 md:py-8 max-w-[1440px]">
        {/* Header with Logo and Units Dropdown */}
        <header className="mb-6 md:mb-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src="/assets/images/logo.svg" 
              alt="Weather Now"
            />
            {/* <span className="text-xl md:text-2xl font-bold font-bricolage">Weather Now</span> */}
          </div>
          <UnitsDropdown units={units} setUnits={setUnits} />
        </header>

        {/* Main Content */}
        <main>
          {/* Search Section */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 font-bricolage text-center">
              How's the sky looking today?
            </h1>
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>

          {/* Loading State */}
          {loading && <LoadingState />}

          {/* Error States */}
          {error === 'api-error' && <ErrorState onRetry={() => handleSearch(searchQuery)} />}
          {error === 'no-results' && <NoResultsState />}

          {/* Weather Content */}
          {!loading && !error && weatherData && (
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 md:gap-8">
              {/* Left Column - Current Weather & Daily Forecast */}
              <div className="lg:col-span-1 space-y-6 md:space-y-8">
                <CurrentWeather 
                  data={weatherData.current} 
                  location={weatherData.location}
                  units={units}
                />
                
                <DailyForecast 
                  data={weatherData.daily} 
                  units={units}
                  selectedDay={selectedDay}
                  onDaySelect={setSelectedDay}
                />
              </div>

              {/* Right Column - Hourly Forecast */}
              <div className="lg:col-span-1">
                <HourlyForecast 
                  data={weatherData.hourly} 
                  dailyData={weatherData.daily}
                  selectedDay={selectedDay}
                  onDaySelect={setSelectedDay}
                  units={units}
                />
              </div>
            </div>
          )}

          {/* Initial State - No search yet */}
          {!loading && !error && !weatherData && (
            <div className="text-center py-12 text-neutral-300">
              <p className="text-lg">Search for a city to see the weather</p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-neutral-700">
          <div className="text-center text-sm text-neutral-300">
            Challenge by{' '}
            <a 
              href="https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-400"
            >
              Frontend Mentor
            </a>
            . Coded by{' '}
            <a 
              href="#" 
              className="text-blue-500 hover:text-blue-400"
            >
              Eman Shaltout
            </a>
            .
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App

