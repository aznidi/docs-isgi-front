import React, { useState } from "react";
import { FaUser, FaBell, FaPaintBrush, FaLock, FaSave, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  const handleSaveChanges = () => {
    Swal.fire({
      title: "Modifications enregistrées !",
      text: "Vos paramètres ont été sauvegardés avec succès.",
      icon: "success",
      confirmButtonText: "OK",
      customClass: {
        confirmButton: "bg-blue-500 text-white px-4 py-2 rounded",
      },
    });
  };

  const handleDeleteAccount = () => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible. Toutes vos données seront supprimées.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
      customClass: {
        confirmButton: "bg-red-500 text-white px-4 py-2 rounded",
        cancelButton: "bg-gray-300 text-gray-700 px-4 py-2 rounded",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Supprimé !", "Votre compte a été supprimé avec succès.", "success");
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Paramètres</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Section Gestion de Compte */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaUser className="text-blue-500 mr-2" /> Gestion du Compte
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Nom d'utilisateur</label>
              <input
                type="text"
                placeholder="Entrez votre nom d'utilisateur"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Adresse Email</label>
              <input
                type="email"
                placeholder="Entrez votre email"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              type="button"
              onClick={handleSaveChanges}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              <FaSave className="inline-block mr-2" /> Sauvegarder
            </button>
          </form>
        </div>

        {/* Section Notifications */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaBell className="text-yellow-500 mr-2" /> Notifications
          </h2>
          <label className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            Recevoir des notifications par email
          </label>
          <label className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            Recevoir des notifications par SMS
          </label>
          <label className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            Activer les notifications push
          </label>
          <button
            type="button"
            onClick={handleSaveChanges}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <FaSave className="inline-block mr-2" /> Sauvegarder
          </button>
        </div>

        {/* Section Préférences */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaPaintBrush className="text-purple-500 mr-2" /> Préférences
          </h2>
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              className="mr-2"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            Activer le mode sombre
          </label>
          <button
            type="button"
            onClick={handleSaveChanges}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <FaSave className="inline-block mr-2" /> Sauvegarder
          </button>
        </div>

        {/* Section Sécurité */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaLock className="text-red-500 mr-2" /> Sécurité
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Mot de passe actuel</label>
              <input
                type="password"
                placeholder="Entrez votre mot de passe actuel"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Nouveau mot de passe</label>
              <input
                type="password"
                placeholder="Entrez votre nouveau mot de passe"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Confirmer le mot de passe</label>
              <input
                type="password"
                placeholder="Confirmez votre nouveau mot de passe"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              type="button"
              onClick={handleSaveChanges}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              <FaSave className="inline-block mr-2" /> Sauvegarder
            </button>
          </form>
        </div>

        {/* Supprimer le compte */}
        <div className="bg-white shadow-lg rounded-lg p-6 col-span-full">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaTrashAlt className="text-gray-700 mr-2" /> Supprimer le Compte
          </h2>
          <p className="text-gray-600 mb-4">
            Vous pouvez supprimer votre compte définitivement. Cette action est irréversible.
          </p>
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Supprimer mon compte
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default SettingsPage;
