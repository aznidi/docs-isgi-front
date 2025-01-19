import React, { useEffect, useState } from "react";
import { axiosClient } from "../api/axios";
import { motion } from "framer-motion";
import { FaSearch, FaFilter, FaFileAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { HashLoader } from "react-spinners";

function DocumentsUserPage() {
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [totalPages, setTotalPages] = useState(1); // Nombre total de pages

  useEffect(() => {
    fetchDocuments(currentPage); // Charger les documents à chaque changement de page
  }, [currentPage]);

  const fetchDocuments = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/api/documents", {
        params: {
          search: searchQuery,
          type: typeFilter,
          date: dateFilter,
          page: page,
        },
      });

      setDocuments(response.data.data || []); // Données paginées
      setTotalPages(response.data.meta?.last_page || 1); // Vérifier si la propriété last_page existe
    } catch (error) {
      console.error("Erreur lors du chargement des documents :", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    setCurrentPage(1); // Réinitialiser à la première page après application des filtres
    fetchDocuments(1); // Charger les résultats filtrés
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl lg:text-4xl font-extrabold text-primary mb-4">
          Vos Documents
        </h2>
        <p className="text-gray-600">
          Explorez et gérez vos documents avec des options de recherche et de
          filtrage avancées.
        </p>
      </motion.div>

      {/* Filtres */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
        {/* Recherche */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 px-6 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Recherchez un document..."
          />
          <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Filtre par type */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="py-3 px-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Tous les types</option>
          <option value="pdf">PDF</option>
          <option value="word">Word</option>
          <option value="image">Image</option>
        </select>

        {/* Filtre par date */}
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="py-3 px-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />

        {/* Bouton Appliquer */}
        <button
          onClick={applyFilters}
          className="py-3 px-6 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition"
        >
          Appliquer
        </button>
      </div>

      {/* Liste des documents */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <HashLoader size={50} color="#4A90E2" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <motion.div
              key={doc.id}
              className="p-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              {/* Icône et type */}
              <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-lg">
                {doc.type || "Inconnu"}
              </div>
              <FaFileAlt className="text-primary text-6xl mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-center mb-2">{doc.nomDoc}</h3>
              <p className="text-gray-600 text-sm text-center">{doc.libelleDoc}</p>
              <p className="text-gray-400 text-xs text-center mt-2">{doc.created_at}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8">
        <button
          onClick={() => handlePageChange("prev")}
          className={`px-4 py-2 mx-2 ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary-dark"
          } rounded-lg`}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        <span className="text-gray-700">
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          className={`px-4 py-2 mx-2 ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary-dark"
          } rounded-lg`}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>
    </motion.div>
  );
}

export default DocumentsUserPage;
