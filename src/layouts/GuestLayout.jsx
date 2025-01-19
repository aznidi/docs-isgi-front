import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import { HOME_ROUTE } from "../router";

function GuestLayout() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(HOME_ROUTE); // Redirige si l'utilisateur est connecté
    }
  }, [isLoggedIn, navigate]);

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

export default GuestLayout;
