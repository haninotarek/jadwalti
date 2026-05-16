// ============================================
// main.jsx - نقطة الدخول للموقع
// ============================================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ده اللي بيشغل الموقع، بيلاقي div فيه id="root" ويحط جواه App
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)