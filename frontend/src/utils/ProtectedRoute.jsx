import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import AuthContext from "../context/AuthProvider"
export const ProtectedRoute = ({ redirectTo, children }) => {
    const { user } = useContext(AuthContext)
    console.log(user)
    if (!user) {
        return <Navigate to="/login" />
    }
    if (user.idRol_id === 1) {
        return <Navigate to="/homePsicologia" />;
    } else if (user.idRol_id === 2) {
        return <Navigate to="/homeRecepcionista" />;
    }

    return children ? children : <Outlet />
}
export default ProtectedRoute;