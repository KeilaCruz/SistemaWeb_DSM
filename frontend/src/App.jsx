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
import { CrearUsuario } from './pages/CrearUsuario';
import { Footer } from './components/Footer'
import { ReHistoriaNPage } from './pages/ReHistoriaNPage'
import { ReFichaPsicoNiñoPage } from './pages/ReFichaPsicoNiñoPage'
import { ReFichaPsicoAdultoPage } from './pages/ReFichaPsicoAdultoPage'
import { ReEvento } from './pages/ReEvento';
import { BuscarPacientePage } from './pages/BuscarPacientePage';
import { ViewPaciente } from './components/Paciente/ViewPaciente';
import { CitasPacientePage } from './pages/CitasPacientePage';
import { CalendarioPage } from './pages/CalendarioPage';
import { ReHojaEvaluacion } from './pages/ReHojaEvaluacion';
import { ReExamenMedico } from './pages/ReExamenMedico';
import { VerHojasDeEvaluacionPage } from './pages/VerHojasDeEvaluacionPage';
import { ViewHojaDeEvaluacion } from './components/HojaDeEvaluacion/ViewHojaDeEvaluacion';
import { VerExamenMedico } from './pages/VerExamenMedico';
import { ViewExamenMedico } from './components/ExamenMedico/ViewExamenMedico';
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
            <Route path="/crearUsuario" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={1}><CrearUsuario /></ProtectedRoute>} />
            <Route path="/registrar_historianutricion" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={1}><ReHistoriaNPage /></ProtectedRoute>} />
            <Route path="/registrar_fichapsiniño" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={1}><ReFichaPsicoNiñoPage /></ProtectedRoute>} />
            <Route path="/registrar_fichapsiadulto" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={2}><ReFichaPsicoAdultoPage /></ProtectedRoute>} />
            <Route path="/registrar_evento" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={2}><ReEvento /></ProtectedRoute>} />
            <Route path="/buscar_paciente" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={2}><BuscarPacientePage /></ProtectedRoute>} />
            <Route path="/buscar_paciente/:idPaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={2}><ViewPaciente /></ProtectedRoute>} />
            <Route path="/citas_paciente/:idPaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={2}><CitasPacientePage /></ProtectedRoute>} />

            <Route path="/calendario" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={2}><CalendarioPage /></ProtectedRoute>} />
            <Route path="/registrar_evaluacionclinica" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={2}><ReHojaEvaluacion/></ProtectedRoute>} />
            <Route path="/registrar_examenmedico" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={2}><ReExamenMedico/></ProtectedRoute>} />
            <Route path="/ver_evaluacionClinica" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={2}><VerHojasDeEvaluacionPage/></ProtectedRoute>} />
            <Route path="/ver_evaluacionClinica/:idHojaClinica" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={2}><ViewHojaDeEvaluacion/></ProtectedRoute>} />
            <Route path="/ver_examenMedico" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={2}><VerExamenMedico/></ProtectedRoute>} />
            <Route path="/ver_examenMedico/:idExamenMedico" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={2}><ViewExamenMedico/></ProtectedRoute>} />



          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App


