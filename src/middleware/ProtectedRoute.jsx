import { Navigate, useLocation } from "react-router-dom";

function isAuthenticated() {
    return !!localStorage.getItem("authToken");
}

export default function ProtectedRoute({ children }) {
    const location = useLocation();

    if (!isAuthenticated()) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
