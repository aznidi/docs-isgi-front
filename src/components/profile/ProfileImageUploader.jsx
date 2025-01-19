import React, { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { HashLoader } from "react-spinners";
import { FaUpload, FaRedo, FaImage } from "react-icons/fa";
import { axiosClient } from "../../api/axios";

function ProfileImageUploader({ user, fetchUserProfile }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // Pour prévisualiser l'image
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Vérification du type de fichier (images uniquement)
      if (!file.type.startsWith("image/")) {
        Swal.fire("Erreur", "Veuillez sélectionner un fichier image valide.", "error");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Générer l'URL pour la prévisualisation
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      Swal.fire("Erreur", "Veuillez sélectionner une image à télécharger.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("profile_image", selectedFile);

    try {
      setUploading(true);
      const response = await axiosClient.post("/api/update-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        Swal.fire("Succès", "Votre image de profil a été mise à jour.", "success");
        fetchUserProfile(); // Actualiser les données utilisateur
      }
    } catch (error) {
      Swal.fire("Erreur", "Impossible de mettre à jour l'image de profil.", "error");
    } finally {
      setUploading(false);
      setSelectedFile(null); // Réinitialiser l'état du fichier
      setPreviewUrl(null); // Réinitialiser la prévisualisation
    }
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg p-6 space-y-6 max-w-3xl mb-6 mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Titre */}
      <h3 className="text-xl font-bold text-primary-dark text-center">Modifier l'image de profil</h3>
      <hr className="border-t-2 border-neutral-light" />

      {/* Contenu principal */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Aperçu de l'image */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={
              previewUrl ||
              (user.profile_image?.startsWith("http")
                ? user.profile_image
                : user.profile_image
                ? `http://localhost:8000/storage/${user.profile_image}`
                : "https://via.placeholder.com/150")
            }
            alt="Image de profil"
            className="w-32 h-32 rounded-full shadow-md object-cover"
          />
          <p className="text-sm text-neutral mt-2">Image actuelle ou sélectionnée</p>
        </motion.div>

        {/* Formulaire d'upload */}
        <div className="flex flex-col items-center w-full space-y-4">
          <label className="w-full flex items-center gap-2 px-4 py-3 border rounded-lg text-neutral-dark bg-gray-100 hover:bg-gray-200 cursor-pointer">
            <FaImage className="text-primary text-lg" />
            <span>Sélectionnez une image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {selectedFile && (
            <p className="text-sm text-neutral">
              Fichier sélectionné : <span className="font-medium">{selectedFile.name}</span>
            </p>
          )}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleUpload}
              className="bg-primary-dark text-white py-3 px-6 rounded-lg shadow-lg flex items-center space-x-2 text-lg hover:bg-primary transition"
              disabled={uploading || !selectedFile}
            >
              {uploading ? (
                <HashLoader size={20} color="white" />
              ) : (
                <>
                  <FaUpload />
                  <span>Mettre à jour</span>
                </>
              )}
            </button>
            {selectedFile && (
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className="bg-gray-300 text-gray-700 py-3 px-6 rounded-lg shadow-lg flex items-center space-x-2 text-lg hover:bg-gray-400 transition"
              >
                <FaRedo />
                <span>Réinitialiser</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProfileImageUploader;
