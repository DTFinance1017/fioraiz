import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Quiz from './pages/Quiz'
import ConsentForm from './pages/ConsentForm'
import Comunidade from './pages/Comunidade'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/avaliacao" element={<Quiz />} />
        <Route path="/termo-consentimento" element={<ConsentForm />} />
        <Route path="/comunidade" element={<Comunidade />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
