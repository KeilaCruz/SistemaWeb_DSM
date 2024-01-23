import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './utils/PrivateRoute'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { AuthProvider } from './context/AuthProvider'
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}
export default App


