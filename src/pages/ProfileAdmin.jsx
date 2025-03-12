import React, { useEffect, useState } from "react";
import { axiosClient } from "../api/axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { FaUserEdit, FaCog, FaKey, FaEnvelope } from "react-icons/fa";

function ProfileAdmin() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      const response = await axiosClient.get("/api/user"); // Endpoint pour récupérer les informations
      setAdmin(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des informations de l'admin :", error);
      Swal.fire("Erreur", "Impossible de charger les informations de l'admin.", "error");
    } finally {
      setLoading(false);
    }
  };

  const editAdminInfo = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Modifier les informations",
      html: `
        <input id="swal-input-name" class="swal2-input" placeholder="Nom" value="${admin.name}">
        <input id="swal-input-email" type="email" class="swal2-input" placeholder="Email" value="${admin.email}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Mettre à jour",
      cancelButtonText: "Annuler",
      preConfirm: () => {
        const name = document.getElementById("swal-input-name").value;
        const email = document.getElementById("swal-input-email").value;

        if (!name || !email) {
          Swal.showValidationMessage("Tous les champs sont obligatoires !");
          return null;
        }

        return { name, email };
      },
    });

    if (formValues) {
      try {
        await axiosClient.put("/api/admin/profile", formValues); // Endpoint pour mise à jour
        Swal.fire("Succès", "Les informations ont été mises à jour.", "success");
        fetchAdminProfile();
      } catch (error) {
        Swal.fire("Erreur", "Impossible de mettre à jour les informations.", "error");
      }
    }
  };

  const updatePassword = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Changer le mot de passe",
      html: `
        <input id="swal-input-old-password" class="swal2-input" type="password" placeholder="Ancien mot de passe">
        <input id="swal-input-new-password" class="swal2-input" type="password" placeholder="Nouveau mot de passe">
        <input id="swal-input-confirm-password" class="swal2-input" type="password" placeholder="Confirmez le mot de passe">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Mettre à jour",
      cancelButtonText: "Annuler",
      preConfirm: () => {
        const oldPassword = document.getElementById("swal-input-old-password").value;
        const newPassword = document.getElementById("swal-input-new-password").value;
        const confirmPassword = document.getElementById("swal-input-confirm-password").value;

        if (!oldPassword || !newPassword || !confirmPassword) {
          Swal.showValidationMessage("Tous les champs sont obligatoires !");
          return null;
        }

        if (newPassword !== confirmPassword) {
          Swal.showValidationMessage("Les mots de passe ne correspondent pas !");
          return null;
        }

        return { oldPassword, newPassword };
      },
    });

    if (formValues) {
      try {
        await axiosClient.put("/api/admin/change-password", formValues); // Endpoint pour changement de mot de passe
        Swal.fire("Succès", "Mot de passe mis à jour.", "success");
      } catch (error) {
        Swal.fire("Erreur", "Impossible de mettre à jour le mot de passe.", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton height={30} width="50%" className="mb-6" />
        <Skeleton height={150} className="mb-6" />
        <Skeleton height={50} width="30%" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center text-blue-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Profil Administrateur
      </motion.h1>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-xl font-bold mb-4 text-gray-700">Informations Personnelles</h3>
          <p className="text-lg mb-2">
            <FaUserEdit className="inline mr-2 text-blue-500" />
            <strong>Nom :</strong> {admin.name}
          </p>
          <p className="text-lg mb-2">
            <FaEnvelope className="inline mr-2 text-green-500" />
            <strong>Email :</strong> {admin.email}
          </p>
          <button
            onClick={editAdminInfo}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-700"
          >
            <FaUserEdit className="mr-2" /> Modifier les informations
          </button>
        </motion.div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-xl font-bold mb-4 text-gray-700">Paramètres</h3>
          <button
            onClick={updatePassword}
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg flex items-center hover:bg-yellow-700"
          >
            <FaKey className="mr-2" /> Changer le mot de passe
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default ProfileAdmin;
