import React, { useState, useEffect } from "react";
import { FaHeart, FaVideo, FaDownload, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { axiosClient } from "../../api/axios";
import { HashLoader } from "react-spinners";

function DocInfos({ document }) {
  // Vérifiez si `document` est nul ou indéfini
  if (!document) {
    return (
      <div className="flex justify-center items-center py-6">
        <HashLoader size={30} color="#4A90E2" />
      </div>
    );
  }

  const [isLiked, setIsLiked] = useState(false); // Suivi de l'état du like
  const [likesCount, setLikesCount] = useState(null); // Compteur des likes
  const [isLoadingLike, setIsLoadingLike] = useState(false); // Loader pour les likes
  const [isFavorite, setIsFavorite] = useState(false); // État pour les favoris
  const [isLoadingFav, setIsLoadingFav] = useState(false);


  // Récupérer les likes lors du montage du composant
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likesResponse = await axiosClient.get(`/api/documents/${document.id}/likes`);
        setLikesCount(likesResponse.data.likes);
      } catch (error) {
        console.error("Erreur lors de la récupération des likes :", error);
      }
    };

    const fetchLikeState = async () => {
      try {
        const response = await axiosClient.get(`/api/documents/${document.id}/like-status`);
        setIsLiked(response.data.liked);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'état du like :", error);
      }
    };


    const checkFavoriteStatus = async () => {
        try {
          const response = await axiosClient.get(`/api/documents/${document.id}/is-favorite`);
          setIsFavorite(response.data.isFavorite);
        } catch (error) {
          //
        } finally {
          //
        }
    };


    fetchLikes();
    fetchLikeState();
    checkFavoriteStatus();
  }, [document.id]);

  const handleLike = async () => {
    setIsLoadingLike(true); // Activer le loader
    try {
      const response = await axiosClient.post(`/api/documents/${document.id}/like`);
      if (response.data.status === "added") {
        setIsLiked(true);
        setLikesCount((prev) => prev + 1); // Incrémenter le compteur
      } else if (response.data.status === "removed") {
        setIsLiked(false);
        setLikesCount((prev) => Math.max(0, prev - 1)); // Décrémenter le compteur
      }
    } catch (error) {
      Swal.fire("Erreur", "Une erreur est survenue lors du traitement du like.", "error");
    } finally {
      setIsLoadingLike(false); // Désactiver le loader
    }
  };


  const toggleFavorite = async () => {
    try {
        setIsLoadingFav(true);
        const response = await axiosClient.post(`/api/documents/${document.id}/favorite`);
        if (response.data.status === "added") {
            setIsFavorite(true);
            Swal.fire("Succès", "Document ajouté aux favoris", "success");
        } else if (response.data.status === "removed") {
            setIsFavorite(false);
            Swal.fire("Succès", "Document retiré des favoris", "success");
        }
    } catch (error) {
        Swal.fire("Erreur", "Impossible de mettre à jour les favoris", "error");
    }finally{
        setIsLoadingFav(false);
    }
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg overflow-hidden p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Image du module */}
      {document.module?.imageMod && (
        <div className="h-48 bg-gray-100 flex justify-center items-center">
          <img
            src={`http://localhost:8000/storage/${document.module.imageMod}`}
            alt={document.module.nomMod}
            className="h-full w-auto object-contain"
          />
        </div>
      )}

      {/* Titre et description */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-primary-dark">{document.libelleDoc}</h1>
        <p className="text-gray-600 italic text-lg">{document.nomDoc.replace(/_/g, " ")}</p>
      </div>

      {/* Description complète */}
      <p className="text-gray-700 text-base leading-relaxed">{document.descriptionDoc}</p>

      {/* Informations supplémentaires */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <p className="flex items-center text-gray-700">
          <FaVideo className="mr-2 text-blue-500" />
          <strong>Type :</strong> {document.type.toUpperCase()}
        </p>
        <p className="flex items-center text-gray-700">
          <FaDownload className="mr-2 text-green-500" />
          <strong>Module :</strong> {document.module?.nomMod || "N/A"}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 mt-6">
        {document.type === "video" ? (
          <a
            href={document.path}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-dark text-white px-4 py-2 rounded-lg hover:bg-primary transition flex items-center justify-center space-x-2"
          >
            <FaVideo />
            <span>Voir la vidéo</span>
          </a>
        ) : (
          <a
            href={document.path}
            target="_blank"
            download
            className="bg-primary-dark text-white px-4 py-2 rounded-lg hover:bg-primary transition flex items-center justify-center space-x-2"
          >
            <FaDownload />
            <span>Télécharger le document</span>
          </a>
        )}

        <button
          onClick={handleLike}
          className={`px-4 py-2 rounded-lg transition flex items-center justify-center space-x-2 ${
            isLiked
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
          disabled={isLoadingLike}
        >
          {isLoadingLike ? (
            <HashLoader size={20} color="#FFFFFF" />
          ) : (
            <>
              <FaHeart />
              <span>{isLiked ? "Je n'aime plus" : "J'aime"}</span>
            </>
          )}
          <span className="text-md  text-primary-dark px-2 py-1 rounded-md font-bold ml-2">
            {likesCount }
          </span>
        </button>

        <button
            onClick={toggleFavorite}
            className={`px-4 py-2 rounded-lg flex items-center justify-center space-x-2 ${
            isFavorite ? "bg-yellow-500 text-white" : "bg-gray-300 text-gray-700"
            }`}
        >
            {
                isLoadingFav ? <HashLoader size={20} color="#FFFFFF" />
                 : (
                    <>
                        <FaStar />
                        <span>{isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}</span>
                    </>
                 )
            }

        </button>
      </div>

    </motion.div>
  );
}

export default DocInfos;
