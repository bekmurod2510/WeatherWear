import { useState } from 'react'
import axios from 'axios'

const WeatherForm = ({ onWeatherData }) => {
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!location.trim()) {
      setError('Please enter a location')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await axios.post(
        'https://weatherwear-3qko.onrender.com/api/weather/current',
        { location },
        { withCredentials: true }
      )
      
      onWeatherData(response.data.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className="form-control" style={{ display: 'flex', flexDirection: 'column' }}>
        <label className="label">
          <span className="label-text">Enter City Name</span>
        </label>
        <div className="join">
          <input
            type="text"
            placeholder="e.g., London, New York, Tokyo"
            className="input input-bordered join-item flex-grow"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={loading}
          />
          <button 
            type="submit" 
            className={`btn btn-primary join-item ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Weather'}
          </button>
        </div>
        <label className="label">
          <span className="label-text-alt">Enter city name, state code, or country code</span>
        </label>
      </div>
    </form>
  )
}

export default WeatherForm