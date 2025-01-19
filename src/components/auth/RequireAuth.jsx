import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function RequireAuth({ children }) {
  const { isLoggedIn, loading } = useContext(AuthContext); // Récupérer l'état d'authentification
  const location = useLocation();

  // Afficher un loader si l'état de connexion est en cours de chargement
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Chargement...</p>
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
