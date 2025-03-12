import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { axiosClient } from "../../api/axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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
          setError("Impossible de récupérer les informations du module.");
        } finally {
          setLoading(false);
        }
      };

      fetchModule();
    }
  }, [id, module]);

  // Skeleton pour les informations du module
  const renderSkeletonInfos = () => (
    <div className="mb-8">
      <Skeleton height={30} width="50%" className="mb-4" />
      <Skeleton count={3} />
    </div>
  );

  // Skeleton pour le moteur de recherche
  const renderSkeletonSearch = () => (
    <div className="mt-8">
      <Skeleton height={25} width="30%" className="mb-4" />
      <Skeleton height={150} />
    </div>
  );

  // Afficher un message d'erreur si le module n'existe pas
  if (error || (!loading && !module)) {
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

  // Afficher le skeleton loader pendant le chargement
  if (loading) {
    return (
      <div className="container mx-auto py-16 px-6">
        {renderSkeletonInfos()}
        {renderSkeletonSearch()}
      </div>
    );
  }

  // Afficher le contenu du module
  return (
    <div className="container mx-auto py-16 px-6">
      {/* Section : Informations du module */}
      {loading ? renderSkeletonInfos() : <ModuleInfos module={module} />}

      {/* Section : Moteur de recherche */}
      {loading ? renderSkeletonSearch() : <SearchDocuments moduleName={module.nomMod} moduleId={module.id} />}
    </div>
  );
}

export default App;
