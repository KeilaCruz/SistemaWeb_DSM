import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./utils/PrivateRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="">
          <AuthProvider>
            <Header /> {/* Agrega el componente Header aquí */}
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />
              {/* Puedes usar Navigate para redirigir a la página de inicio si no está autenticado */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Toaster />
          </AuthProvider>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
