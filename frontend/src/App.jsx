import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from "./components/Header"
import { Login } from "./components/Login"
import { Home } from './components/Home'
import { NoAutorizado } from './components/NoAutorizado'
import { AuthProvider } from './context/AuthProvider'
import { ProtectedRoute } from "./utils/ProtectedRoute"
import { HomePageR } from './pages/HomePageR'
import { RePacientePage } from './pages/RePacientePage'
import { AgendarCitaPage } from './pages/AgendarCitaPage'
import { ReHistoriaNPage } from './pages/ReHistoriaNPage'
import { ReFichaPsicoNiñoPage } from './pages/ReFichaPsicoNiñoPage'
import { ReFichaPsicoAdultoPage } from './pages/ReFichaPsicoAdultoPage'
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
            {/**Rutas protegidas */}
            <Route path="/homePsicologia" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={1}><Home /></ProtectedRoute>} />
            <Route path="/homeRecepcionista" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={2}><HomePageR /></ProtectedRoute>} />
            <Route path="/registrarpaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={2}><RePacientePage /></ProtectedRoute>} />
            <Route path="/agendarcita" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={2}><AgendarCitaPage /></ProtectedRoute>} />
            <Route path="/registrar_historianutricion" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={1}><ReHistoriaNPage /></ProtectedRoute>} />
            <Route path="/registrar_fichapsiniño" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={2}><ReFichaPsicoNiñoPage /></ProtectedRoute>} />
            <Route path="/registrar_fichapsiadulto" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={2}><ReFichaPsicoAdultoPage /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App


