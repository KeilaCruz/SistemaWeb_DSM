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
import { BuscarPacientePage } from './pages/BuscarPacientePage';
import { ViewPaciente } from './components/Paciente/ViewPaciente';
import { CitasPacientePage } from './pages/CitasPacientePage';
import { CitasPage } from './pages/CitasPage';
import { HistorialClinico } from './components/Paciente/HistorialClinico';
import { VFichaPsicoAdultoPage } from './pages/VFichaPsicoAdultoPage';
import { VFichaPsicoNiñoPage } from './pages/VFichaPsicoNiñoPage';
import { FichaPsicoAdulto } from './components/Psicologia/FichaPsicoAdulto';
import { FichaPsicoNiño } from './components/Psicologia/FichaPsicoNiño';
import { VHistoriasNutricionPage } from './pages/VHistoriasNutricionPage';
import { HistoriaNutricion } from './components/Nutricion/HistoriaNutricion';
import { EvoluciónPsicologicaAdulto } from './components/Psicologia/EvoluciónPsicologicaAdulto';
import { EvolucionPsicologiaNiño } from './components/Psicologia/EvolucionPsicologiaNiño';
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
            <Route path="/visualizar_historianutricion" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={1}><VHistoriasNutricionPage /></ProtectedRoute>} />
            <Route path="/historia_nutricion/:idPaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={1}><HistoriaNutricion /></ProtectedRoute>} />
            <Route path="/registrar_fichapsiniño" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={1}><ReFichaPsicoNiñoPage /></ProtectedRoute>} />
            <Route path="/registrar_fichapsiadulto" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={1}><ReFichaPsicoAdultoPage /></ProtectedRoute>} />
            <Route path="/visualizar_fichapsiadulto" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={1}><VFichaPsicoAdultoPage /></ProtectedRoute>} />
            <Route path="/visualizar_fichapsiniño" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={1}><VFichaPsicoNiñoPage /></ProtectedRoute>} />
            <Route path="/visualizar_evolucionadulto/:idPaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={1}> <EvoluciónPsicologicaAdulto /></ProtectedRoute>} />
            <Route path="/visualizar_evolucionnino/:idPaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={1}> <EvolucionPsicologiaNiño /></ProtectedRoute>} />
            <Route path="/fichapsico_adulto/:idPaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={1}><FichaPsicoAdulto /></ProtectedRoute>} />
            <Route path="/fichapsico_niño/:idPaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={1}><FichaPsicoNiño /></ProtectedRoute>} />
            <Route path="/buscar_paciente" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={2}><BuscarPacientePage /></ProtectedRoute>} />
            <Route path="/buscar_paciente/:idPaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={2}><ViewPaciente /></ProtectedRoute>} />
            <Route path="/citas_paciente/:idPaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={2}><CitasPacientePage /></ProtectedRoute>} />
            <Route path="/citas" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={2}><CitasPage /></ProtectedRoute>} />
            <Route path="/historial-clinico/:idPaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolPermitido={2}><HistorialClinico /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App


