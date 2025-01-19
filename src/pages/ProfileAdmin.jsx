import React, { useEffect, useState } from "react";
import { axiosClient } from "../api/axios";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import { FaUserEdit } from "react-icons/fa";

function ProfileAdmin() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      const response = await axiosClient.get("/api/user"); // Remplacez par votre endpoint Laravel
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color="#4A90E2" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Profil Administrateur</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Informations Personnelles</h3>
        <p className="text-lg">
          <strong>Nom :</strong> {admin.name}
        </p>
        <p className="text-lg">
          <strong>Email :</strong> {admin.email}
        </p>
        <button
          onClick={editAdminInfo}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-700"
        >
          <FaUserEdit className="mr-2" /> Modifier les informations
        </button>
      </div>
    </div>
  );
}

export default ProfileAdmin;
