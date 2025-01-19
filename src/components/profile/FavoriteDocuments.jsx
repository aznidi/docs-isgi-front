import React, { useState, useEffect } from "react";
import { axiosClient } from "../../api/axios";
import { HashLoader } from "react-spinners";
import { FaStar, FaEye, FaFilter } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function FavoriteDocuments() {
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavoriteDocuments();
  }, []);

  useEffect(() => {
    if (filterType) {
      setFilteredFavorites(favorites.filter((fav) => fav.document.type === filterType));
    } else {
      setFilteredFavorites(favorites);
    }
  }, [filterType, favorites]);

  const fetchFavoriteDocuments = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/api/favorites");
      setFavorites(response.data.map((favorite) => ({
        ...favorite,
        isFavorite: true,
      })));
    } catch (error) {
      console.error("Erreur lors de la récupération des documents favoris :", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (documentId) => {
    try {
      const response = await axiosClient.post(`/api/documents/${documentId}/favorite`);
      setFavorites((prevFavorites) =>
        prevFavorites.map((favorite) =>
          favorite.document.id === documentId
            ? { ...favorite, isFavorite: response.data.status === "added" }
            : favorite
        )
      );

      if (response.data.status === "added") {
        Swal.fire("Succès", "Document ajouté aux favoris", "success");
      } else if (response.data.status === "removed") {
        Swal.fire("Succès", "Document retiré des favoris", "success");
      }
    } catch (error) {
      Swal.fire("Erreur", "Impossible de mettre à jour les favoris", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader size={50} color="#4A90E2" />
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 max-w-5xl mx-auto">
      {/* Titre */}
      <motion.h3
        className="text-2xl font-bold mb-6 text-primary-dark text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Vos Documents Favoris
      </motion.h3>

      {/* Barre de filtrage */}
      <div className="flex items-center gap-4 mb-6">
        <FaFilter className="text-primary text-lg" />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Tous les types</option>
          <option value="pdf">PDF</option>
          <option value="video">Vidéo</option>
          <option value="tp">TP</option>
          <option value="efm">EFM</option>
          <option value="control">Contrôle</option>
          <option value="cours">Cours</option>
        </select>
      </div>

      {/* Liste des documents favoris */}
      {filteredFavorites.length === 0 ? (
        <motion.p
          className="text-gray-500 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Aucun document favori pour ce type.
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((favorite) => (
            <motion.div
              key={favorite.id}
              className="bg-gray-100 rounded-lg shadow-lg overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Image */}
              <img
                src={`http://localhost:8000/storage/${favorite.document.module.imageMod}`}
                alt={favorite.document.module.nomMod}
                className="w-full h-40 object-cover"
              />

              {/* Informations */}
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  {favorite.document.libelleDoc}
                </h4>
                <p className="text-sm text-gray-600">
                  {favorite.document.module.nomMod}
                </p>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {favorite.document.descriptionDoc}
                </p>
              </div>

              {/* Boutons d'action */}
              <div className="p-4 space-y-4">
                <motion.button
                  className="w-full bg-primary-dark text-white text-center py-2 rounded-lg hover:bg-primary transition flex items-center justify-center space-x-2"
                  onClick={() => navigate(`/documents/${favorite.document.id}`)}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <FaEye />
                  <span>Voir les détails</span>
                </motion.button>
                <motion.button
                  className={`w-full py-2 rounded-lg flex items-center justify-center space-x-2 ${
                    favorite.isFavorite ? "bg-yellow-500 text-white" : "bg-gray-300 text-gray-700"
                  }`}
                  onClick={() => toggleFavorite(favorite.document.id)}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <FaStar />
                  <span>{favorite.isFavorite ? "Retirer" : "Ajouter"}</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoriteDocuments;
