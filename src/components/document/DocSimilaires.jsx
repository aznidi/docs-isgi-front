import React, { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import { HashLoader } from "react-spinners";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DocumentCard from "../singleModule/DocumentCard"; // Réutilisation du composant DocumentCard
import { motion } from "framer-motion";

function DocSimilaires({ moduleId, documentId }) {
  const [similarDocs, setSimilarDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarDocuments = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/api/documents/${documentId}/similar`, {
          params: { excludeId: documentId },
        });
        setSimilarDocs(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des documents similaires :", error);
      } finally {
        setLoading(false);
      }
    };

    if (moduleId) fetchSimilarDocuments();
  }, [moduleId, documentId]);

  // Fonction pour afficher les skeletons
  const renderSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(3)
        .fill()
        .map((_, index) => (
          <div key={index} className="p-4 bg-white shadow rounded-lg">
            <Skeleton height={200} className="mb-4" />
            <Skeleton height={20} width="80%" className="mb-2" />
            <Skeleton height={20} width="60%" />
          </div>
        ))}
    </div>
  );

  if (loading) {
    return (
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-2xl font-semibold text-primary-dark mb-4">Vous pourriez aimer ça !</h3>
        {renderSkeletons()}
      </motion.div>
    );
  }

  if (similarDocs.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6">
        <p>Aucun document similaire trouvé.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h3 className="text-2xl font-semibold text-primary-dark mb-4">Vous pourriez aimer ça !</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarDocs.map((doc) => (
          <DocumentCard key={doc.id} document={doc} />
        ))}
      </div>
    </motion.div>
  );
}

export default DocSimilaires;
