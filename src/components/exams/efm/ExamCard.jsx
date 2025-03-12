import React from "react";
import { FaArrowRight, FaBook, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

function ExamCard({ exam }) {
  const publicationTime = exam.created_at
    ? formatDistanceToNow(new Date(exam.created_at), {
        addSuffix: true,
        locale: fr,
      })
    : "Date inconnue";

  return (
    <motion.div
      className="p-4 border rounded-lg shadow-lg hover:shadow-xl bg-white flex flex-col justify-between w-full sm:w-80 md:w-96 lg:w-72 h-auto"
      whileHover={{ x: 2 }}
    >
      {/* Top Section - Image */}
      <div className="mb-4">
        {exam.image_path ? (
          <img
            src={`http://localhost:8000/storage/${exam.image_path}`}
            alt={exam.title || "Image indisponible"}
            className="w-full h-40 object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-40 flex items-center justify-center bg-gray-200 rounded-lg">
            <p className="text-gray-500 italic">Image non disponible</p>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-grow space-y-3">
        <h2 className="text-lg md:text-xl font-bold text-primary">
          {exam.title || "Titre non disponible"}
        </h2>
        {exam.module?.nomMod && (
          <p className="flex items-center gap-2 text-sm text-gray-600">
            <FaBook className="text-primary" />
            {exam.module.nomMod}
          </p>
        )}
        {exam.duration && (
          <p className="flex items-center gap-2 text-sm text-gray-600">
            <FaClock className="text-primary" />
            {exam.duration} minutes
          </p>
        )}
        <p className="text-gray-500 italic text-sm">
          Publié {publicationTime}
        </p>
      </div>

      {/* Button Section */}
      <motion.a
        href={exam.path ? `http://localhost:8000/storage/${exam.path}` : "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-4 flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg font-semibold text-sm transition ${
          exam.path
            ? "bg-primary-dark hover:bg-primary"
            : "bg-gray-300 cursor-not-allowed"
        }`}
        whileHover={exam.path ? { x: 2 } : {}}
      >
        {exam.path ? "Accéder à l'examen" : "Lien non disponible"}
        <FaArrowRight />
      </motion.a>
    </motion.div>
  );
}

export default ExamCard;
