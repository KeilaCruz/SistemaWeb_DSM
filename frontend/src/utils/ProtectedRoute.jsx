import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import AuthContext from "../context/AuthProvider"

export const ProtectedRoute = ({ redirectTo = "/login", rolPermitido, children }) => {
    const { user } = useContext(AuthContext)
    //console.log(user)
    if (!user) return <Navigate to="/login" />

    if (user.idRol_id === rolPermitido) {
        return children ? children : <Outlet />
    } else {
        return <Navigate to={redirectTo} replace />;
    }
};
