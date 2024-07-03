import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from "./components/Header"
import { Login } from "./components/Login"
import { HomePage } from './pages/HomePage';
import { NoAutorizado } from './components/NoAutorizado'
import { AuthProvider } from './context/AuthProvider'
import { ProtectedRoute } from "./utils/ProtectedRoute"
import { HomePageR } from './pages/HomePageR'
import { HomePageMedicoGeneral } from './pages/HomePageMedicoGeneral';
import { HomePageNutriologo } from './pages/HomePageNutriologo';
import { HomePageOdontologo } from './pages/HomePageOdontologo';
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
import { CitasPage } from './pages/CitasPage';
import { HistorialClinico } from './components/Paciente/HistorialClinico';
import { VFichaPsicoAdultoPage } from './pages/VFichaPsicoAdultoPage';
import { VFichaPsicoNiñoPage } from './pages/VFichaPsicoNiñoPage';
import { FichaPsicoAdulto } from './components/Psicologia/FichaPsicoAdulto';
import { FichaPsicoNiño } from './components/Psicologia/FichaPsicoNiño';
import { CalendarioPage } from './pages/CalendarioPage';
import { ReHojaEvaluacion } from './pages/ReHojaEvaluacion';
import { ReExamenMedico } from './pages/ReExamenMedico';
import { VerHojasDeEvaluacionPage } from './pages/VerHojasDeEvaluacionPage';
import { ViewHojaDeEvaluacion } from './components/HojaDeEvaluacion/ViewHojaDeEvaluacion';
import { VerExamenMedico } from './pages/VerExamenMedico';
import { ViewExamenMedico } from './components/ExamenMedico/ViewExamenMedico';
import { ReportePage } from './components/Reportes/ReportePage';
import { VerEventos } from './pages/VerEventos';
import { ViewEvento } from './components/Evento/ViewEvento';
import { ExamenMedico } from './components/Paciente/ExamenMedico';
import { VerUsuariosPage } from './pages/VerUsuariosPage';
import { ViewUsuario } from './components/Usuario/ViewUsuario';
import { VHistoriasNutricionPage } from './pages/VHistoriasNutricionPage';
import { HistoriaNutricion } from './components/Nutricion/HistoriaNutricion';
import { EvoluciónPsicologicaAdulto } from './components/Psicologia/EvoluciónPsicologicaAdulto';
import { EvolucionPsicologiaNiño } from './components/Psicologia/EvolucionPsicologiaNiño';
function App() {



  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/noautorizado" element={<NoAutorizado />} />
          {/**Rutas protegidas */}
          <Route path="/homePsicologia" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1]}><HomePage /></ProtectedRoute>} />
          <Route path="/homeRecepcionista" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[2]}><HomePageR /></ProtectedRoute>} />
          <Route path="/homeMedico" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[3]}><HomePageMedicoGeneral /></ProtectedRoute>} />
          <Route path="/homeOdontologo" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[4]}><HomePageOdontologo /></ProtectedRoute>} />
          <Route path="/homeNutriologo" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[5]}><HomePageNutriologo /></ProtectedRoute>} />

          <Route path="/registrarpaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[2]}><RePacientePage /></ProtectedRoute>} />
          <Route path="/agendarcita" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[2]}><AgendarCitaPage /></ProtectedRoute>} />
          <Route path="/crear_usuario" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[2]}><CrearUsuario /></ProtectedRoute>} />
          <Route path="/ver_usuario" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[2]}><VerUsuariosPage /></ProtectedRoute>} />
          <Route path="/ver_usuario/:id" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[2]}><ViewUsuario /></ProtectedRoute>} />

          <Route path="/registrar_historianutricion" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[5]}><ReHistoriaNPage /></ProtectedRoute>} />
          <Route path="/registrar_fichapsiniño" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1]}><ReFichaPsicoNiñoPage /></ProtectedRoute>} />
          <Route path="/registrar_fichapsiadulto" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1]}><ReFichaPsicoAdultoPage /></ProtectedRoute>} />
          <Route path="/registrar_evento" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1, 2, 3, 4, 5]}><ReEvento /></ProtectedRoute>} />
          <Route path="/ver_evento" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1, 2, 3, 4, 5]}><VerEventos /></ProtectedRoute>} />
          <Route path="/ver_evento/:idEvento" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1, 2, 3, 4, 5]}><ViewEvento /></ProtectedRoute>} />



            <Route path="/buscar_paciente" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1,2,3,4,5]}><BuscarPacientePage /></ProtectedRoute>} />
            <Route path="/buscar_paciente/:idPaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[2]}><ViewPaciente /></ProtectedRoute>} />
            <Route path="/citas_paciente/:idPaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1,2,3,4,5]}><CitasPacientePage /></ProtectedRoute>} />
            <Route path="/citas" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[2]}><CitasPage /></ProtectedRoute>} />
            <Route path="/historial-clinico/:idPaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1,2,3,4,5]}><HistorialClinico /></ProtectedRoute>} />
            <Route path="/examen-medico/:idPaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1,2,3,4,5]}><ExamenMedico /></ProtectedRoute>} />
            <Route path="/calendario" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[2]}><CalendarioPage /></ProtectedRoute>} />
            <Route path="/registrar_evaluacionclinica" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1,3,4,5]}><ReHojaEvaluacion/></ProtectedRoute>} />
            <Route path="/registrar_examenmedico" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1,3,4,5]}><ReExamenMedico/></ProtectedRoute>} />
            <Route path="/ver_evaluacionClinica" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1,3,4,5]}><VerHojasDeEvaluacionPage/></ProtectedRoute>} />
            <Route path="/ver_evaluacionClinica/:idHojaClinica" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1,3,4,5]}><ViewHojaDeEvaluacion/></ProtectedRoute>} />
            <Route path="/ver_examenMedico" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1,3,4,5]}><VerExamenMedico/></ProtectedRoute>} />
            <Route path="/ver_examenMedico/:idExamenMedico" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1,3,4,5]}><ViewExamenMedico/></ProtectedRoute>} />
            <Route path="/reportes" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1,2,3,4,5]}><ReportePage/></ProtectedRoute>} />


          <Route path="/visualizar_fichapsiadulto" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1]}><VFichaPsicoAdultoPage /></ProtectedRoute>} />
          <Route path="/visualizar_fichapsiniño" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1]}><VFichaPsicoNiñoPage /></ProtectedRoute>} />
          <Route path="/fichapsico_adulto/:idPaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1]}><FichaPsicoAdulto /></ProtectedRoute>} />
          <Route path="/fichapsico_niño/:idPaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1]}><FichaPsicoNiño /></ProtectedRoute>} />

          <Route path="/visualizar_historianutricion" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[5]}><VHistoriasNutricionPage /></ProtectedRoute>} />
          <Route path="/historia_nutricion/:idPaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[5]}><HistoriaNutricion /></ProtectedRoute>} />
          <Route path="/visualizar_fichapsiadulto" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1]}><VFichaPsicoAdultoPage /></ProtectedRoute>} />
          <Route path="/visualizar_fichapsiniño" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1]}><VFichaPsicoNiñoPage /></ProtectedRoute>} />
          <Route path="/visualizar_evolucion_adulto/:idPaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1]}> <EvoluciónPsicologicaAdulto /></ProtectedRoute>} />
          <Route path="/visualizar_evolucion_nino/:idPaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1]}><EvolucionPsicologiaNiño /></ProtectedRoute>} />

          <Route path="/fichapsico_adulto/:idPaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1]}><FichaPsicoAdulto /></ProtectedRoute>} />
          <Route path="/fichapsico_niño/:idPaciente" element={<ProtectedRoute redirectTo="/noautorizado" rolesPermitidos={[1]}><FichaPsicoNiño /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


