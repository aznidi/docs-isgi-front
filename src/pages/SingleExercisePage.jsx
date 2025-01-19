import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosClient } from "../api/axios";
import { motion } from "framer-motion";
import { HashLoader } from "react-spinners";
import {
  FaLayerGroup,
  FaGraduationCap,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";

function SingleExercisePage() {
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
  const [exercise, setExercise] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les détails de l'exercice et ses solutions
  useEffect(() => {
    const fetchExercise = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/api/exercises/${id}`);
        setExercise(response.data);

        const solutionsResponse = await axiosClient.get(
          `/api/exercises/${id}/solutions`
        );
        setSolutions(solutionsResponse.data);
      } catch (error) {
        console.error("Erreur lors du chargement de l'exercice :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader size={50} color="#4A90E2" />
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >

        {/* Image du module */}
        {exercise?.image_path && (
            <div className="h-48 bg-gray-100 flex justify-center items-center lg:mt-2 mt-12 rounded-t-sm ">
            <img
                src={`http://localhost:8000/storage/${exercise.image_path}`}
                alt={exercise.title}
                className="h-full w-auto object-contain"
            />
            </div>
        )}

        {/* Enoncé et informations */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            {/* Titre */}
            <h1 className="text-3xl font-extrabold text-primary-dark mb-4">
            {exercise.title}
            </h1>

            <p
            className={`flex items-center text-md gap-2 uppercase font-bold mb-2 ${
              exercise.level === "facile"
                ? "text-green-500"
                : exercise.level === "intermédiaire"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            <FaGraduationCap />
                {exercise.level}
          </p>

        {/* Informations liées */}
        <div className="flex flex-wrap gap-4 mb-4">
          <p className="flex items-center text-primary font-bold text-sm gap-2">
            <FaGraduationCap className="text-primary" />
            {exercise.module.nomMod}
          </p>
          <p className="flex items-center text-neutral text-sm gap-2">
            <FaCalendarAlt className="text-neutral" />
             {exercise.module.anneeMod}
          </p>

        </div>


        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm whitespace-pre-line">
            {exercise.description}
          </p>
        </div>

        {/* Instructions */}
        <div
            className="prose "
            dangerouslySetInnerHTML={{ __html: exercise.instructions }}
            >
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          {exercise.path && (
            <a
              href={`http://localhost:8000/storage/${exercise.path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
            >
              Télécharger le fichier <FaArrowRight />
            </a>
          )}
          {exercise.image_path && (
            <a
              href={`http://localhost:8000/storage/${exercise.image_path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700"
            >
              Voir l'image <FaArrowRight />
            </a>
          )}
        </div>
      </div>

      {/* Section des solutions */}
      <div className=" p-6  shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-primary-dark mb-4">
          Solutions Disponibles
        </h2>
        {solutions.length > 0 ? (
          <div className="space-y-4">
            {solutions.map((solution) => (
              <div
                key={solution.id}
                className="p-4 flex justify-between items-center"
              >
                <>
                    <div>
                        <div
                            className="prose "
                            dangerouslySetInnerHTML={{ __html: solution.content }}
                            >
                        </div>

                    </div>
                </>
              </div>


            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-sm">
            Aucune solution disponible pour cet exercice.
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default SingleExercisePage;
