import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../app/globals.css'
import Home from './Home'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)

