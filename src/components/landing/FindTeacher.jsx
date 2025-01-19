import React from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import findTeacherImage from "../../assets/find-teacher.svg";

function FindTeacher() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center gap-12">
      {/* Image de droite (cachée sur mobile) */}
      <motion.div
        className="lg:w-1/2 hidden lg:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src={findTeacherImage}
          alt="Trouver un formateur"
          className="w-full max-w-sm mx-auto lg:max-w-lg"
        />
      </motion.div>

      {/* Contenu de gauche */}
      <motion.div
        className="lg:w-1/2 text-center lg:text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Titre principal */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-dark mb-6">
          <span className="flex items-center justify-center lg:justify-start gap-3">
            Trouvez Votre <span className="text-secondary underline">Formateur</span>
          </span>
        </h2>

        {/* Description */}
        <p className="text-gray-700 text-lg mb-6 leading-relaxed font-medium">
          Vous êtes perdus ? Trouvez un formateur qualifié pour un module spécifique
          afin d'obtenir un accompagnement personnalisé et enrichir vos compétences.
        </p>
        <p className="text-gray-600 text-md mb-6 leading-relaxed font-light">
          Grâce à notre plateforme, connectez-vous à des formateurs expérimentés
          et apprenez de manière efficace avec des ressources adaptées à vos besoins.
        </p>

        {/* Bouton d'action */}
        <button
          onClick={() => navigate("/pricing")}
          className="flex items-center gap-2 px-6 py-3 bg-primary-dark text-white rounded-full shadow-lg hover:bg-primary transition-all focus:outline-none"
        >
          Trouver un Formateur
          <FaArrowRight />
        </button>

        {/* Lien vers le support */}
        <p
          className="mt-4 ml-5 text-sm text-secondary underline cursor-pointer hover:text-secondary-dark"
          onClick={() => navigate("/contact-support")}
        >
          Contactez le Support pour plus d'informations
        </p>
      </motion.div>
    </div>
  );
}

export default FindTeacher;
