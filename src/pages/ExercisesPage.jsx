import React, { useEffect, useState } from "react";
import { axiosClient } from "../api/axios";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaSearch } from "react-icons/fa";
import ExerciceCard from "../components/exercices/ExerciceCard";

function ExercisesPage() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [modules, setModules] = useState([]); // Liste des modules pour le filtre
  const [selectedModule, setSelectedModule] = useState("all"); // Filtrage par module
  const [selectedLevel, setSelectedLevel] = useState("all"); // Filtrage par niveau

  // Charger les exercices et les modules
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const exercisesResponse = await axiosClient.get("/api/exercises");
        const modulesResponse = await axiosClient.get("/api/modules");

        setExercises(exercisesResponse.data.data);
        setFilteredExercises(exercisesResponse.data.data);
        setModules(modulesResponse.data);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Gestion de la recherche
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(query, selectedModule, selectedLevel);
  };

  // Gestion du filtre par module
  const handleModuleFilter = (e) => {
    const module = e.target.value;
    setSelectedModule(module);
    applyFilters(searchQuery, module, selectedLevel);
  };

  // Gestion du filtre par niveau
  const handleLevelFilter = (e) => {
    const level = e.target.value;
    setSelectedLevel(level);
    applyFilters(searchQuery, selectedModule, level);
  };

  // Appliquer les filtres
  const applyFilters = (query, module, level) => {
    let results = exercises;

    // Filtrer par recherche
    if (query) {
      results = results.filter(
        (exercise) =>
          exercise.title.toLowerCase().includes(query) ||
          (exercise.description &&
            exercise.description.toLowerCase().includes(query)) ||
          (exercise.module &&
            exercise.module.nomMod.toLowerCase().includes(query))
      );
    }

    // Filtrer par module
    if (module !== "all") {
      results = results.filter((exercise) => exercise.module.nomMod === module);
    }

    // Filtrer par niveau
    if (level !== "all") {
      results = results.filter((exercise) => exercise.level === level);
    }

    setFilteredExercises(results);
  };

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
        {loading ? (
          <Skeleton height={40} width="60%" className="mb-4 mx-auto" />
        ) : (
          <h2 className="text-3xl lg:text-4xl font-extrabold text-primary-dark mb-4 mt-16">
            Explorez les Exercices et leurs Solutions
          </h2>
        )}
        {loading ? (
          <Skeleton height={20} width="80%" className="mx-auto" />
        ) : (
          <p className="text-gray-700 text-lg">
            Découvrez des exercices enrichissants et accédez aux solutions pour approfondir vos compétences.
          </p>
        )}
      </motion.div>

      {/* Barre de recherche */}
      <div className="relative mb-6 max-w-lg mx-auto">
        {loading ? (
          <Skeleton height={40} />
        ) : (
          <>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full py-3 px-6 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Recherchez un exercice..."
            />
            <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
          </>
        )}
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {/* Filtre par module */}
        {loading ? (
          <Skeleton height={40} width={200} />
        ) : (
          <div>
            <label htmlFor="module" className="block text-gray-700 text-sm mb-1">
              Filtrer par module :
            </label>
            <select
              id="module"
              value={selectedModule}
              onChange={handleModuleFilter}
              className="py-2 px-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Tous les modules</option>
              {modules.map((module) => (
                <option key={module.id} value={module.nomMod}>
                  {module.nomMod}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Filtre par niveau */}
        {loading ? (
          <Skeleton height={40} width={200} />
        ) : (
          <div>
            <label htmlFor="level" className="block text-gray-700 text-sm mb-1">
              Filtrer par niveau :
            </label>
            <select
              id="level"
              value={selectedLevel}
              onChange={handleLevelFilter}
              className="py-2 px-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Tous les niveaux</option>
              <option value="facile">Facile</option>
              <option value="intermédiaire">Intermédiaire</option>
              <option value="avancé">Avancé</option>
            </select>
          </div>
        )}
      </div>

      {/* Résultats filtrés */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill()
            .map((_, index) => (
              <div key={index} className="p-4 bg-white shadow-md rounded-lg">
                <Skeleton height={150} className="mb-4" />
                <Skeleton height={20} width="80%" className="mb-2" />
                <Skeleton height={20} width="60%" />
              </div>
            ))}
        </div>
      ) : filteredExercises.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <ExerciceCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          Aucun exercice trouvé pour les critères sélectionnés.
        </p>
      )}
    </motion.div>
  );
}

export default ExercisesPage;
