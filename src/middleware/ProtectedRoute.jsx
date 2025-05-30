import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

function isTokenValid(token) {
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


export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    const valid = isTokenValid(token);

    if (!token || !valid) {
        localStorage.removeItem("token");
        return <Navigate to="/login?error=not_logged_in" replace />;
    }

    return children;
}
