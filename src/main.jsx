import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { prepareCmsClient, startRevisionPolling } from './api/cms.js'
import './index.css'
import './pages/DeliverectLanding.css'
import App from './App.jsx'

function boot() {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
  void prepareCmsClient().then(() => startRevisionPolling())
}

boot()
