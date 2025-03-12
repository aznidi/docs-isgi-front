import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { axiosClient } from "../../api/axios";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

// Import des icônes et images
import users from '../../assets/images/equipe.png';
import documents from '../../assets/images/document.png';
import video from '../../assets/images/video.png';
import avis from '../../assets/images/commentaires-des-utilisateurs.png';
import erreur from '../../assets/images/message-derreur.png';
import like from '../../assets/images/pouces-vers-le-haut.png';
import telecharger from '../../assets/images/telecharger.png';
import favoris from '../../assets/images/ajouter-aux-favoris.png';
import { FaArrowRight } from "react-icons/fa";

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

/**
 * Composant OurStatistics
 * Affiche les statistiques de la plateforme sous forme de slider.
 */
function OurStatistics() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Effet pour charger les statistiques au montage du composant
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

  // Skeleton loader pour les cartes de statistiques
  const renderSkeletons = () => (
    <Slider {...sliderSettings}>
      {Array(6)
        .fill()
        .map((_, index) => (
          <motion.div
            key={index}
            className="p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <div className="bg-white shadow-md rounded-md p-6 flex flex-col items-center space-y-4">
              <Skeleton circle={true} height={64} width={64} />
              <Skeleton height={30} width="40%" />
              <Skeleton height={20} width="60%" />
              <Skeleton height={15} width="80%" />
            </div>
          </motion.div>
        ))}
    </Slider>
  );

  // Données des statistiques à afficher
  const statsData = statistics
    ? [
        {
          label: "Modules",
          value: statistics.modulesCount,
          description: "Apprenez à votre rythme.",
          icon: video,
          color: "text-indigo-600",
        },
        {
          label: "Documents",
          value: statistics.documentsCount,
          description: "Explorez une vaste collection de documents éducatifs.",
          icon: documents,
          color: "text-lime-600",
        },
        {
          label: "Utilisateurs",
          value: statistics.usersCount,
          description: "Notre communauté continue de grandir chaque jour.",
          icon: users,
          color: "text-cyan-600",
        },
        {
          label: "Favoris",
          value: statistics.favoritesCount,
          description: "Vos documents préférés à portée de clic.",
          icon: favoris,
          color: "text-rose-600",
        },
        {
          label: "Commentaires",
          value: statistics.commentsCount,
          description: "Partagez vos idées et apprenez des autres.",
          icon: avis,
          color: "text-purple-600",
        },
        {
          label: "Signalements",
          value: statistics.reportsCount,
          description: "Aidez-nous à maintenir un contenu de qualité.",
          icon: erreur,
          color: "text-orange-500",
        },
        {
          label: "Téléchargements",
          value: statistics.totalDownloads,
          description: "Des documents toujours accessibles en local.",
          icon: telecharger,
          color: "text-teal-500",
        },
        {
          label: "J'aime",
          value: statistics.totalLikes,
          description: "Exprimez votre appréciation pour nos contenus.",
          icon: like,
          color: "text-pink-600",
        },
      ]
    : [];

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

      {/* Slider des statistiques ou Skeletons */}
      {loading ? (
        renderSkeletons()
      ) : (
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
                  <img src={stat.icon} alt={stat.label} className="w-16 h-16" />
                </div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-lg text-gray-500 font-semibold">{stat.label}</p>
                <p className="text-sm text-gray-600 text-center">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </Slider>
      )}

      {/* Bouton pour naviguer vers la page des documents */}
      <div className="flex justify-center mt-10">
        <motion.button
          onClick={() => navigate("/documents")}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.1, delay: 0.05 }}
          className="flex items-center gap-2 px-6 py-3 bg-primary-dark text-white rounded-full shadow-lg hover:bg-primary focus:outline-none transition-all"
        >
          Commencez maintenant !
          <FaArrowRight />
        </motion.button>
      </div>
    </div>
  );
}

export default OurStatistics;
