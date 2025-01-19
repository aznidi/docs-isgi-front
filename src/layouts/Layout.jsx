import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";

function Layout() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar isLoggedIn={isLoggedIn} />

      {/* Contenu principal */}
      <main className="flex-grow pt-4 sm:pt-8 lg:pt-12 px-4 sm:px-6 lg:px-8 container mx-auto">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;
