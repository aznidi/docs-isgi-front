import React, { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import ModuleCard from "../modules/ModuleCard";
import { motion } from "framer-motion";
import { HashLoader } from "react-spinners";
import { FaSearch, FaSortAlphaDown, FaCalendarAlt } from "react-icons/fa";

function App() {
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Recherche
  const [selectedYear, setSelectedYear] = useState("all"); // Filtrage par année
  const [sortOption, setSortOption] = useState(""); // Option de tri
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true); // Activer le loader
        const response = await axiosClient.get("/api/modules");
        setModules(response.data);
        setFilteredModules(response.data); // Initialiser les résultats
      } catch (error) {
        console.error("Erreur lors du chargement des modules :", error);
      } finally {
        setLoading(false); // Désactiver le loader
      }
    };

    fetchModules();
  }, []);

  // Gestion de la recherche
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(query, selectedYear, sortOption);
  };

  // Gestion du filtrage par année
  const handleYearFilter = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    applyFilters(searchQuery, year, sortOption);
  };

  // Gestion du tri
  const handleSort = (e) => {
    const sort = e.target.value;
    setSortOption(sort);
    applyFilters(searchQuery, selectedYear, sort);
  };

  // Appliquer les filtres et le tri
  const applyFilters = (query, year, sort) => {
    let result = modules;

    // Filtrer par recherche
    if (query) {
      result = result.filter(
        (module) =>
          module.nomMod.toLowerCase().includes(query) ||
          module.descriptionMod.toLowerCase().includes(query) ||
          module.anneeMod.toLowerCase().includes(query)
      );
    }

    // Filtrer par année
    if (year !== "all") {
      result = result.filter((module) => module.anneeMod === year);
    }

    // Trier les résultats
    if (sort === "name") {
      result = result.sort((a, b) => a.nomMod.localeCompare(b.nomMod));
    } else if (sort === "year") {
      result = result.sort((a, b) => a.anneeMod.localeCompare(b.anneeMod));
    }

    setFilteredModules(result);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader size={50} color="#4A90E2" />
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
     {/* Titre et introduction */}
    <motion.div
    className="text-center mb-12"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    >
        <h2 className="text-3xl mt-20 lg:text-4xl font-extrabold text-primary-dark mb-4 flex items-center justify-center gap-2">
            À Quel Module Pensez-Vous ?
        </h2>
        <p className="text-gray-700 text-lg">
            Explorez les modules qui suscitent le plus d’intérêt et qui enrichissent vos compétences.
        </p>
    </motion.div>


      {/* Filtres et recherche */}
      <div className="flex flex-col items-center space-y-4 mb-6">
        {/* Barre de recherche */}
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full py-3 px-6 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Recherchez un module..."
          />
          <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Options de filtrage et de tri */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Filtre par année */}
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-primary-dark" />
            <select
              value={selectedYear}
              onChange={handleYearFilter}
              className="py-3 px-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Toutes les années</option>
              <option value="1ère Année">1ère Année</option>
              <option value="2ème Année">2ème Année</option>
              <option value="3ème Année">3ème Année</option>
            </select>
          </div>

          {/* Tri */}
          <div className="flex items-center gap-2">
            <FaSortAlphaDown className="text-primary-dark" />
            <select
              value={sortOption}
              onChange={handleSort}
              className="py-3 px-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Trier par...</option>
              <option value="name">Nom</option>
              <option value="year">Année</option>
            </select>
          </div>
        </div>
      </div>

      {/* Résultats filtrés */}
      {filteredModules.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          Aucun module trouvé pour la recherche : "{searchQuery}"
        </p>
      )}
    </motion.div>
  );
}

export default App;
