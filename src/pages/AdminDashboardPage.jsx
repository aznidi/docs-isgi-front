import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  Tooltip,
  PointElement,
} from "chart.js";

// Import des icônes et images
import users from '../assets/images/equipe.png';
import documents from '../assets/images/document.png';
import telecharger from '../assets/images/telecharger.png';
import favoris from '../assets/images/ajouter-aux-favoris.png';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import { axiosClient } from "../api/axios";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  Tooltip,
  PointElement
);

function AdminDashboardPage() {
  const [statistics, setStatistics] = useState(null); // Statistiques générales
  const [topModules, setTopModules] = useState([]); // Modules populaires
  const [topDownloads, setTopDownloads] = useState([]); // Documents téléchargés
  const [loading, setLoading] = useState(true); // Loader

  // Charger les données des statistiques
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const generalStats = await axiosClient.get("/api/public/statistics/general");
        const modules = await axiosClient.get("/api/public/statistics/top-downloaded-documents");
        const downloads = await axiosClient.get("/api/public/statistics/top-liked-documents");

        setStatistics(generalStats.data);
        setTopModules(modules.data.topDownloadedDocuments);
        setTopDownloads(downloads.data.topLikedDocuments);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const barChartData = {
    labels: topModules.map((module) => module.name || "N/A"),
    datasets: [
      {
        label: "Documents téléchargés",
        data: topModules.map((module) => module.nbTelechargements || 0),
        backgroundColor: "#2563EB", // Couleur principale
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep"],
    datasets: [
      {
        label: "Téléchargements Mensuels",
        data: [100, 200, 150, 300, 250, 400, 350, 500, 450],
        borderColor: "#1E40AF", // Couleur secondaire sombre
        backgroundColor: "rgba(37, 99, 235, 0.2)", // Couleur secondaire claire
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const cardAnimation = {
    whileHover: { y: -2 },
  };

  return (
    <div className="container mx-auto p-6">
      {/* Titre principal */}
      <h2 className="text-3xl lg:text-4xl font-extrabold mb-6 text-center text-primary-dark">
        Tableau de Bord Admin
      </h2>

      {/* Skeleton ou Statistiques principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {loading ? (
          Array(4)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 text-center"
              >
                <Skeleton circle={true} height={50} width={50} className="mb-4 mx-auto" />
                <Skeleton height={20} width="50%" className="mx-auto" />
                <Skeleton height={15} width="70%" className="mx-auto mt-2" />
              </div>
            ))
        ) : (
          <>
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg rounded-lg p-6 text-center"
              {...cardAnimation}
            >
              <img src={users} className="w-16 h-16" />
              <h3 className="text-2xl font-bold">
                {statistics?.usersCount || 0}
              </h3>
              <p>Utilisateurs</p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-r from-green-500 to-green-400 text-white shadow-lg rounded-lg p-6 text-center"
              {...cardAnimation}
            >
              <img src={documents} className="w-16 h-16" />
              <h3 className="text-2xl font-bold">
                {statistics?.documentsCount || 0}
              </h3>
              <p>Documents</p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-r from-red-500 to-red-400 text-white shadow-lg rounded-lg p-6 text-center"
              {...cardAnimation}
            >
              <img src={telecharger} className="w-16 h-16" />
              <h3 className="text-2xl font-bold">
                {statistics?.totalDownloads || 0}
              </h3>
              <p>Téléchargements</p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white shadow-lg rounded-lg p-6 text-center"
              {...cardAnimation}
            >
              <img src={favoris} className="w-16 h-16" />
              <h3 className="text-2xl font-bold">
                {statistics?.favoritesCount || 0}
              </h3>
              <p>Favoris</p>
            </motion.div>
          </>
        )}
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6"
          {...cardAnimation}
        >
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Modules Populaires
          </h3>
          {loading ? (
            <Skeleton height={250} />
          ) : (
            <Bar data={barChartData} />
          )}
        </motion.div>

        {/* Line Chart */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6"
          {...cardAnimation}
        >
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Téléchargements Mensuels
          </h3>
          {loading ? (
            <Skeleton height={250} />
          ) : (
            <Line data={lineChartData} />
          )}
        </motion.div>
      </div>

      {/* Documents populaires */}
      <motion.div
        className="bg-white shadow-lg rounded-lg p-6 mt-6"
        {...cardAnimation}
      >
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          Documents Les Plus Aimés
        </h3>
        {loading ? (
          <Skeleton count={3} height={50} className="mb-4" />
        ) : (
          <ul className="space-y-4">
            {topDownloads.map((doc) => (
              <li
                key={doc.id}
                className="flex justify-between items-center p-4 border-b"
              >
                <span className="text-gray-700">{doc.nomDoc || "Document"}</span>
                <span className="text-blue-500 font-bold">{doc.likes} Likes</span>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}

export default AdminDashboardPage;
