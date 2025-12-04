// Open-Meteo API integration

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast'

// Fetch location coordinates from city name
export const fetchLocationCoordinates = async (cityName) => {
  try {
    const response = await fetch(
      `${GEOCODING_API}?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch location')
    }
    
    const data = await response.json()
    
    if (!data.results || data.results.length === 0) {
      return null
    }
    
    const location = data.results[0]
    return {
      latitude: location.latitude,
      longitude: location.longitude,
      name: location.name,
      country: location.country,
      admin1: location.admin1 || ''
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error)
    throw error
  }
}

// Fetch weather data
export const fetchWeatherData = async (latitude, longitude, units) => {
  try {
    const temperatureUnit = units.temperature === 'celsius' ? 'celsius' : 'fahrenheit'
    const windSpeedUnit = units.windSpeed === 'kmh' ? 'kmh' : 'mph'
    const precipitationUnit = units.precipitation === 'mm' ? 'mm' : 'in'
    
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'weather_code',
        'wind_speed_10m',
        'precipitation'
      ].join(','),
      hourly: [
        'temperature_2m',
        'weather_code',
        'precipitation_probability'
      ].join(','),
      daily: [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'precipitation_sum'
      ].join(','),
      timezone: 'auto',
      forecast_days: 7,
      temperature_unit: temperatureUnit,
      wind_speed_unit: windSpeedUnit,
      precipitation_unit: precipitationUnit
    })
    
    const response = await fetch(`${WEATHER_API}?${params}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data')
    }
    
    const data = await response.json()
    
    return {
      current: {
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        weatherCode: data.current.weather_code,
        windSpeed: data.current.wind_speed_10m,
        precipitation: data.current.precipitation
      },
      hourly: {
        time: data.hourly.time,
        temperature: data.hourly.temperature_2m,
        weatherCode: data.hourly.weather_code,
        precipitationProbability: data.hourly.precipitation_probability
      },
      daily: {
        time: data.daily.time,
        weatherCode: data.daily.weather_code,
        temperatureMax: data.daily.temperature_2m_max,
        temperatureMin: data.daily.temperature_2m_min,
        precipitationSum: data.daily.precipitation_sum
      },
      coords: { latitude, longitude }
    }
  } catch (error) {
    console.error('Error fetching weather:', error)
    throw error
  }
}

// Weather code to icon mapping
export const getWeatherIcon = (code) => {
  // WMO Weather interpretation codes (WW)
  // 0: Clear sky
  // 1-3: Mainly clear, partly cloudy, overcast
  // 45-48: Fog
  // 51-55: Drizzle
  // 61-65: Rain
  // 71-77: Snow
  // 80-82: Rain showers
  // 85-86: Snow showers
  // 95-99: Thunderstorm
  
  if (code === 0) return 'icon-sunny.webp'
  if (code >= 1 && code <= 3) return 'icon-partly-cloudy.webp'
  if (code >= 45 && code <= 48) return 'icon-fog.webp'
  if (code >= 51 && code <= 55) return 'icon-drizzle.webp'
  if (code >= 61 && code <= 65 || (code >= 80 && code <= 82)) return 'icon-rain.webp'
  if (code >= 71 && code <= 77 || (code >= 85 && code <= 86)) return 'icon-snow.webp'
  if (code >= 95 && code <= 99) return 'icon-storm.webp'
  return 'icon-overcast.webp'
}

