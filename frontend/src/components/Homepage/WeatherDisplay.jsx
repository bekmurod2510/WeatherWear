import { useState } from 'react'
import axios from 'axios'

const WeatherDisplay = ({ weatherData, onGetOutfitSuggestions }) => {
  const [loading, setLoading] = useState(false)
  const [outfitError, setOutfitError] = useState('')

  if (!weatherData) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Weather Information</h2>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🌤️</div>
            <p className="text-gray-500">Enter a location to see weather information</p>
          </div>
        </div>
      </div>
    )
  }

  const handleGetOutfitSuggestions = async () => {
    setLoading(true)
    setOutfitError('')

    try {
      await onGetOutfitSuggestions({
        location: weatherData.location,
        temperature: weatherData.temperature,
        conditions: weatherData.conditions
      })
    } catch (error) {
      setOutfitError('Failed to get outfit suggestions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-start mb-4">
          <h2 className="card-title text-2xl">
            📍 {weatherData.location}, {weatherData.country}
          </h2>
          <div className="badge badge-primary badge-lg">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Main Weather Info */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-6xl font-bold">
                  {weatherData.temperature.toFixed(1)}°C
                </div>
                <p className="text-lg text-gray-600 capitalize">{weatherData.description}</p>
              </div>
              <div className="text-center">
                <img 
                  src={`https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
                  alt={weatherData.description}
                  className="w-32 h-32"
                />
                <p className="text-lg font-medium">{weatherData.conditions}</p>
              </div>
            </div>

            <div className="divider"></div>

            <div className="grid grid-cols-2 gap-4">
              <div className="stat p-4 bg-base-200 rounded-lg">
                <div className="stat-title">Feels Like</div>
                <div className="stat-value text-2xl">{weatherData.feelsLike.toFixed(1)}°C</div>
              </div>
              <div className="stat p-4 bg-base-200 rounded-lg">
                <div className="stat-title">Humidity</div>
                <div className="stat-value text-2xl">{weatherData.humidity}%</div>
              </div>
              <div className="stat p-4 bg-base-200 rounded-lg">
                <div className="stat-title">Wind Speed</div>
                <div className="stat-value text-2xl">{weatherData.windSpeed} m/s</div>
              </div>
              <div className="stat p-4 bg-base-200 rounded-lg">
                <div className="stat-title">Pressure</div>
                <div className="stat-value text-2xl">{weatherData.pressure || 1013} hPa</div>
              </div>
            </div>
          </div>

          {/* Right Column - Additional Info & Actions */}
          <div className="space-y-6">
            <div className="card bg-primary text-primary-content">
              <div className="card-body">
                <h3 className="card-title">Outfit Recommendations</h3>
                <p>Get personalized clothing suggestions based on this weather</p>
                {outfitError && (
                  <div className="alert alert-error mt-2">
                    <span>{outfitError}</span>
                  </div>
                )}
                <div className="card-actions justify-end mt-4">
                  <button 
                    className={`btn btn-secondary ${loading ? 'loading' : ''}`}
                    onClick={handleGetOutfitSuggestions}
                    disabled={loading}
                  >
                    {loading ? 'Generating...' : 'Get Outfit Suggestions'}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg">Weather Insights</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>
                    {weatherData.temperature > 25 
                      ? 'Hot weather - Light clothing recommended'
                      : weatherData.temperature > 15
                      ? 'Pleasant weather - Comfortable clothing'
                      : 'Cool weather - Layer up for warmth'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  <span>
                    {weatherData.humidity > 70 
                      ? 'High humidity - Breathable fabrics recommended'
                      : 'Comfortable humidity level'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span>
                    {weatherData.windSpeed > 5 
                      ? 'Windy conditions - Consider windproof clothing'
                      : 'Calm wind conditions'}
                  </span>
                </div>
              </div>
            </div>

            <div className="alert alert-info">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Data updates automatically. Last updated just now.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherDisplay