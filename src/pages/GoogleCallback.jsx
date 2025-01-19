import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../api/axios";
import { ClipLoader } from "react-spinners"; // Loader visuel
import { motion } from "framer-motion";

function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (token) {
        const timestamp = Date.now(); // Enregistrer le timestamp

        // Stocker le token et le timestamp dans localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("token_timestamp", timestamp.toString());

        // Configurer Axios avec le token
        axiosClient.defaults.headers.Authorization = `Bearer ${token}`;

        // Simuler un délai de chargement avant de rediriger (1 seconde)
        setTimeout(() => {
          navigate("/"); // Rediriger vers la page d'accueil
        }, 1000); // 1 seconde
      } else {
        // Rediriger vers la page de connexion si le token est absent
        navigate("/login");
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* Loader affiché pendant le traitement */}
        <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        >
        <ClipLoader size={50} color="#4A90E2" />
        </motion.div>
    </div>
  );
}

export default GoogleCallback;
