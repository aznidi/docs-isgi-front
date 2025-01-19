import React, { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import { HashLoader } from "react-spinners";
import { motion } from "framer-motion";
import DocumentCard from "../singleModule/DocumentCard"; // Assurez-vous que le composant est correctement importé
import Slider from "react-slick";
import { FaDownload, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Configuration du slider
const sliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024, // Pour les tablettes
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768, // Pour les mobiles
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function MustDownloadedDocs() {
  const [topDocuments, setTopDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopDownloadedDocuments = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get("/api/public/statistics/top-downloaded-documents");
        setTopDocuments(response.data.topDownloadedDocuments);
      } catch (error) {
        console.error("Erreur lors de la récupération des documents les plus téléchargés :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopDownloadedDocuments();
  }, []);

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
          Documents Les Plus Téléchargés
        </h2>
        <p className="text-gray-700 text-lg">
          Découvrez les documents les plus téléchargés par notre communauté cette
          semaine. Enrichissez vos connaissances dès aujourd'hui !
        </p>
      </motion.div>

      {topDocuments.length === 0 ? (
        <motion.p
          className="text-gray-500 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Aucun document téléchargé récemment.
        </motion.p>
      ) : (
        <Slider {...sliderSettings}>
          {topDocuments.map((doc) => (
            <motion.div
              key={doc.id}
              className="p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <DocumentCard document={doc} />
            </motion.div>
          ))}
        </Slider>
      )}

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

export default MustDownloadedDocs;
