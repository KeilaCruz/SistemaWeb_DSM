import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

export const ProtectedRoute = ({ redirectTo = "/login", rolesPermitidos = [], children }) => {
    const { user } = useContext(AuthContext);
    
    if (!user) return <Navigate to="/login" />;

    // Verificar si el usuario tiene alguno de los roles permitidos
    const tieneRolPermitido = Array.isArray(rolesPermitidos) && rolesPermitidos.includes(user.idRol_id);
    
    if (tieneRolPermitido) {
        return children ? children : <Outlet />;
    } else {
        return <Navigate to={redirectTo} replace />;
    }
};

