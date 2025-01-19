import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { axiosClient } from "../../api/axios";
import { HashLoader } from "react-spinners";
import ModuleInfos from "./ModuleInfos";
import SearchDocuments from "./SearchDocuments";

function App() {
  const { id } = useParams(); // Récupérer l'id depuis l'URL
  const location = useLocation();
  const [module, setModule] = useState(location.state || null); // Données passées depuis le bouton ou null
  const [loading, setLoading] = useState(!module); // Afficher un loader si les données ne sont pas encore chargées
  const [error, setError] = useState(null); // Gérer les erreurs

  // Récupérer le module via l'API si non fourni
  useEffect(() => {
    if (!module) {
      const fetchModule = async () => {
        try {
          const response = await axiosClient.get(`/api/modules/${id}`);
          setModule(response.data);
        } catch (err) {
          console.error("Erreur lors de la récupération du module :", err);
          setError("Impossible de récupérer les informations du module.");
        } finally {
          setLoading(false);
        }
      };

      fetchModule();
    }
  }, [id, module]);

  // Afficher un loader pendant le chargement
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader size={50} color="#4A90E2" />
      </div>
    );
  }

  // Afficher un message d'erreur si le module n'existe pas
  if (error || !module) {
    return (
      <div className="container mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-primary-dark mb-4">
          {error || "Module introuvable"}
        </h1>
        <p className="text-lg text-gray-700">
          Le module que vous recherchez n'existe pas ou a été supprimé.
        </p>
      </div>
    );
  }

  // Afficher le contenu du module
  return (
    <div className="container mx-auto py-16 px-6">
      {/* Section : Informations du module */}
      <ModuleInfos module={module} />

      {/* Section : Moteur de recherche */}
      <SearchDocuments moduleName={module.nomMod} moduleId={module.id} />
    </div>
  );
}

export default App;
