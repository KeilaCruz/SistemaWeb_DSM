import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {

  // Lógica de autenticación aquí (por ejemplo, verificar si el usuario está autenticado)
  const {user} = useContext(AuthContext)


  return user ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
