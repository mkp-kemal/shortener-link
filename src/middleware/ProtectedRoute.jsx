import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

export function isTokenValid(token) {
    if (!token) return false;
    try {
        const { exp } = jwtDecode(token);
        if (!exp) return false;
        

        const now = Date.now() / 1000;
        return exp > now;
    } catch {
        return false;
    }
}


export function ProtectedRoute({ children }) {
    const token = localStorage.getItem("access_token");
    const valid = isTokenValid(token);

    if (!token || !valid) {
        localStorage.removeItem("access_token");
        return <Navigate to="/login?error=not_logged_in" replace />;
    }

    return children;
}

