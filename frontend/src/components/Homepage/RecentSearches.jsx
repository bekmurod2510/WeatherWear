import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IoMdSearch } from "react-icons/io";

const RecentSearches = ({ onSelectLocation, limit = 5 }) => {
  const [searches, setSearches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRecentSearches()
  }, [])

  const fetchRecentSearches = async () => {
    try {
      const response = await axios.get('https://weatherwear-3qko.onrender.com/api/weather/history', {
        params: { limit },
        withCredentials: true
      })
      setSearches(response.data.data)
    } catch (err) {
      if (err.response?.status === 401) {
        // User not logged in, that's okay
        setSearches([])
      } else {
        setError('Failed to load recent searches')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleQuickSearch = (location) => {
    if (onSelectLocation) {
      onSelectLocation(location)
    }
  }

  const formatTemperature = (temp) => {
    return `${temp.toFixed(1)}°C`
  }

  const getWeatherIcon = (conditions) => {
    const conditionMap = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Snow': '❄️',
      'Thunderstorm': '⛈️',
      'Drizzle': '🌦️',
      'Mist': '🌫️',
      'Smoke': '💨',
      'Haze': '😶‍🌫️',
      'Dust': '💨',
      'Fog': '🌁',
      'Sand': '🌪️',
      'Ash': '🌋',
      'Squall': '💨',
      'Tornado': '🌪️'
    }
    return conditionMap[conditions] || '🌤️'
  }

  if (loading) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">Recent Searches</h3>
          <div className="text-center py-4">
            <span className="loading loading-spinner loading-sm"></span>
            <p className="mt-2 text-sm text-gray-500">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">Recent Searches</h3>
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      </div>
    )
  }

  if (searches.length === 0) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">Recent Searches</h3>
          <div className="text-center py-6">
            <div className="text-5xl mb-3 text-center flex justify-center items-center"><IoMdSearch> </IoMdSearch></div>
            <p className="text-gray-500 mb-4">No recent searches found</p>
            <Link to="/dashboard" className="btn btn-primary btn-sm">
              Start Searching
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h3 className="card-title">Recent Searches</h3>
          <Link to="/history" className="btn btn-ghost btn-xs">
            View All
          </Link>
        </div>

        <div className="space-y-3">
          {searches.map((search) => (
            <div 
              key={search.id}
              className="flex items-center justify-between p-3 hover:bg-base-200 rounded-lg cursor-pointer transition-colors"
              onClick={() => handleQuickSearch(search.location)}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">
                  {getWeatherIcon(search.conditions)}
                </div>
                <div>
                  <p className="font-medium">{search.location}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(search.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-lg">{formatTemperature(search.temperature)}</p>
                <p className="text-sm text-gray-500">{search.conditions}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="divider my-2"></div>

        <div className="flex flex-wrap gap-2">
          <button 
            className="btn btn-outline btn-xs"
            onClick={() => handleQuickSearch('London')}
          >
            London
          </button>
          <button 
            className="btn btn-outline btn-xs"
            onClick={() => handleQuickSearch('New York')}
          >
            New York
          </button>
          <button 
            className="btn btn-outline btn-xs"
            onClick={() => handleQuickSearch('Tokyo')}
          >
            Tokyo
          </button>
          <button 
            className="btn btn-outline btn-xs"
            onClick={() => handleQuickSearch('Sydney')}
          >
            Sydney
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecentSearches