import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';
import WeatherForm from './WeatherForm'
import WeatherDisplay from './WeatherDisplay'
import OutfitSuggestions from './OutfitSuggestions'
import RecentSearches from './RecentSearches'
import { FaGlobeAmericas } from "react-icons/fa";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { GrSecure } from "react-icons/gr";

const HomePage = () => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [weatherData, setWeatherData] = useState(null)
  const [outfitData, setOutfitData] = useState(null)
  const [showOutfitSuggestions, setShowOutfitSuggestions] = useState(false)

  const handleWeatherData = (data) => {
    setWeatherData(data)
    setOutfitData(null)
    setShowOutfitSuggestions(false)
  }

  const checkAuthSimple = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/auth/check', {
      withCredentials: true
    });
    
    // This endpoint always returns 200, with isAuthenticated field
    return {
      isAuthenticated: response.data.isAuthenticated,
      user: response.data.user || null,
      message: response.data.message
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      user: null,
      message: 'Failed to check authentication status'
    };
  }
};

  useEffect(() => {
    checkAuthSimple();
  }, []);

  const handleGetOutfitSuggestions = async (weatherInfo) => {
    try {
      // Simulate API call - in real app, this would be an actual API call
      const mockOutfitData = {
        baseOutfit: ['T-shirt', 'Jeans', 'Sneakers'],
        outerwear: ['Light jacket'],
        accessories: ['Sunglasses', 'Cap'],
        recommendation: `For ${weatherInfo.conditions.toLowerCase()} weather at ${weatherInfo.temperature.toFixed(1)}°C`
      }
      
      setOutfitData(mockOutfitData)
      setShowOutfitSuggestions(true)
    } catch (error) {
      console.error('Failed to get outfit suggestions:', error)
    }
  }

  const handleSelectLocation = (location) => {
    // This would trigger a weather search for the selected location
    console.log('Selected location:', location)
    // In a real implementation, you would call handleWeatherData with the location
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="hero bg-gradient-to-r from-primary to-secondary text-primary-content rounded-2xl p-8 mb-12">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              🌤️ Dress Right, Every Time
            </h1>
            <p className="text-xl mb-8">
              Get smart clothing recommendations based on real-time weather data.
              Never be underdressed or overdressed again!
            </p>
            { isAuthenticated && <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn btn-accent btn-lg">
                Get Started Free
              </Link>
              <Link to="/dashboard" className="btn btn-outline btn-lg text-primary-content">
                Try Demo
              </Link>
            </div>}
            <p className="mt-6 text-sm opacity-90">
              No credit card required • Free forever plan
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Main Content - Weather Form & Display */}
        <div className="lg:col-span-2 space-y-8">
          {/* Weather Form */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Check Weather Anywhere</h2>
              <WeatherForm onWeatherData={handleWeatherData} />
            </div>
          </div>

          {/* Weather Display */}
          <WeatherDisplay 
            weatherData={weatherData} 
            onGetOutfitSuggestions={handleGetOutfitSuggestions}
          />

          {/* Outfit Suggestions */}
          {showOutfitSuggestions && outfitData && (
            <OutfitSuggestions data={outfitData} />
          )}
        </div>

        {/* Sidebar - Recent Searches & Features */}
        <div className="space-y-8">
          {/* Recent Searches */}
          <RecentSearches 
            onSelectLocation={handleSelectLocation}
            limit={3}
          />

          {/* Features */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title mb-4">Why WeatherWear?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="badge badge-primary p-3">
                    <span className="text-lg"><AiOutlineThunderbolt/></span>
                  </div>
                  <div>
                    <h4 className="font-bold">Accurate Forecasts</h4>
                    <p className="text-sm text-gray-600">Real-time data from OpenWeather API</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="badge badge-secondary p-3">
                    <span className="text-lg">👔</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Smart Suggestions</h4>
                    <p className="text-sm text-gray-600">AI-powered outfit recommendations</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="badge badge-accent p-3">
                    <span className="text-lg">📱</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Mobile Friendly</h4>
                    <p className="text-sm text-gray-600">Works perfectly on all devices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="stats shadow w-full">
            <div className="stat">
              <div className="stat-title">Users</div>
              <div className="stat-value">1.2K</div>
              <div className="stat-desc">↗︎ 12% this month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Everything You Need</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="text-5xl mb-4"><FaGlobeAmericas/></div>
              <h3 className="card-title">Global Coverage</h3>
              <p>Get weather data for any city worldwide with our extensive coverage.</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="text-5xl mb-4"><AiOutlineThunderbolt/></div>
              <h3 className="card-title">Real-time Updates</h3>
              <p>Receive instant weather updates and recommendations as conditions change.</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="text-5xl mb-4"><GrSecure/></div>
              <h3 className="card-title">Secure & Private</h3>
              <p>Your data is protected with enterprise-grade security measures.</p>
            </div>
          </div>
        </div>
      </div>

      {isAuthenticated && <div className="card bg-base-200 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-3xl">Ready to Get Started?</h2>
          <p className="text-lg max-w-2xl">
            Join thousands of users who trust WeatherWear for their daily outfit planning.
            Sign up now and never worry about what to wear again!
          </p>
          <div className="card-actions mt-6">
            <Link to="/signup" className="btn btn-primary btn-lg">
              Create Free Account
            </Link>
            <Link to="/login" className="btn btn-outline btn-lg">
              Sign In
            </Link>
          </div>
        </div>
      </div>
        }
      
    </div>
  )
}

export default HomePage