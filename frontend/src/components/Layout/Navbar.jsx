import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    checkAuthStatus()
  }, [location.pathname])

  useEffect(() => {
    // Close mobile menu on route change
    setMobileMenuOpen(false)
  }, [location])

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/me', {
        withCredentials: true
      })
      setIsLoggedIn(true)
      setUser(response.data.user)
    } catch (error) {
      setIsLoggedIn(false)
      setUser(null)
    }
  }

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, {
        withCredentials: true
      })
      setIsLoggedIn(false)
      setUser(null)
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      <div className="navbar-start">
        {/* Mobile menu button */}
        <div className="dropdown lg:hidden">
          <button 
            className="btn btn-ghost btn-circle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          
          {/* Mobile menu dropdown */}
          {mobileMenuOpen && (
            <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 absolute left-0">
              <li>
                <Link to="/" className={`${isActive('/')}`}>
                  <span className="text-lg">🏠</span> Home
                </Link>
              </li>
              
              {isLoggedIn ? (
                <>
                  <li>
                    <Link to="/dashboard" className={`${isActive('/dashboard')}`}>
                      <span className="text-lg">📊</span> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/history" className={`${isActive('/history')}`}>
                      <span className="text-lg">📋</span> History
                    </Link>
                  </li>
                  <li><hr className="my-1" /></li>
                  <li>
                    <div className="flex items-center gap-3 p-2">
                      <div className="avatar placeholder">
                        <div className="bg-primary text-primary-content rounded-full w-8">
                          <span className="text-xs">{getInitials(user?.name)}</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="text-error">
                      <span className="text-lg">🚪</span> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className={`${isActive('/login')}`}>
                      <span className="text-lg">🔑</span> Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className={`${isActive('/signup')}`}>
                      <span className="text-lg">📝</span> Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost normal-case text-xl ml-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌤️</span>
            <span className="hidden sm:inline font-bold text-primary">WeatherWear</span>
          </div>
        </Link>
      </div>

      {/* Desktop navigation - center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li>
            <Link to="/" className={`${isActive('/')} font-medium`}>
              Home
            </Link>
          </li>
          
          {isLoggedIn && (
            <>
              <li>
                <Link to="/dashboard" className={`${isActive('/dashboard')} font-medium`}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/history" className={`${isActive('/history')} font-medium`}>
                  History
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Desktop navigation - right side */}
      <div className="navbar-end">
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            {/* User dropdown for desktop */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-10">
                  <span className="text-sm font-bold">{getInitials(user?.name)}</span>
                </div>
              </div>
              <div className="hidden md:block">
                <p className="font-semibold text-sm">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            
            <div className="dropdown dropdown-end">
              <button className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <Link to="/dashboard" className="justify-between">
                    Dashboard
                    <span className="badge badge-primary">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/history">Search History</Link>
                </li>
                <li>
                  <Link to="/profile">Profile Settings</Link>
                </li>
                <li><hr className="my-1" /></li>
                <li>
                  <button onClick={handleLogout} className="text-error font-medium">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost hidden sm:inline-flex">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary">
              <span className="hidden sm:inline">Sign Up</span>
              <span className="sm:hidden">Join</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar