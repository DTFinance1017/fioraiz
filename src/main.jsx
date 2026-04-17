import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Quiz from './pages/Quiz'
import ConsentForm from './pages/ConsentForm'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'
import Admin from './pages/Admin'
import SiteGate from './pages/SiteGate'

function App() {
  return (
    <SiteGate>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/avaliacao" element={<Quiz />} />
          <Route path="/termo-consentimento" element={<ConsentForm />} />
          <Route path="/politica-privacidade" element={<PrivacyPolicy />} />
          <Route path="/termos-uso" element={<TermsOfUse />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </SiteGate>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
