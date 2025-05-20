// src/main.jsx
import 'bootstrap/dist/css/bootstrap.min.css'   // <— aquí
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { StoreProvider } from './context/StoreContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
)
