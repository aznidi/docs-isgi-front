import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../api/axios";
import DocInfos from "./DocInfos";
import DocComments from "./DocComments";
import DocSimilaires from "./DocSimilaires";
import ContentDoc from "./ContentDoc";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

function App() {
  const { id } = useParams(); // ID du document
  const [document, setDocument] = useState(null);
  const [comments, setComments] = useState([]); // Stocker les commentaires
  const [likesCount, setLikesCount] = useState(0); // Compteur des likes

  const [loading, setLoading] = useState(true); // Loader global
  const [loadingComments, setLoadingComments] = useState(true); // Loader pour les commentaires
  const [loadingLikes, setLoadingLikes] = useState(false); // Loader pour les likes

  const handleLike = async () => {
    setLoadingLikes(true);
    try {
      const response = await axiosClient.post(`/api/documents/${id}/like`);
      if (response.data.status === "added") {
        setLikesCount((prev) => prev + 1);
      } else if (response.data.status === "removed") {
        setLikesCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      Swal.fire("Erreur", "Impossible d'ajouter un like.", "error");
    } finally {
      setLoadingLikes(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Charger les informations du document
        const documentResponse = await axiosClient.get(`/api/documents/${id}`);
        setDocument(documentResponse.data);
        setLikesCount(documentResponse.data.likes || 0);

        // Charger les commentaires
        const commentsResponse = await axiosClient.get(`/api/documents/${id}/comments`);
        setComments(commentsResponse.data);
        setLoadingComments(false);
      } catch (error) {
        Swal.fire("Erreur", "Une erreur est survenue lors du chargement des données.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Skeleton loader pour les informations du document
  const renderSkeletonDocInfos = () => (
    <div className="mb-10">
      <Skeleton height={30} width="50%" className="mb-4" />
      <Skeleton height={20} width="70%" className="mb-4" />
      <Skeleton height={20} width="60%" />
    </div>
  );

  // Skeleton loader pour le contenu du document
  const renderSkeletonContent = () => (
    <div className="mb-10">
      <Skeleton height={200} />
    </div>
  );

  // Skeleton loader pour les commentaires
  const renderSkeletonComments = () => (
    <div className="mb-10">
      <Skeleton height={20} width="40%" className="mb-4" />
      {Array(3)
        .fill()
        .map((_, index) => (
          <div key={index} className="mb-4">
            <Skeleton height={20} width="80%" className="mb-2" />
            <Skeleton height={20} width="90%" />
          </div>
        ))}
    </div>
  );

  // Skeleton loader pour les documents similaires
  const renderSkeletonSimilarDocs = () => (
    <div>
      <Skeleton height={20} width="50%" className="mb-4" />
      {Array(3)
        .fill()
        .map((_, index) => (
          <Skeleton key={index} height={100} className="mb-4" />
        ))}
    </div>
  );

  return (
    <motion.div
      className="container mx-auto px-6 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Informations sur le document */}
      {loading ? renderSkeletonDocInfos() : (
        <div className="mb-10">
          <DocInfos
            document={document}
            likesCount={likesCount}
            handleLike={handleLike}
            loadingLikes={loadingLikes}
          />
        </div>
      )}

      {/* Contenu du document */}
      {loading ? renderSkeletonContent() : (
        <div className="mb-10">
          <ContentDoc document={document} />
        </div>
      )}

      {/* Commentaires */}
      {loading || loadingComments ? renderSkeletonComments() : (
        <div className="mb-10">
          <DocComments comments={comments} documentId={document.id} />
        </div>
      )}

      {/* Documents similaires */}
      {loading ? renderSkeletonSimilarDocs() : (
        <div>
          <DocSimilaires moduleId={document.module_id} documentId={document.id} />
        </div>
      )}
    </motion.div>
  );
}

export default App;
