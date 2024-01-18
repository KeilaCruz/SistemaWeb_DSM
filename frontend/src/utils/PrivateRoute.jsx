import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'

export function PrivateRoute({ children, ...rest }) {
  console.log("Private route works");

  // Lógica de autenticación aquí (por ejemplo, verificar si el usuario está autenticado)
  const { user } = useContext(AuthContext)


  return user ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
};

