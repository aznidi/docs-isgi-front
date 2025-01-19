import React from "react";
import { motion } from "framer-motion";
import { FaVideo, FaArrowRight, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function DocumentCard({ document }) {
  const navigate = useNavigate();

  // Transformer le nom avec des espaces à la place des underscores
  const formattedNomDoc = document.nomDoc.replace(/_/g, " ");

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
      whileHover={{ y: -5 }}
    >
      {/* Image du module */}
      {document.module?.imageMod && (
        <div className="h-48 bg-gray-100 flex justify-center items-center">
          <img
            src={`http://localhost:8000/storage/${document.module.imageMod}`}
            alt={document.module.nomMod}
            className="h-full w-auto object-contain"
          />
        </div>
      )}

      {/* Contenu de la carte */}
      <div className="p-6 space-y-4">
        {/* Libellé (Titre principal) */}
        <h3 className="text-2xl font-semibold text-primary-dark">{document.libelleDoc} ({document.module.nomMod})</h3>

        {/* Nom formaté (sous-titre) */}
        <p className="text-gray-600 text-sm italic">{formattedNomDoc}</p>

        {/* Description */}
        <p className="text-gray-700 text-base leading-relaxed">{document.descriptionDoc}</p>

        {/* Bouton d'action */}
        <div className="mt-4">

            <button
              className="w-full bg-primary-dark text-white text-center py-2 rounded-lg hover:bg-primary transition flex items-center justify-center space-x-2"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.location.href = `/documents/${document.id}`;

                }}
            >
              <span>Voir les détails</span>
              <FaArrowRight />
            </button>
        </div>
      </div>
    </motion.div>
  );
}

export default DocumentCard;
