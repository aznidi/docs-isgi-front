import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import DocumentCard from "./DocumentCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { axiosClient } from "../../api/axios";

function SearchDocuments({ moduleId, moduleName }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Schéma de validation avec Yup
  const validationSchema = Yup.object({
    query: Yup.string()
      .min(2, "Le mot-clé doit contenir au moins 2 caractères.")
      .required("Veuillez entrer un mot-clé pour la recherche."),
  });

  // Gestion de la recherche
  const handleSearch = async (values, { setSubmitting }) => {
    setLoading(true);

    try {
      const response = await axiosClient.get(`/api/modules/${moduleId}/documents/search`, {
        params: { query: values.query },
      });
      setResults(response.data);

    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    } finally {
      setLoading(false);
      setSubmitting(false); // Terminer le formulaire
    }
  };

  // Skeleton loader pour les résultats
  const renderSkeletonResults = () => (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {Array(3)
        .fill()
        .map((_, index) => (
          <div key={index} className="p-4 bg-white shadow rounded-lg">
            <Skeleton height={200} className="mb-4" />
            <Skeleton height={20} width="80%" className="mb-2" />
            <Skeleton height={20} width="60%" />
          </div>
        ))}
    </motion.div>
  );

  return (
    <div className="container mx-auto py-16 px-6">
      {/* Titre de recherche */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-primary-dark mb-4">
          Rechercher des Documents liés à <span className="font-montserrat font-extrabold underline">{moduleName || "ce module"}</span>
        </h2>
        <p className="text-gray-600 text-lg">
          Trouvez rapidement les documents associés au module. Tapez des mots-clés comme "TP", "Vidéo", "Cours", ou "Examen".
        </p>
      </motion.div>

      {/* Formulaire de recherche avec Formik */}
      <Formik
        initialValues={{ query: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSearch}
      >
        {({ isSubmitting }) => (
          <Form>
            <motion.div
              className="flex justify-center items-center mb-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full max-w-lg">
                <Field
                  name="query"
                  type="text"
                  className="w-full py-3 px-6 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Tapez un mot-clé, ex: TP, Cours, Examen..."
                />
                <ErrorMessage
                  name="query"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
                <button
                  type="submit"
                  className={`absolute top-1/2 right-3 transform -translate-y-1/2 bg-primary text-white p-2 rounded-lg hover:bg-primary-light transition-colors ${isSubmitting ? "cursor-not-allowed" : ""
                    }`}
                  disabled={isSubmitting}
                >
                  <FaSearch />
                </button>
              </div>
            </motion.div>
          </Form>
        )}
      </Formik>

      {/* Résultats ou Skeleton Loader */}
      {loading ? (
        renderSkeletonResults()
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {results.length > 0 ? (
            results.map((doc) => (
              <DocumentCard
                document={doc}
                key={doc.id}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              Aucun document trouvé pour le mot-clé.
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default SearchDocuments;
