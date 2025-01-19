import React from "react";
import { Outlet } from "react-router-dom";
import SideBare from "../components/SideBare";
import { useNavigate } from "react-router-dom";

function AdminLayout() {
    const navigate = useNavigate();
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideBare />
      {/* Contenu principal */}
      <div className="flex-grow flex flex-col">
        {/* Navbar Top */}
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl">Tableau de Bord Admin</h1>
          <nav className="flex items-center space-x-4">
            <button
              onClick={() =>   navigate("/admin/profile")}
              className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-700"
            >
              Profil
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700"
            >
              Déconnexion
            </button>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow p-6">
          <Outlet />
        </main>
        <footer className="bg-gray-800 text-white text-center p-4">
          &copy; 2025 ISGIDocs
        </footer>
      </div>
    </div>
  );
}

export default AdminLayout;
