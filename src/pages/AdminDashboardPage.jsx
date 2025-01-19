import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { FaUsers, FaFileAlt, FaChartLine, FaStar, FaFileDownload } from "react-icons/fa";

ChartJS.register(
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);

function AdminDashboardPage() {
  // Données statiques enrichies
  const modules = [
    { id: 1, name: "React", nbDocuments: 12, downloads: 500 },
    { id: 2, name: "Node.js", nbDocuments: 8, downloads: 300 },
    { id: 3, name: "Laravel", nbDocuments: 15, downloads: 700 },
    { id: 4, name: "Python", nbDocuments: 10, downloads: 450 },
  ];

  const recentUsers = [
    { id: 1, name: "Alice Dupont", role: "Étudiant" },
    { id: 2, name: "John Doe", role: "Enseignant" },
    { id: 3, name: "Marie Curie", role: "Étudiant" },
  ];

  const barChartData = {
    labels: modules.map((module) => module.name),
    datasets: [
      {
        label: "Documents téléchargés",
        data: modules.map((module) => module.downloads),
        backgroundColor: ["#4A90E2", "#36A2EB", "#FFCE56", "#FF6384"],
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Cours", "TP", "Examens", "EFM"],
    datasets: [
      {
        data: [50, 30, 15, 5],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverOffset: 4,
      },
    ],
  };

  const lineChartData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep"],
    datasets: [
      {
        label: "Téléchargements Mensuels",
        data: [100, 200, 150, 300, 250, 400, 350, 500, 450],
        borderColor: "#4A90E2",
        backgroundColor: "rgba(74, 144, 226, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Tableau de Bord Admin</h2>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <FaUsers className="text-blue-500 text-4xl mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800">1,200+</h3>
          <p className="text-gray-600">Utilisateurs</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <FaFileAlt className="text-green-500 text-4xl mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800">5,000+</h3>
          <p className="text-gray-600">Documents</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <FaFileDownload className="text-red-500 text-4xl mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800">25,000+</h3>
          <p className="text-gray-600">Téléchargements</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <FaStar className="text-yellow-500 text-4xl mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800">30+</h3>
          <p className="text-gray-600">Modules</p>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Documents Téléchargés par Module</h3>
          <Bar data={barChartData} />
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Répartition des Types de Documents</h3>
          <Doughnut data={doughnutChartData} />
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <h3 className="text-xl font-bold mb-4">Téléchargements Mensuels</h3>
        <Line data={lineChartData} />
      </div>

      {/* Liste des utilisateurs récents */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <h3 className="text-xl font-bold mb-4">Utilisateurs Récents</h3>
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-6 py-3">Nom</th>
              <th className="px-6 py-3">Rôle</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
