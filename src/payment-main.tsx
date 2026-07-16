import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import { PaymentApp } from './flows/PaymentApp/PaymentApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PaymentApp />
  </StrictMode>,
)
