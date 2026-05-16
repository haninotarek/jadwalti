// ============================================
// App.jsx - البواب اللي بيوزع اليوزر على الصفحات
// ============================================

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Study from './pages/Study'
import Report from './pages/Report'

function App() {
  return (
    // AppProvider بيلف كل حاجة عشان كل الصفحات تقدر توصل للذاكرة المركزية
    <AppProvider>

      { }
      <BrowserRouter>

        { }
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/study" element={<Study />} />
          <Route path="/report" element={<Report />} />
        </Routes>

      </BrowserRouter>
    </AppProvider>
  )
}

export default App