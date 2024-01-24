import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from "./components/Header"
import { Login } from "./components/Login"
import { Home } from './components/Home'
import { NoAutorizado } from './components/NoAutorizado'
import { AuthProvider } from './context/AuthProvider'
import { ProtectedRoute } from "./utils/ProtectedRoute"
import { HomePageR } from './pages/HomePageR'
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/noautorizado" element={<NoAutorizado />} />
            <Route path="/homePsicologia" element={<ProtectedRoute redirectTo={"/noautorizado"}> <Home /></ProtectedRoute>} />
            <Route path="/homeRecepcionista" element={<ProtectedRoute redirectTo={"/noautorizado"}><HomePageR/></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App


