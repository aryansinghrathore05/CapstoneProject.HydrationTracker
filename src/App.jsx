import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { useHydration } from './context/HydrationContext'

// Pages
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import BlogPage from './pages/BlogPage'
import DashboardPage from './pages/DashboardPage'
import NotFoundPage from './pages/NotFoundPage'

// Auth Pages
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

// Components
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  const { user } = useAuth()
  const { initializeHydrationData } = useHydration()

  useEffect(() => {
    // Initialize user's hydration data when logged in
    if (user) {
      initializeHydrationData()
    }
  }, [user, initializeHydrationData])

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App