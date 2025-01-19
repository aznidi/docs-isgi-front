import React from "react";
import { motion } from "framer-motion";
import {
  FaBook,
  FaFilePdf,
  FaChalkboardTeacher,
  FaVideo,
  FaTasks,
  FaClipboardList,
} from "react-icons/fa";

const features = [
  {
    title: "Cours Organisés",
    description:
      "Accédez facilement à des cours bien structurés pour chaque module et chaque domaine.",
    icon: <FaBook />,
    link: "Explorer les cours",
  },
  {
    title: "Supports PDF",
    description:
      "Téléchargez et lisez des supports PDF pour approfondir vos connaissances à tout moment.",
    icon: <FaFilePdf />,
    link: "Voir les PDF",
  },
  {
    title: "Vidéos Éducatives",
    description:
      "Regardez des vidéos éducatives pour une compréhension plus interactive des concepts.",
    icon: <FaVideo />,
    link: "Regarder les vidéos",
  },
  {
    title: "Travaux Pratiques",
    description:
      "Mettez en pratique vos connaissances avec des travaux pratiques spécialement conçus.",
    icon: <FaTasks />,
    link: "Faire les TP",
  },
  {
    title: "Examens et Contrôles",
    description:
      "Préparez-vous avec des contrôles et des examens de fin de module.",
    icon: <FaClipboardList />,
    link: "Passer un examen",
  },
  {
    title: "Sessions en Classe",
    description:
      "Participez à des sessions en classe pour poser vos questions et interagir avec vos professeurs.",
    icon: <FaChalkboardTeacher />,
    link: "Participer à une session",
  },
];

function Features() {
  return (
    <div className=" py-12 px-6">
      <div className="text-center mb-12">
        <motion.h2
          className="text-3xl font-bold text-primary-dark"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Fonctionnalités d'ISGI Docs
        </motion.h2>
        <motion.p
          className="text-gray-600 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Simplifiez votre apprentissage avec nos outils éducatifs avancés.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
          >
            <div className="text-primary text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <a
              href="#"
              className="text-primary-dark hover:text-primary font-medium transition"
            >
              {feature.link}
              <motion.span
                whileHover={{ x: 2 }}
                className="inline-block"
                transition={{ type: "spring", stiffness: 200 }}
                    >
                →
                </motion.span>

            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Features;
