import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext.jsx'
import {ClerkProvider} from '@clerk/clerk-react'



// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

// raect-icon
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';



// Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'


createRoot(document.getElementById('root')).render(
  
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>

  </BrowserRouter>
  </ClerkProvider>,
)
