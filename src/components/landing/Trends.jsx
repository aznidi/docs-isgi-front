import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { axiosClient } from "../../api/axios"; // Client pour gérer les requêtes API
import Slider from "react-slick"; // Bibliothèque pour le slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaThumbsUp, FaArrowRight } from "react-icons/fa";
import { HashLoader } from "react-spinners"; // Loader
import { useNavigate } from "react-router-dom";
import DocumentCard from "../singleModule/DocumentCard";

function Trends() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Récupérer les données des documents
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axiosClient.get(
          "/api/public/statistics/top-liked-documents"
        );
        setDocuments(response.data.topLikedDocuments);
      } catch (error) {
        console.error("Erreur lors de la récupération des documents :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  // Configuration du slider
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader size={50} color="#4A90E2" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-6">
      {/* Titre et introduction */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl lg:text-4xl font-extrabold text-primary-dark mb-4 flex items-center justify-center gap-2">
         Documents Les Plus Aimés
        </h2>
        <p className="text-gray-700 text-lg">
          Découvrez les documents les plus appréciés par notre communauté cette
          semaine. Enrichissez vos connaissances dès aujourd'hui !
        </p>
      </motion.div>

      {/* Slider */}
      <Slider
        {...sliderSettings}
        className="gap-6" // Ajouter un espace entre les cartes
      >
        {documents.map((doc) => (
          <div key={doc.id} className="px-4">
            <DocumentCard document={doc} />
          </div>
        ))}
      </Slider>

      {/* Bouton voir plus */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/documents")}
          className="flex items-center gap-2 px-6 py-3 bg-primary-dark text-white rounded-full shadow-lg hover:bg-primary focus:outline-none transition-all"
        >
          Voir Tous les Documents
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Trends;
