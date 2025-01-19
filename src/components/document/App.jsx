import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../api/axios";
import DocInfos from "./DocInfos";
import DocComments from "./DocComments";
import DocSimilaires from "./DocSimilaires";
import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import ContentDoc from "./ContentDoc";

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
        //
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader size={50} color="#4A90E2" />
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-6 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Informations sur le document */}
      <div className="mb-10">
        <DocInfos
          document={document}
          likesCount={likesCount}
          handleLike={handleLike}
          loadingLikes={loadingLikes}
        />
      </div>

      {/* Contenue du document */}
      {
        document?.content ? <div className="mb-10">
                                <ContentDoc
                                document={document}
                                />
                            </div>
                            : ''
      }


      {/* Commentaires */}
      <div className="mb-10">
        {loadingComments ? (
          <div className="flex justify-center">
            <HashLoader size={30} color="#4A90E2" />
          </div>
        ) : (
          <DocComments comments={comments} documentId={document.id} />
        )}
      </div>

      {/* Documents similaires */}
    <div>
          {
            document ? <DocSimilaires moduleId={document.module_id} documentId={document.id} /> : <HashLoader size={30} color="#4A90E2" />
          }

      </div>
    </motion.div>
  );
}

export default App;
