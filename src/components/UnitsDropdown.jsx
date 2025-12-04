import { useState, useRef, useEffect } from 'react'

const UnitsDropdown = ({ units, setUnits }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleTemperatureChange = (temp) => {
    setUnits(prev => ({
      ...prev,
      temperature: temp,
      system: temp === 'celsius' && prev.windSpeed === 'kmh' && prev.precipitation === 'mm' ? 'metric' : 
               temp === 'fahrenheit' && prev.windSpeed === 'mph' && prev.precipitation === 'in' ? 'imperial' : prev.system
    }))
  }

  const handleWindSpeedChange = (wind) => {
    setUnits(prev => ({
      ...prev,
      windSpeed: wind,
      system: prev.temperature === 'celsius' && wind === 'kmh' && prev.precipitation === 'mm' ? 'metric' :
               prev.temperature === 'fahrenheit' && wind === 'mph' && prev.precipitation === 'in' ? 'imperial' : prev.system
    }))
  }

  const handlePrecipitationChange = (precip) => {
    setUnits(prev => ({
      ...prev,
      precipitation: precip,
      system: prev.temperature === 'celsius' && prev.windSpeed === 'kmh' && precip === 'mm' ? 'metric' :
               prev.temperature === 'fahrenheit' && prev.windSpeed === 'mph' && precip === 'in' ? 'imperial' : prev.system
    }))
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 border border-neutral-600 hover:border-neutral-600"
        aria-label="Units dropdown"
        aria-expanded={isOpen}
      >
        <img 
          src="/assets/images/icon-units.svg" 
          alt="Units" 
          className="w-5 h-5"
        />
        <span className="font-medium">Units</span>
        <img 
          src="/assets/images/icon-dropdown.svg" 
          alt="Dropdown" 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-neutral-800 rounded-xl shadow-xl p-5 min-w-[320px] z-50 border border-neutral-600">
          <p className="text-sm text-neutral-300 mb-4 font-medium">Switch to Imperial/Metric</p>
          
          {/* Temperature */}
          <div className="">
            <div className="text-sm font-medium text-neutral-300 mb-2">Temperature</div>
            <div className="space-y-2">
              <button
                onClick={() => handleTemperatureChange('celsius')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors relative ${
                  units.temperature === 'celsius'
                    ? 'bg-neutral-700 text-white border border-neutral-600'
                    : 'bg-neutral-800 hover:bg-neutral-600 text-neutral-0'
                }`}
              >
                <span>Celsius (°C)</span>
                {units.temperature === 'celsius' && (
                  <img 
                    src="/assets/images/icon-checkmark.svg" 
                    alt="Selected" 
                    className="absolute top-2 right-3 w-4 h-4"
                  />
                )}
              </button>
              <button
                onClick={() => handleTemperatureChange('fahrenheit')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors relative ${
                  units.temperature === 'fahrenheit'
                    ? 'bg-neutral-700 text-white border border-neutral-600'
                    : 'bg-neutral-800 hover:bg-neutral-600 text-neutral-0'
                }`}
              >
                <span>Fahrenheit (°F)</span>
                {units.temperature === 'fahrenheit' && (
                  <img 
                    src="/assets/images/icon-checkmark.svg" 
                    alt="Selected" 
                    className="absolute top-2 right-3 w-4 h-4"
                  />
                )}
              </button>
            </div>
          </div>
          <div className="divider"></div>
          {/* Wind Speed */}
          <div className="">
            <div className="text-sm font-medium text-neutral-300 mb-2">Wind Speed</div>
            <div className="space-y-2">
              <button
                onClick={() => handleWindSpeedChange('kmh')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors relative ${
                  units.windSpeed === 'kmh'
                    ? 'bg-neutral-700 text-white border border-neutral-600'
                    : 'bg-neutral-800 hover:bg-neutral-600 text-neutral-0'
                }`}
              >
                <span>km/h</span>
                {units.windSpeed === 'kmh' && (
                  <img 
                    src="/assets/images/icon-checkmark.svg" 
                    alt="Selected" 
                    className="absolute top-2 right-3 w-4 h-4"
                  />
                )}
              </button>
              <button
                onClick={() => handleWindSpeedChange('mph')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors relative ${
                  units.windSpeed === 'mph'
                    ? 'bg-neutral-700 text-white border border-neutral-600'
                    : 'bg-neutral-800 hover:bg-neutral-600 text-neutral-0'
                }`}
              >
                <span>mph</span>
                {units.windSpeed === 'mph' && (
                  <img 
                    src="/assets/images/icon-checkmark.svg" 
                    alt="Selected" 
                    className="absolute top-2 right-3 w-4 h-4"
                  />
                )}
              </button>
            </div>
          </div>
          <div className="divider"></div>
          {/* Precipitation */}
          <div>
            <div className="text-sm font-medium text-neutral-300 mb-2">Precipitation</div>
            <div className="space-y-2">
              <button
                onClick={() => handlePrecipitationChange('mm')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors relative ${
                  units.precipitation === 'mm'
                    ? 'bg-neutral-700 text-white'
                    : 'bg-neutral-800 hover:bg-neutral-600 text-neutral-0'
                }`}
              >
                <span>Millimeters (mm)</span>
                {units.precipitation === 'mm' && (
                  <img 
                    src="/assets/images/icon-checkmark.svg" 
                    alt="Selected" 
                    className="absolute top-2 right-3 w-4 h-4"
                  />
                )}
              </button>
              <button
                onClick={() => handlePrecipitationChange('in')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors relative ${
                  units.precipitation === 'in'
                    ? 'bg-neutral-700 text-white'
                    : 'bg-neutral-800 hover:bg-neutral-600 text-neutral-0'
                }`}
              >
                <span>Inches (in)</span>
                {units.precipitation === 'in' && (
                  <img 
                    src="/assets/images/icon-checkmark.svg" 
                    alt="Selected" 
                    className="absolute top-2 right-3 w-4 h-4"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UnitsDropdown

