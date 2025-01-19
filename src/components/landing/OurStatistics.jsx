import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { axiosClient } from "../../api/axios";
import { motion } from "framer-motion";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import {
  FaBook,
  FaUsers,
  FaHeart,
  FaComments,
  FaDownload,
  FaFileAlt,
  FaFlag,
  FaArrowRight,
} from "react-icons/fa";

// Configuration du slider
const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function OurStatistics() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axiosClient.get("/api/public/statistics/general");
        setStatistics(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader size={50} color="#4A90E2" />
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="text-center text-gray-500 py-20">
        <p>Impossible de charger les statistiques pour le moment.</p>
      </div>
    );
  }

  const statsData = [
    {
      label: "Modules",
      value: statistics.modulesCount,
      description: "Apprenez avec nos modules bien adaptés à votre progression.",
      icon: FaBook,
      color: "text-indigo-600",
    },
    {
      label: "Documents",
      value: statistics.documentsCount,
      description: "Explorez une vaste collection de documents éducatifs.",
      icon: FaFileAlt,
      color: "text-lime-600",
    },
    {
      label: "Utilisateurs",
      value: statistics.usersCount,
      description: "Notre communauté continue de grandir chaque jour.",
      icon: FaUsers,
      color: "text-cyan-600",
    },
    {
      label: "Favoris",
      value: statistics.favoritesCount,
      description: "Vos documents préférés à portée de clic.",
      icon: FaHeart,
      color: "text-rose-600",
    },
    {
      label: "Commentaires",
      value: statistics.commentsCount,
      description: "Partagez vos idées et apprenez des autres.",
      icon: FaComments,
      color: "text-purple-600",
    },
    {
      label: "Signalements",
      value: statistics.reportsCount,
      description: "Aidez-nous à maintenir un contenu de qualité.",
      icon: FaFlag,
      color: "text-orange-500",
    },
    {
      label: "Téléchargements",
      value: statistics.totalDownloads,
      description: "Des documents toujours accessibles en local.",
      icon: FaDownload,
      color: "text-teal-500",
    },
    {
      label: "J'aime",
      value: statistics.totalLikes,
      description: "Exprimez votre appréciation pour nos contenus.",
      icon: FaHeart,
      color: "text-pink-600",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Titre et introduction */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl lg:text-4xl font-extrabold text-primary-dark mb-4 flex items-center justify-center gap-2">
          Aperçu des Statistiques
        </h2>
        <p className="text-gray-700 text-lg">
          Explorez les tendances et les chiffres clés de notre plateforme. Découvrez ce qui capte l'attention de notre
          communauté !
        </p>
      </motion.div>

      {/* Slider des statistiques */}
      <Slider {...sliderSettings}>
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            className="p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <div className="bg-white shadow-md rounded-md p-6 flex flex-col items-center space-y-4 hover:shadow-xl transition-shadow">
              <div className={`text-5xl ${stat.color}`}>
                <stat.icon />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-lg text-gray-500 font-semibold">{stat.label}</p>
              <p className="text-sm text-gray-600 text-center">{stat.description}</p>
            </div>
          </motion.div>
        ))}
      </Slider>
      {/* Bouton voir plus */}
        <div className="flex justify-center mt-10">
            <button
            onClick={() => navigate("/documents")}
            className="flex items-center gap-2 px-6 py-3 bg-primary-dark text-white rounded-full shadow-lg hover:bg-primary focus:outline-none transition-all"
            >
                Commencez maintenant !
            <FaArrowRight />
            </button>
        </div>
    </div>
  );
}

export default OurStatistics;
