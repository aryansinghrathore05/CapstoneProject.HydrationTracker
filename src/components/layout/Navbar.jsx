import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FiMenu, FiX, FiDroplet } from 'react-icons/fi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAuthenticated, logout } = useAuth()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center text-primary-600">
            <FiDroplet className="h-8 w-8" />
            <span className="ml-2 text-xl font-display font-bold">HydroTracker</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium ${
                isActive('/') 
                  ? 'text-primary-600 font-semibold' 
                  : 'text-gray-700 hover:text-primary-500'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium ${
                isActive('/about') 
                  ? 'text-primary-600 font-semibold' 
                  : 'text-gray-700 hover:text-primary-500'
              }`}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className={`text-sm font-medium ${
                isActive('/services') 
                  ? 'text-primary-600 font-semibold' 
                  : 'text-gray-700 hover:text-primary-500'
              }`}
            >
              Services
            </Link>
            <Link 
              to="/blog" 
              className={`text-sm font-medium ${
                isActive('/blog') 
                  ? 'text-primary-600 font-semibold' 
                  : 'text-gray-700 hover:text-primary-500'
              }`}
            >
              Blog
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`text-sm font-medium ${
                    isActive('/dashboard') 
                      ? 'text-primary-600 font-semibold' 
                      : 'text-gray-700 hover:text-primary-500'
                  }`}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={logout}
                  className="btn btn-outline"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="btn btn-outline">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-500 focus:outline-none"
            >
              {isOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary-500'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/about') 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary-500'
              }`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/services"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/services') 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary-500'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/blog"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/blog') 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary-500'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/dashboard') 
                      ? 'bg-primary-100 text-primary-600' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary-500'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout()
                    setIsOpen(false)
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-3 space-x-4">
                  <Link 
                    to="/login" 
                    className="btn btn-outline w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="btn btn-primary w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar