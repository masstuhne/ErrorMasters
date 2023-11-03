import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // Zbog ovo strict se sve da put učitava hocemo to maknuti ili ne?
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)
