import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../router/index";
import { axiosClient } from "../../api/axios";
import { motion } from "framer-motion";
import { HashLoader } from "react-spinners";
import UserInfo from "./UserInfo";
import ProfileImageUploader from "./ProfileImageUploader";
import FavoriteDocuments from "./FavoriteDocuments";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(user)

  // Vérifier l'authentification et charger les données utilisateur
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate(LOGIN_ROUTE);
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  // Fonction pour récupérer les données utilisateur
  const fetchUserProfile = async () => {
    try {
      const response = await axiosClient.get("/api/user");
      setUser(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
    } finally {
      setLoading(false);
    }
  };

  // Afficher un loader pendant le chargement des données
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader size={50} color="#4A90E2" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6"
    >

      {/* Autres sections */}
      <UserInfo user={user} fetchUserProfile={fetchUserProfile} />
      <ProfileImageUploader user={user} fetchUserProfile={fetchUserProfile} />
      <FavoriteDocuments />
    </motion.div>
  );
}

export default App;
