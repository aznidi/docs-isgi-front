import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaCalendarAlt, FaGraduationCap, FaLayerGroup } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ExerciceCard({ exercise }) {
    const navigate = useNavigate();
    return (
        <motion.div
        className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        whileHover={{ scale: 1.01 }}
        >
        {/* Image */}
        <img
            src={`http://localhost:8000/storage/${exercise.image_path}`}
            alt={exercise.title}
            className="w-full h-48 object-cover"
        />

        {/* Contenu */}
        <div className="p-4 flex flex-col flex-grow">
            {/* Titre */}
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FaLayerGroup className="text-blue-500" /> {exercise.title}
            </h3>

            {/* Module et Année */}
            <div className="text-gray-600 text-sm mb-3 flex items-center gap-2">
            <FaGraduationCap className="text-green-500" />
            Module : <span className="font-medium">{exercise.module.nomMod}</span>
            </div>
            <div className="text-gray-600 text-sm mb-3 flex items-center gap-2">
            <FaCalendarAlt className="text-yellow-500" />
            Année : <span className="font-medium">{exercise.module.anneeMod}</span>
            </div>

            {/* Niveau */}
            <p
            className={`text-sm font-medium mb-4 flex items-center gap-2 ${
                exercise.level === "facile"
                ? "text-green-500"
                : exercise.level === "intermédiaire"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
            >
            <FaGraduationCap />
            Niveau : {exercise.level}
            </p>

            {/* Bouton "Voir détails" */}
            <motion.button
            className="mt-auto py-2 px-4 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 text-sm font-semibold hover:bg-blue-700 focus:outline-none"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate(`/exercices/${exercise.id}`)}
            >
            Voir détails <FaArrowRight />
            </motion.button>
        </div>
        </motion.div>
    );
}

export default ExerciceCard;
