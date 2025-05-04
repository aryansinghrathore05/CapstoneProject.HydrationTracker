import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { HydrationProvider } from './context/HydrationContext.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <HydrationProvider>
          <App />
          <ToastContainer position="bottom-right" autoClose={3000} />
        </HydrationProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)