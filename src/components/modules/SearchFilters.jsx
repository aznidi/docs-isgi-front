import React from "react";
import { FaSearch, FaSortAlphaDown, FaCalendarAlt } from "react-icons/fa";

const SearchFilters = ({
  searchQuery,
  setSearchQuery,
  selectedYear,
  setSelectedYear,
  sortOption,
  setSortOption,
  handleSearch,
  loading,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    handleSearch(); // Appelle la recherche lors de la soumission du formulaire
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 mb-6">
      {/* Barre de recherche */}
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
            onChange={(e) => setSelectedYear(e.target.value)}
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
            onChange={(e) => setSortOption(e.target.value)}
            className="py-3 px-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Trier par...</option>
            <option value="name">Nom</option>
            <option value="year">Année</option>
          </select>
        </div>
      </div>

      {/* Bouton Rechercher */}
      <button
        type="submit"
        disabled={loading} // Désactive le bouton si le loader est actif
        className={`py-2 px-6 rounded-lg shadow-md transition ${
          loading
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary-dark"
        }`}
      >
        {loading ? "Chargement..." : "Rechercher"}
      </button>
    </form>
  );
};

export default SearchFilters;
