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
import { BiSupport } from "react-icons/bi";
import { motion } from "framer-motion";

function SideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useContext(AuthContext); // Consommer le contexte
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

  const iconVariants = {
    open: {
      rotate: 0,
      transition: { duration: 0.3 },
    },
    closed: {
      rotate: 180,
      transition: { duration: 0.3 },
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
    <div className="flex h-screen">
      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial={isOpen ? "open" : "closed"}
        animate={isOpen ? "open" : "closed"}
        className="bg-gray-800 text-white flex flex-col shadow-lg h-full"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {isOpen && (
            <h2 className="text-xl font-bold text-white">
              <span className="text-blue-400">ISGI</span>Docs
            </h2>
          )}
          <motion.button
            onClick={toggleSidebar}
            className="text-white focus:outline-none text-xl"
            variants={iconVariants}
          >
            {isOpen ? "❮" : "❯"}
          </motion.button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow mt-4">
          <ul className="space-y-3 px-4">
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
              to="/admin/users"
              icon={FaUser}
              label="Gestion des Utilisateurs"
              isOpen={isOpen}
            />
            <SidebarLink
              to="/admin/statistics"
              icon={FaChartBar}
              label="Statistiques"
              isOpen={isOpen}
            />
            <SidebarLink
              to="/admin/support"
              icon={BiSupport}
              label="Support"
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
          <motion.button
            onClick={handleLogout}
            className="flex items-center text-white w-full bg-red-600 hover:bg-red-700 p-3 rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            <FaSignOutAlt className="mr-3" />
            {isOpen && <span>Déconnexion</span>}
          </motion.button>
        </div>
      </motion.div>

    </div>
  );
}

// Component for each sidebar link
const SidebarLink = ({ to, icon: Icon, label, isOpen }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "bg-blue-500 text-white flex items-center p-3 rounded-lg"
          : "flex items-center p-3 hover:bg-gray-700 rounded-lg"
      }
    >
      <Icon className="text-lg" />
      {isOpen && <span className="ml-3">{label}</span>}
    </NavLink>
  </li>
);

export default SideBar;
