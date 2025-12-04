import { getWeatherIcon } from '../utils/api'

const DailyForecast = ({ data, units, selectedDay, onDaySelect }) => {
  if (!data || !data.time) return null

  const tempUnit = units.temperature === 'celsius' ? '°C' : '°F'

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' })
    }
  }

  return (
    <div>
      <h3 className="text-xl md:text-2xl  mb-4 md:mb-6 font-bricolage">Daily forecast</h3>
      <div className="grid grid-cols-7 gap-2 md:gap-3">
        {data.time.slice(0, 7).map((date, index) => {
          const isSelected = selectedDay === index
          return (
            <button
              key={date}
              onClick={() => onDaySelect(index)}
              className={`p-3 md:p-4 rounded-xl transition-all text-center ${
                isSelected
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-0 border border-neutral-600'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <div className="text-xs md:text-sm font-medium mb-2 md:mb-3">{formatDate(date)}</div>
              <div className="flex justify-center mb-2 md:mb-3">
                <img
                  src={`/assets/images/${getWeatherIcon(data.weatherCode[index])}`}
                  alt="Weather"
                  className="w-8 h-8 md:w-10 md:h-10"
                />
              </div>
              <div className="flex  items-center gap-4">
                <span className="text-base md:text-lg  font-bricolage">
                  {Math.round(data.temperatureMax[index])}{tempUnit}
                </span>
                <span className={`text-xs md:text-sm ${
                  isSelected ? 'text-white/70' : 'text-neutral-300'
                }`}>
                  {Math.round(data.temperatureMin[index])}{tempUnit}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default DailyForecast

