import { useState, useEffect } from 'react'
import axios from 'axios'
import WeatherForm from './WeatherForm'
import OutfitSuggestions from './OutfitSuggestions'

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [outfitData, setOutfitData] = useState(null)
  const [preferences, setPreferences] = useState({
    temperatureUnit: 'celsius',
    clothingStyle: 'casual'
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchUserPreferences()
  }, [])

  const fetchUserPreferences = async () => {
    try {
      const response = await axios.get('https://weatherwear-3qko.onrender.com/api/auth/me', {
        withCredentials: true
      })
      if (response.data.user?.preferences) {
        setPreferences(response.data.user.preferences)
      }
    } catch (error) {
      console.error('Failed to fetch preferences:', error)
    }
  }

  const handleWeatherData = async (data) => {
    setWeatherData(data)
    setOutfitData(null)
    
    // Automatically get outfit suggestions
    try {
      setLoading(true)
      const response = await axios.post(
        'https://weatherwear-3qko.onrender.com/api/outfit/suggest',
        {
          location: data.location,
          temperature: data.temperature,
          conditions: data.conditions
        },
        { withCredentials: true }
      )
      setOutfitData(response.data.data)
    } catch (error) {
      console.error('Failed to get outfit suggestions:', error)
    } finally {
      setLoading(false)
    }
  }

  const updatePreferences = async (updates) => {
    try {
      const response = await axios.post(
        'https://weatherwear-3qko.onrender.com/api/outfit/preferences',
        updates,
        { withCredentials: true }
      )
      setPreferences(response.data.data)
    } catch (error) {
      console.error('Failed to update preferences:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Weather Form & Preferences */}
        <div className="lg:col-span-2 space-y-8">
          {/* Weather Form Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl">Check Weather</h2>
              <WeatherForm onWeatherData={handleWeatherData} />
            </div>
          </div>

          {/* Preferences Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl">Preferences</h2>
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Temperature Unit</span>
                  </label>
                  <select 
                    className="select select-bordered"
                    value={preferences.temperatureUnit}
                    onChange={(e) => updatePreferences({ temperatureUnit: e.target.value })}
                  >
                    <option value="celsius">Celsius (°C)</option>
                    <option value="fahrenheit">Fahrenheit (°F)</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Clothing Style</span>
                  </label>
                  <select 
                    className="select select-bordered"
                    value={preferences.clothingStyle}
                    onChange={(e) => updatePreferences({ clothingStyle: e.target.value })}
                  >
                    <option value="casual">Casual</option>
                    <option value="formal">Formal</option>
                    <option value="sporty">Sporty</option>
                    <option value="business">Business</option>
                    <option value="outdoor">Outdoor</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Weather Display & Outfit Suggestions */}
        <div className="space-y-8">
          {/* Weather Display Card */}
          {weatherData && (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-xl">Current Weather</h2>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">
                    {weatherData.temperature}°C
                  </div>
                  <p className="text-lg mb-2">{weatherData.conditions}</p>
                  <p className="mb-2">📍 {weatherData.location}, {weatherData.country}</p>
                  <div className="flex justify-center mb-4">
                    <img 
                      src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} 
                      alt={weatherData.description}
                      className="w-20 h-20"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="stat">
                      <div className="stat-title">Feels Like</div>
                      <div className="stat-value text-lg">{weatherData.feelsLike}°C</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title">Humidity</div>
                      <div className="stat-value text-lg">{weatherData.humidity}%</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title">Wind Speed</div>
                      <div className="stat-value text-lg">{weatherData.windSpeed} m/s</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title">Condition</div>
                      <div className="stat-value text-lg capitalize">{weatherData.description}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Outfit Suggestions Card */}
          {outfitData && (
            <OutfitSuggestions data={outfitData} loading={loading} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard