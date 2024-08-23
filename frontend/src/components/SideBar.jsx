
import  { useEffect, useRef } from 'react';
import { useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";
import App from '../App';
import { Footer } from './Footer';


export function SideBar() {
    const { user, logout } = useContext(AuthContext);
    const hamBurgerRef = useRef(null);

    

  
    useEffect(() => {
        // Verificar si la referencia existe y si el botón asociado existe en el DOM
        if (hamBurgerRef.current) {
          function toggleSidebar() {
            document.querySelector("#sidebar").classList.toggle("expand");
          }
      
          // Agregar el event listener al botón hamburguesa usando la referencia
          hamBurgerRef.current.addEventListener("click", toggleSidebar);
      
          // Retornar la función de limpieza para eliminar el event listener
          return () => {
            hamBurgerRef.current.removeEventListener("click", toggleSidebar);
          };
        }
      }, [hamBurgerRef]); // Agregar hamBurgerRef como una dependencia para que el efecto se ejecute cuando cambie
      

     


  return (
        <>
        <div>
            <div className="wrapper">
              {user  && (
                  <aside id="sidebar">
                    
                  <div className="d-flex">
                      <button ref={hamBurgerRef} className="toggle-btn" type="button">
                          <i className="lni lni-grid-alt"></i>
                      </button>
                      <div className="sidebar-logo">
                          <a href="#">DSMP</a>
                      </div>
                  </div>
                  
                  <ul className="sidebar-nav">
                  {user.idRol_id === 1 ? ( /* Rol de Psicologa */
                    <>
                      <li className="sidebar-item">
                          <a href="/homePsicologia" className="sidebar-link">
                              <i className="lni lni-home"></i>
                              <span>Home</span>
                          </a>
                      </li>

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth1" aria-expanded="false" aria-controls="auth1">
                                <i class="fa-solid fa-child-reaching"></i>
                              <span>Niño</span>
                          </a>
                          <ul id="auth1" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrar_fichapsiniño" className="sidebar-link">Crear ficha</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/visualizar_fichapsiniño" className="sidebar-link">Ver ficha</a>
                              </li>
                              
                          </ul>
                      </li>

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth2" aria-expanded="false" aria-controls="auth2">
                                <i class="fa-solid fa-person-cane"></i>
                              <span>Adulto</span>
                          </a>
                          <ul id="auth2" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrar_fichapsiadulto" className="sidebar-link">Crear ficha</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/visualizar_fichapsiadulto" className="sidebar-link">Ver ficha</a>
                              </li>
                              
                          </ul>
                      </li>

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                                <i class="fa-solid fa-hospital-user"></i>
                              <span>Pacientes</span>
                          </a>
                          <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/buscar_paciente" className="sidebar-link">Buscar Pacientes</a>
                              </li>
                              
                          </ul>
                      </li>

                      

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth3" aria-expanded="false" aria-controls="auth3">
                                <i class="fa-solid fa-bullhorn"></i>
                              <span>Eventos</span>
                          </a>
                          <ul id="auth3" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrar_evento" className="sidebar-link">Crear evento</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/ver_evento" className="sidebar-link">Ver eventos</a>
                              </li>
                              
                          </ul>
                      </li>

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth4" aria-expanded="false" aria-controls="auth4">
                                <i class="fa-solid fa-file-waveform"></i>
                              <span>Examen médico</span>
                          </a>
                          <ul id="auth4" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrar_examenmedico" className="sidebar-link">Crear examen</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/ver_examenMedico" className="sidebar-link">Buscar examen</a>
                              </li>
                              
                          </ul>
                      </li>

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth5" aria-expanded="false" aria-controls="auth5">
                                <i class="fa-solid fa-file-medical"></i>
                              <span>Historial clínico</span>
                          </a>
                          <ul id="auth5" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrar_evaluacionclinica" className="sidebar-link">Crear historial</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/ver_evaluacionClinica" className="sidebar-link">Buscar historial</a>
                              </li>
                              
                          </ul>
                      </li>            
                      
                      <a  className="sidebar-link" onClick={logout} href='/login' >
                          <i className="lni lni-exit"></i>
                          <span>Logout</span>
                      </a>
                      
                      </>
                  ): user.idRol_id === 2 ? ( /*  Recepcionista */
                    <>
                        <li className="sidebar-item">
                          <a href="/homeRecepcionista" className="sidebar-link">
                              <i className="lni lni-home"></i>
                              <span>Home</span>
                          </a>
                      </li>

                     
                     
                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                                <i class="fa-solid fa-hospital-user"></i>
                              <span>Pacientes</span>
                          </a>
                          <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrarpaciente" className="sidebar-link">Registrar Paciente</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/buscar_paciente" className="sidebar-link">Buscar Pacientes</a>
                              </li>
                              
                          </ul>
                      </li>

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth1" aria-expanded="false" aria-controls="auth1">
                                <i class="fa-regular fa-calendar-check"></i>
                              <span>Citas</span>
                          </a>
                          <ul id="auth1" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/agendarcita" className="sidebar-link">Agendar cita</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/citas" className="sidebar-link">Editar citas</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/calendario" className="sidebar-link">Calendario general</a>
                              </li>
                             
                          </ul>
                      </li>


                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth3" aria-expanded="false" aria-controls="auth3">
                                <i class="fa-solid fa-bullhorn"></i>
                              <span>Eventos</span>
                          </a>
                          <ul id="auth3" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrar_evento" className="sidebar-link">Crear evento</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/ver_evento" className="sidebar-link">Ver eventos</a>
                              </li>
                              
                          </ul>
                      </li>

                      

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth6" aria-expanded="false" aria-controls="auth6">
                              <i className="lni lni-graph"></i>
                              <span>Reportes</span>
                          </a>
                          <ul id="auth6" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/reportes" className="sidebar-link">Estadisticas</a>
                              </li>
                              
                          </ul>
                      </li>


                      <a  className="sidebar-link" onClick={logout} href='/login' >
                          <i className="lni lni-exit"></i>
                          <span>Logout</span>
                      </a>
                    </>

                  ): user.idRol_id === 3? ( /*  Rol  Medico general  */
                    <>
                     <li className="sidebar-item">
                          <a href="/homeMedico" className="sidebar-link">
                              <i className="lni lni-home"></i>
                              <span>Home</span>
                          </a>
                      </li>

                     
                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                                <i class="fa-solid fa-hospital-user"></i>
                              <span>Paciente</span>
                          </a>
                          <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/buscar_paciente" className="sidebar-link">Buscar Pacientes</a>
                              </li>
                              
                          </ul>
                      </li>


                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth3" aria-expanded="false" aria-controls="auth3">
                                <i class="fa-solid fa-bullhorn"></i>
                              <span>Eventos</span>
                          </a>
                          <ul id="auth3" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrar_evento" className="sidebar-link">Crear evento</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/ver_evento" className="sidebar-link">Ver eventos</a>
                              </li>
                              
                          </ul>
                      </li>

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth4" aria-expanded="false" aria-controls="auth4">
                                <i class="fa-solid fa-file-waveform"></i>
                              <span>Examen médico</span>
                          </a>
                          <ul id="auth4" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrar_examenmedico" className="sidebar-link">Crear examen</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/ver_examenMedico" className="sidebar-link">Buscar examen</a>
                              </li>
                              
                          </ul>
                      </li>

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth5" aria-expanded="false" aria-controls="auth5">
                                <i class="fa-solid fa-file-medical"></i>
                              <span>Historial clínico</span>
                          </a>
                          <ul id="auth5" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrar_evaluacionclinica" className="sidebar-link">Crear historial</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/ver_evaluacionClinica" className="sidebar-link">Buscar historial</a>
                              </li>
                              
                          </ul>
                      </li>


                      <a  className="sidebar-link" onClick={logout} href='/login' >
                          <i className="lni lni-exit"></i>
                          <span>Logout</span>
                      </a>

                    </>
                  ) : user.idRol_id === 4 ? ( /* Rol odontologo */
                    <>

                        <li className="sidebar-item">
                          <a href="/homeOdontologo" className="sidebar-link">
                              <i className="lni lni-home"></i>
                              <span>Home</span>
                          </a>
                      </li>

                     
                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                                <i class="fa-solid fa-hospital-user"></i>
                              <span>Paciente</span>
                          </a>
                          <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/buscar_paciente" className="sidebar-link">Buscar Pacientes</a>
                              </li>
                              
                          </ul>
                      </li>

                


                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth3" aria-expanded="false" aria-controls="auth3">
                                <i class="fa-solid fa-bullhorn"></i>
                              <span>Eventos</span>
                          </a>
                          <ul id="auth3" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrar_evento" className="sidebar-link">Crear evento</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/ver_evento" className="sidebar-link">Ver eventos</a>
                              </li>
                              
                          </ul>
                      </li>

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth4" aria-expanded="false" aria-controls="auth4">
                                <i class="fa-solid fa-file-waveform"></i>
                              <span>Examen médico</span>
                          </a>
                          <ul id="auth4" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrar_examenmedico" className="sidebar-link">Crear examen</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/ver_examenMedico" className="sidebar-link">Buscar examen</a>
                              </li>
                              
                          </ul>
                      </li>

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth5" aria-expanded="false" aria-controls="auth5">
                                <i class="fa-solid fa-file-medical"></i>
                              <span>Historial clínico</span>
                          </a>
                          <ul id="auth5" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrar_evaluacionclinica" className="sidebar-link">Crear historial</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/ver_evaluacionClinica" className="sidebar-link">Buscar historial</a>
                              </li>
                              
                          </ul>
                      </li>

                     

                      <a  className="sidebar-link" onClick={logout} href='/login' >
                          <i className="lni lni-exit"></i>
                          <span>Logout</span>
                      </a>
                    
                    </>
                  ) : user.idRol_id === 5 ? ( /* Rol de nutrilogo */
                    <>
                        <li className="sidebar-item">
                          <a href="/homeNutriologo" className="sidebar-link">
                              <i className="lni lni-home"></i>
                              <span>Home</span>
                          </a>
                      </li>

                    <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                              <i className="lni lni-heart"></i>
                              <span>Nutrición</span>
                          </a>
                          <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrar_historianutricion" className="sidebar-link">Registrar historial</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/visualizar_historianutricion" className="sidebar-link">Ver historial</a>
                              </li>
                              
                          </ul>
                      </li>

                    <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth1" aria-expanded="false" aria-controls="auth1">
                                <i class="fa-solid fa-hospital-user"></i>
                              <span>Paciente</span>
                          </a>
                          <ul id="auth1" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/buscar_paciente" className="sidebar-link">Buscar Pacientes</a>
                              </li>
                              
                          </ul>
                      </li>

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth3" aria-expanded="false" aria-controls="auth3">
                                <i class="fa-solid fa-bullhorn"></i>
                              <span>Eventos</span>
                          </a>
                          <ul id="auth3" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrar_evento" className="sidebar-link">Crear evento</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/ver_evento" className="sidebar-link">Ver eventos</a>
                              </li>
                              
                          </ul>
                      </li>

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth4" aria-expanded="false" aria-controls="auth4">
                                <i class="fa-solid fa-file-waveform"></i>
                              <span>Examen médico</span>
                          </a>
                          <ul id="auth4" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrar_examenmedico" className="sidebar-link">Crear examen</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/ver_examenMedico" className="sidebar-link">Buscar examen</a>
                              </li>
                              
                          </ul>
                      </li>

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth5" aria-expanded="false" aria-controls="auth5">
                                <i class="fa-solid fa-file-medical"></i>
                              <span>Historial clínico</span>
                          </a>
                          <ul id="auth5" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrar_evaluacionclinica" className="sidebar-link">Crear historial</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/ver_evaluacionClinica" className="sidebar-link">Buscar historial</a>
                              </li>
                              
                          </ul>
                      </li>

                      <a  className="sidebar-link" onClick={logout} href='/login' >
                          <i className="lni lni-exit"></i>
                          <span>Logout</span>
                      </a>
                    </>
                  ) : user.idRol_id === 6 ? (
                    <>
                    <li className="sidebar-item">
                          <a href="/homeAuxiliar" className="sidebar-link">
                              <i className="lni lni-home"></i>
                              <span>Home</span>
                          </a>
                      </li>
                     
                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                                <i class="fa-solid fa-hospital-user"></i>
                              <span>Pacientes</span>
                          </a>
                          <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/buscar_paciente" className="sidebar-link">Buscar Pacientes</a>
                              </li>
                              
                          </ul>
                      </li>

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth1" aria-expanded="false" aria-controls="auth1">
                                <i class="fa-regular fa-calendar-check"></i>
                              <span>Calendario</span>
                          </a>
                          <ul id="auth1" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/calendario" className="sidebar-link">Calendario general</a>
                              </li>
                             
                          </ul>
                      </li>


                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth3" aria-expanded="false" aria-controls="auth3">
                                <i class="fa-solid fa-bullhorn"></i>
                              <span>Eventos</span>
                          </a>
                          <ul id="auth3" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrar_evento" className="sidebar-link">Crear evento</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/ver_evento" className="sidebar-link">Ver eventos</a>
                              </li>
                              
                          </ul>
                      </li>

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth4" aria-expanded="false" aria-controls="auth4">
                                <i class="fa-solid fa-file-waveform"></i>
                              <span>Examen médico</span>
                          </a>
                          <ul id="auth4" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrar_examenmedico" className="sidebar-link">Crear examen</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/ver_examenMedico" className="sidebar-link">Buscar examen</a>
                              </li>
                              
                          </ul>
                      </li>

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth5" aria-expanded="false" aria-controls="auth5">
                                <i class="fa-solid fa-file-medical"></i>
                              <span>Historial clínico</span>
                          </a>
                          <ul id="auth5" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrar_evaluacionclinica" className="sidebar-link">Crear historial</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/ver_evaluacionClinica" className="sidebar-link">Buscar historial</a>
                              </li>
                              
                          </ul>
                      </li>

                      

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth6" aria-expanded="false" aria-controls="auth6">
                              <i className="lni lni-graph"></i>
                              <span>Reportes</span>
                          </a>
                          <ul id="auth6" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/reportes" className="sidebar-link">Estadisticas</a>
                              </li>
                              
                          </ul>
                      </li>

                    <a  className="sidebar-link" onClick={logout} href='/login' >
                          <i className="lni lni-exit"></i>
                          <span>Logout</span>
                      </a>
                    </>
                  ) : user.idRol_id === 7 ? (
                    <>
                    <li className="sidebar-item">
                          <a href="/homeDirector" className="sidebar-link">
                              <i className="lni lni-home"></i>
                              <span>Home</span>
                          </a>
                      </li>

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth0" aria-expanded="false" aria-controls="auth0">
                              <i className="lni lni-users"></i>
                              <span>Usuarios</span>
                          </a>
                          <ul id="auth0" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/crear_usuario" className="sidebar-link">Crear Usuario</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/ver_usuario" className="sidebar-link">Editar usuarios</a>
                              </li>
                              
                          </ul>
                      </li>
                     
                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                                <i class="fa-solid fa-hospital-user"></i>
                              <span>Pacientes</span>
                          </a>
                          <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                             
                              <li className="sidebar-item">
                                  <a href="/buscar_paciente" className="sidebar-link">Buscar Pacientes</a>
                              </li>
                              
                          </ul>
                      </li>

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth1" aria-expanded="false" aria-controls="auth1">
                                <i class="fa-regular fa-calendar-check"></i>
                              <span>Calendario</span>
                          </a>
                          <ul id="auth1" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/calendario" className="sidebar-link">Calendario general</a>
                              </li>
                             
                          </ul>
                      </li>


                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth3" aria-expanded="false" aria-controls="auth3">
                                <i class="fa-solid fa-bullhorn"></i>
                              <span>Eventos</span>
                          </a>
                          <ul id="auth3" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrar_evento" className="sidebar-link">Crear evento</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/ver_evento" className="sidebar-link">Ver eventos</a>
                              </li>
                              
                          </ul>
                      </li>

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth4" aria-expanded="false" aria-controls="auth4">
                                <i class="fa-solid fa-file-waveform"></i>
                              <span>Examen médico</span>
                          </a>
                          <ul id="auth4" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrar_examenmedico" className="sidebar-link">Crear examen</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/ver_examenMedico" className="sidebar-link">Buscar examen</a>
                              </li>
                              
                          </ul>
                      </li>

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth5" aria-expanded="false" aria-controls="auth5">
                                <i class="fa-solid fa-file-medical"></i>
                              <span>Historial clínico</span>
                          </a>
                          <ul id="auth5" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/registrar_evaluacionclinica" className="sidebar-link">Crear historial</a>
                              </li>
                              <li className="sidebar-item">
                                  <a href="/ver_evaluacionClinica" className="sidebar-link">Buscar historial</a>
                              </li>
                              
                          </ul>
                      </li>

                      

                      <li className="sidebar-item">
                          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                              data-bs-target="#auth6" aria-expanded="false" aria-controls="auth6">
                              <i className="lni lni-graph"></i>
                              <span>Reportes</span>
                          </a>
                          <ul id="auth6" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                              <li className="sidebar-item">
                                  <a href="/reportes" className="sidebar-link">Estadisticas</a>
                              </li>
                              
                          </ul>
                      </li>

                    <a  className="sidebar-link" onClick={logout} href='/login' >
                          <i className="lni lni-exit"></i>
                          <span>Logout</span>
                      </a>
                    </>
                  ) : (
                    <div>
                    </div>
                  )
                }
                  </ul>
                  
                 

              </aside>
              )}
            
            <div className="main p-3">
                <div className="">
                    <App/>
                </div>
                <Footer/>
            </div>
            
        </div>
        
        </div>
        
          
        </>
      )
}

