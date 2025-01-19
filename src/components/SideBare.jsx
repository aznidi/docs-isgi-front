import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBook,
  FaFolder,
  FaChartBar,
  FaBell,
} from "react-icons/fa";
import { motion } from "framer-motion";

function SideBare() {
  const [isOpen, setIsOpen] = useState(true);
    const {logout} = useContext(AuthContext); // Consommer le contexte
    const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Animation settings for Framer Motion
  const sidebarVariants = {
    open: {
      width: "16rem",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    closed: {
      width: "4rem",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };


  // Gérer la déconnexion
     const handleLogout = async () => {
      Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Vous allez être déconnecté.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, déconnectez-moi",
        cancelButtonText: "Annuler",
        customClass: {
          confirmButton: "bg-red-600 text-white px-4 py-2 rounded",
          cancelButton: "bg-gray-300 text-gray-700 px-4 py-2 rounded",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          await logout(); // Appeler la fonction du contexte
          Swal.fire("Déconnexion réussie !", "Vous êtes déconnecté.", "success");
          navigate("/login");
        }
      });
    };
  return (
    <motion.div
      variants={sidebarVariants}
      initial={isOpen ? "open" : "closed"}
      animate={isOpen ? "open" : "closed"}
      className="bg-gray-800 text-white h-screen flex flex-col shadow-lg min-h-screen"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && <h2 className="text-xl font-bold">ISGIDocs</h2>}
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none text-xl"
        >
          {isOpen ? "❮" : "❯"}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow">
        <ul className="space-y-2 p-4">
          <SidebarLink
            to="/admin/dashboard"
            icon={FaHome}
            label="Tableau de Bord"
            isOpen={isOpen}
          />
          <SidebarLink
            to="/admin/modules"
            icon={FaFolder}
            label="Gestion des Modules"
            isOpen={isOpen}
          />
          <SidebarLink
            to="/admin/documents"
            icon={FaBook}
            label="Gestion des Documents"
            isOpen={isOpen}
          />

            <SidebarLink
                to="/admin/exercises"
                icon={FaBook}
                label="Gestion des Exercices"
                isOpen={isOpen}
            />
          <SidebarLink
            to="/admin/users"
            icon={FaUser}
            label="Gestion des Utilisateurs"
            isOpen={isOpen}
          />
          <SidebarLink
            to="/admin/notifications"
            icon={FaBell}
            label="Notifications"
            isOpen={isOpen}
          />
          <SidebarLink
            to="/admin/statistics"
            icon={FaChartBar}
            label="Statistiques"
            isOpen={isOpen}
          />
          <SidebarLink
            to="/admin/settings"
            icon={FaCog}
            label="Paramètres"
            isOpen={isOpen}
          />
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="flex items-center text-white p-2 hover:bg-gray-700 rounded w-full"
        >
          <FaSignOutAlt className="mr-3" />
          {isOpen && <span>Déconnexion</span>}
        </button>
      </div>
    </motion.div>
  );
}

// Component for each sidebar link
const SidebarLink = ({ to, icon: Icon, label, isOpen }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "bg-gray-700 text-blue-400 flex items-center p-2 rounded"
          : "flex items-center p-2 hover:bg-gray-700 rounded"
      }
    >
      <Icon className="text-lg" />
      {isOpen && <span className="ml-3">{label}</span>}
    </NavLink>
  </li>
);

export default SideBare;
