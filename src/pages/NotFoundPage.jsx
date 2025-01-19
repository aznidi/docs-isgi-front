import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NotFoundSVG from "../assets/not-found.svg";
import { FaArrowRight } from "react-icons/fa";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      {/* Conteneur pour centrer tout le contenu */}
      <div className="flex flex-col items-center justify-center">
        {/* Animation de l'image */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <img
            src={NotFoundSVG}
            alt="404 Not Found"
            className="w-3/4 md:w-1/2 lg:w-1/3 mx-auto"
          />
        </motion.div>

        {/* Texte principal */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-primary-dark mt-4 mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Oups ! Page introuvable
        </motion.h1>
        <p className="text-neutral-dark text-lg md:text-xl mb-8">
          Désolé, la page que vous cherchez n'existe pas ou a été déplacée.
        </p>

        {/* Bouton pour revenir à l'accueil */}
        <motion.button
          className="bg-primary hover:bg-primary-light text-white py-3 px-6 rounded-lg shadow-lg flex items-center gap-2 text-lg"
          onClick={() => navigate("/")}
        >
          <span>Retour à l'accueil</span>
          <motion.span
            initial={{ x: 0 }}
            animate={{ x: [0, 10, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="inline-block"
          >
            <FaArrowRight />
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
}

export default NotFoundPage;
