import React from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import about from "../../assets/about.svg";

function About() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center gap-12">
      {/* Image de gauche */}
      <motion.div
        className="lg:w-1/2 hidden lg:block" // Cacher sur mobile, visible à partir de lg
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src={about}
          alt="Logo ISGIDocs"
          className="w-full max-w-sm mx-auto lg:max-w-lg"
        />
      </motion.div>

      {/* Contenu de droite */}
      <motion.div
        className="lg:w-1/2 text-center lg:text-left"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Titre principal */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-dark mb-6">
          <span className="flex items-center justify-center lg:justify-start gap-3">
            C'est quoi <span className="text-secondary underline">ISGIDocs</span> ?
          </span>
        </h2>

        {/* Description */}
        <p className="text-gray-700 text-lg mb-6 leading-relaxed font-medium">
          ISGIDocs est une plateforme révolutionnaire qui centralise toutes vos
          ressources éducatives. Que vous soyez étudiant, formateur ou professionnel,
          accédez à des modules, documents, examens et bien plus encore en un seul endroit.
        </p>
        <p className="text-gray-600 text-md mb-6 leading-relaxed font-light">
          Notre objectif est de simplifier l'apprentissage, promouvoir
          l'auto-formation et encourager une collaboration éducative au sein de la communauté.
        </p>

        {/* Bouton d'action */}
        <button
          onClick={() => navigate("/documents")}
          className="flex items-center gap-2 px-6 py-3 bg-primary-dark text-white rounded-full shadow-lg hover:bg-primary transition-all focus:outline-none"
        >
          Explorer Maintenant
          <FaArrowRight />
        </button>

        {/* Lien vers Founders */}
        <p
          className="mt-4 ml-5 text-sm text-secondary underline cursor-pointer hover:text-secondary-dark"
          onClick={() => navigate("/founders")}
        >
          Découvrez nos Founders
        </p>
      </motion.div>

    </div>
  );
}

export default About;
