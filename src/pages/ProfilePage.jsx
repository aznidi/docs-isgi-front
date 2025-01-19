import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../router";
import { axiosClient } from "../api/axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Button from "../ui/Button";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { HashLoader } from "react-spinners";
import App from "../components/profile/App";

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Stocker les informations utilisateur
  const [loading, setLoading] = useState(true); // État de chargement

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate(LOGIN_ROUTE);
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const response = await axiosClient.get("/api/user");
      setUser(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
    } finally {
      setLoading(false); // Arrêter le loader une fois les données chargées
    }
  };

  // Loader pendant le chargement des données utilisateur
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader size={50} color="#4A90E2" />
      </div>
    );
  }

  return (
    <>
        <App />
    </>
  );
}

export default ProfilePage;
