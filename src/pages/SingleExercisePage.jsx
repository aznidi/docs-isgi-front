import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosClient } from "../api/axios";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Image du module */}
      {loading ? (
        <Skeleton height={200} className="mb-4" />
      ) : (
        exercise?.image_path && (
          <div className="h-48 bg-gray-100 flex justify-center items-center lg:mt-2 mt-12 rounded-t-sm">
            <img
              src={`http://localhost:8000/storage/${exercise.image_path}`}
              alt={exercise.title}
              className="h-full w-auto object-contain"
            />
          </div>
        )
      )}

      {/* Enoncé et informations */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        {/* Titre */}
        {loading ? (
          <Skeleton height={30} width="50%" className="mb-4" />
        ) : (
          <h1 className="text-3xl font-extrabold text-primary-dark mb-4">
            {exercise.title}
          </h1>
        )}

        {/* Niveau */}
        {loading ? (
          <Skeleton height={20} width="30%" className="mb-2" />
        ) : (
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
        )}

        {/* Informations liées */}
        {loading ? (
          <Skeleton height={20} width="80%" className="mb-4" />
        ) : (
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
        )}

        {/* Description */}
        <div className="mb-6">
          {loading ? (
            <Skeleton count={3} />
          ) : (
            <p className="text-gray-600 text-sm whitespace-pre-line">
              {exercise.description}
            </p>
          )}
        </div>

        {/* Instructions */}
        {loading ? (
          <Skeleton height={100} />
        ) : (
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: exercise.instructions }}
          />
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-4 mt-4">
          {loading ? (
            <Skeleton height={40} width={200} />
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Section des solutions */}
      <div className="p-6 shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-primary-dark mb-4">
          Solutions Disponibles
        </h2>
        {loading ? (
          Array(3)
            .fill()
            .map((_, index) => (
              <div key={index} className="mb-4">
                <Skeleton height={80} />
              </div>
            ))
        ) : solutions.length > 0 ? (
          <div className="space-y-4">
            {solutions.map((solution) => (
              <div
                key={solution.id}
                className="p-4 flex justify-between items-center bg-gray-100 rounded-lg shadow-sm"
              >
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: solution.content }}
                />
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
