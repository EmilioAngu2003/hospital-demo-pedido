import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import UpgradeRoot from './UpgradeRoot.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UpgradeRoot />
  </StrictMode>,
)
