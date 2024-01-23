import { Route, Navigate } from "react-router-dom"
import AuthContext from "../context/AuthProvider";
import { useContext } from "react";

export function PrivateRoute({ element: Element, ...rest }) {
    console.log("Las rutas privadas están funcionando");
    const { auth } = useContext(AuthContext);

    return auth ? (
        <Route {...rest} element={<Element />} />
    ) : (
        <Navigate to="/login" replace />
    );
}

