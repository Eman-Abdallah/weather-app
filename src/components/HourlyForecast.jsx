import { useState, useRef, useEffect } from 'react'
import { getWeatherIcon } from '../utils/api'

const HourlyForecast = ({ data, dailyData, selectedDay, onDaySelect, units }) => {
  const [isDaySelectorOpen, setIsDaySelectorOpen] = useState(false)
  const daySelectorRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (daySelectorRef.current && !daySelectorRef.current.contains(event.target)) {
        setIsDaySelectorOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!data || !data.time) return null

  const tempUnit = units.temperature === 'celsius' ? '°C' : '°F'
  
  // Get the start of the selected day
  const selectedDate = dailyData.time[selectedDay]
  const selectedDateStart = new Date(selectedDate)
  selectedDateStart.setHours(0, 0, 0, 0)
  
  const selectedDateEnd = new Date(selectedDateStart)
  selectedDateEnd.setHours(23, 59, 59, 999)

  // Filter hourly data for the selected day
  const hourlyForDay = data.time
    .map((time, index) => ({
      time: new Date(time),
      temperature: data.temperature[index],
      weatherCode: data.weatherCode[index],
      precipitationProbability: data.precipitationProbability[index]
    }))
    .filter(item => 
      item.time >= selectedDateStart && item.time <= selectedDateEnd
    )
    .slice(0, 24) // Limit to 24 hours

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const formatDayName = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long' })
    }
  }

  return (
    <div className='hourly-style bg-neutral-800 rounded-xl  border border-neutral-700'>

      <div className="p-4 md:px-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-xl md:text-2xl  font-bricolage">Hourly forecast</h3>
        <div className="relative" ref={daySelectorRef}>
          <button
            onClick={() => setIsDaySelectorOpen(!isDaySelectorOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-700 border border-neutral-700 rounded-xl hover:bg-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className=" font-medium">{formatDayName(selectedDate)}</span>
            <img 
              src="/assets/images/icon-dropdown.svg" 
              alt="Dropdown" 
              className={`w-4 h-4 transition-transform ${isDaySelectorOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {isDaySelectorOpen && (
            <div className="absolute top-full mt-2 right-0 bg-neutral-700 rounded-xl shadow-xl p-2 min-w-[180px] z-50 border border-neutral-600">
              {dailyData.time.slice(0, 7).map((date, index) => (
                <button
                  key={date}
                  onClick={() => {
                    onDaySelect(index)
                    setIsDaySelectorOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedDay === index
                      ? 'bg-neutral-600 text-white'
                      : 'hover:bg-neutral-700 text-neutral-0'
                  }`}
                >
                  {formatDayName(date)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
        <div className="space-y-3">
          {hourlyForDay.length > 0 ? (
            hourlyForDay.map((hour, index) => (
              <div
                key={index}
                className="flex items-center bg-neutral-700 border border-neutral-600 justify-between p-3 rounded-lg hover:bg-neutral-700/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                <img
                    src={`/assets/images/${getWeatherIcon(hour.weatherCode)}`}
                    alt="Weather"
                    className="w-8 h-8"
                  />
                  <div className="  font-medium min-w-[60px]">
                    {formatTime(hour.time)}
                  </div>
                  
                </div>
                <div className="text-lg text-neutral-300 font-bricolage">
                  {Math.round(hour.temperature)}{tempUnit}
                </div>
              </div>
            ))
          ) : (
            <div className="text-neutral-300 text-center py-4">
              No hourly data available for this day
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HourlyForecast

