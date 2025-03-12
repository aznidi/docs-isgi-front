import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaBookOpen } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns"; // Utilisation de date-fns pour formater les dates
import { fr } from 'date-fns/locale';

function ModuleInfos({ module }) {
  // Formater la date de création
  const createdDate = formatDistanceToNow(new Date(module.created_at), { addSuffix: true, locale: fr });

  return (
    <motion.div
      className="bg-white rounded-md shadow-sm p-8 mb-8 flex flex-col lg:flex-row gap-8 items-center lg:items-start"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Image du module */}
      <div className="w-full lg:w-1/3 h-96 flex items-center justify-center overflow-hidden">
        {module.imageMod ? (
          <img
            src={module.imageMod}
            alt={module.nomMod}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-sm">
            Aucune image disponible
          </div>
        )}
      </div>

      {/* Contenu des informations */}
      <div className="flex-1 space-y-6">
        {/* Titre et description */}
        <div>
          <h2 className="text-4xl font-extrabold text-primary-dark mb-2">
            {module.nomMod}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {module.descriptionMod ||
              "Description non disponible pour ce module."}
          </p>
        </div>

        {/* Détails supplémentaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Année */}
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg shadow-sm">
            <FaCalendarAlt className="text-primary text-2xl" />
            <div>
              <h4 className="text-gray-700 font-bold text-sm">Année</h4>
              <p className="text-gray-600 text-base">{module.anneeMod}</p>
            </div>
          </div>

          {/* Code du module */}
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg shadow-sm">
            <FaBookOpen className="text-primary text-2xl" />
            <div>
              <h4 className="text-gray-700 font-bold text-sm">Code</h4>
              <p className="text-gray-600 text-base">{module.codeMod}</p>
            </div>
          </div>

          {/* Date de création */}
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg shadow-sm">
            <FaCalendarAlt className="text-primary text-2xl" />
            <div>
              <h4 className="text-gray-700 font-bold text-sm">Date de création</h4>
              <p className="text-gray-600 text-base">{createdDate}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ModuleInfos;
