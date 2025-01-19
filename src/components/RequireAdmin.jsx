import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners"; // Loader pour l'attente

function RequireAdmin({ children }) {
    const { user, loading } = useContext(AuthContext);

    // Attendre que le chargement soit terminé
    if (loading) {
        return (
        <div className="flex justify-center items-center min-h-screen">
            <HashLoader size={50} color="#4A90E2" />
        </div>
        );
    }
    if(!user) {
        return <Navigate to="/login" replace />;
    }

    // Vérifier si l'utilisateur est admin
    if (!user || user.role !== "admin") {
        return <Navigate to="/" replace />; // Redirection si l'utilisateur n'est pas admin
    }

    return children;
}

export default RequireAdmin;
