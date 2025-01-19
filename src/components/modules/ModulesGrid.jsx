import React from "react";
import ModuleCard from "./ModuleCard";

const ModulesGrid = ({ modules, searchQuery }) => {
  return (
    <div>
      {modules.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          Aucun module trouvé pour la recherche : "{searchQuery}"
        </p>
      )}
    </div>
  );
};

export default ModulesGrid;
