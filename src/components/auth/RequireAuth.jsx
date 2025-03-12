import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { HashLoader } from "react-spinners";

function RequireAuth({ children }) {
  const { isLoggedIn, loading } = useContext(AuthContext); // Récupérer l'état d'authentification
  const location = useLocation();

  // Afficher un loader si l'état de connexion est en cours de chargement
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex justify-center items-center min-h-screen">
                <HashLoader size={50} color="#4A90E2" />
            </div>
      </div>
    );
  }

  // Rediriger vers /login si l'utilisateur n'est pas connecté
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Afficher les enfants si l'utilisateur est connecté
  return children;
}

export default RequireAuth;
