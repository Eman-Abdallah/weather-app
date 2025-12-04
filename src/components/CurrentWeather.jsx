import { getWeatherIcon } from '../utils/api'

const CurrentWeather = ({ data, location, units }) => {
  if (!data) return null

  const weatherIcon = getWeatherIcon(data.weatherCode)
  const tempUnit = units.temperature === 'celsius' ? '°' : '°'
  const windUnit = units.windSpeed === 'kmh' ? 'km/h' : 'mph'
  const precipUnit = units.precipitation === 'mm' ? 'mm' : 'in'

  // Calculate "feels like" temperature (simplified - in real app, use proper formula)
  const feelsLike = Math.round(data.temperature * 0.95)

  return (
    <div className="relative rounded-2xl overflow-hidden ">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/assets/images/bg-today-small.svg" 
          alt="" 
          className="w-full  object-cover md:hidden"
        />
        <img 
          src="/assets/images/bg-today-large.svg" 
          alt="" 
          className="hidden md:block w-full  object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8">
        {/* Location */}
        <div className="flex justify-between gap-4 md:gap-6 mb-8 md:mb-10 items-center ">
        <div className="">
          <h2 className="text-2xl md:text-3xl lg:text-4xl  mb-1 font-bricolage">
            {location.name}
            {location.admin1 && `, ${location.admin1}`}
          </h2>
          <p className="text-neutral-300 text-lg">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Main Temperature and Icon */}
        <div className="flex  gap-4 md:gap-6 mb-8 md:mb-10 mt-12">
        <div className="flex items-center gap-3">
              <img 
                src={`/assets/images/${weatherIcon}`} 
                alt="Weather condition" 
                className="w-12 h-12 md:w-20 md:h-20"
              />
            </div>
            <div className="text-7xl md:text-8xl lg:text-9xl  mb-3 font-bricolage ">
              {Math.round(data.temperature)}{tempUnit}
            </div>
          
         
        </div>
        </div>

      </div>
        {/* Metrics Grid */}
        <div className="grid grid-cols-4 gap-4 mt-12 ">
          <div className="bg-neutral-800 backdrop-blur-sm rounded-xl p-4 border border-neutral-600">
            <div className=" text-neutral-300 mb-4">Feels like</div>
            <div className="text-2xl md:text-3xl  font-bricolage">
              {feelsLike}{tempUnit}
            </div>
          </div>

          <div className="bg-neutral-800 backdrop-blur-sm rounded-xl p-4 border border-neutral-600">
            <div className=" text-neutral-300 mb-4">Humidity</div>
            <div className="text-2xl md:text-3xl  font-bricolage">
              {data.humidity}%
            </div>
          </div>

          <div className="bg-neutral-800 backdrop-blur-sm rounded-xl p-4 border border-neutral-600">
            <div className=" text-neutral-300 mb-4">Wind</div>
            <div className="text-2xl md:text-3xl  font-bricolage">
              {Math.round(data.windSpeed)} {windUnit}
            </div>
          </div>

          <div className="bg-neutral-800 backdrop-blur-sm rounded-xl p-4 border border-neutral-600">
            <div className=" text-neutral-300 mb-4">Precipitation</div>
            <div className="text-2xl md:text-3xl  font-bricolage">
              {data.precipitation.toFixed(1)} {precipUnit}
            </div>
          </div>
        </div>
    </div>
  )
}

export default CurrentWeather

