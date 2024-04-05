import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { SideBar } from './components/SideBar.jsx'
import './index.css'
import { AuthProvider } from './context/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <SideBar/>
    </AuthProvider>
  </React.StrictMode>,
)
