import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { axiosClient } from "../../../../api/axios";
import { FaCheckCircle } from "react-icons/fa";

function EditEFM() {
  const { id } = useParams(); // Récupérer l'ID de l'examen à modifier
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModules();
    fetchExam();
  }, []);

  // Charger les modules disponibles
  const fetchModules = async () => {
    try {
      const response = await axiosClient.get("/api/modules");
      setModules(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de charger les modules.",
      });
    }
  };

  // Charger les données de l'examen existant
  const fetchExam = async () => {
    try {
      const response = await axiosClient.get(`/api/exams/${id}`);
      const exam = response.data;
      formik.setValues({
        title: exam.title || "",
        type: exam.type || "EFM",
        module_id: exam.module_id || "",
        year: exam.year || "",
        duration: exam.duration || "",
        status: exam.status || "active",
        difficulty_level: exam.difficulty_level || "facile",
        max_score: exam.max_score || "",
        tags: exam.tags ? exam.tags.join(", ") : "",
        description: exam.description || "",
        path: null, // Le fichier ne sera pas pré-rempli
        image_path: null, // L'image ne sera pas pré-remplie
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de charger les informations de l'examen.",
      });
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Le titre est obligatoire."),
    type: Yup.string()
      .oneOf(["EFM", "EFF", "Control"], "Type invalide.")
      .required("Le type est obligatoire."),
    module_id: Yup.number().nullable(),
    year: Yup.number()
      .integer("L'année doit être un entier.")
      .required("L'année est obligatoire."),
    duration: Yup.number().nullable(),
    status: Yup.string()
      .oneOf(["active", "archived", "draft"], "Statut invalide.")
      .required("Le statut est obligatoire."),
    difficulty_level: Yup.string()
      .oneOf(["facile", "intermédiaire", "difficile"], "Niveau invalide.")
      .required("Le niveau de difficulté est obligatoire."),
    max_score: Yup.number().nullable(),
    tags: Yup.string().nullable(),
    description: Yup.string().nullable(),
    path: Yup.mixed().nullable(),
    image_path: Yup.mixed().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      type: "EFM",
      module_id: "",
      year: "",
      duration: "",
      status: "active",
      difficulty_level: "facile",
      max_score: "",
      tags: "",
      description: "",
      path: null,
      image_path: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (key === "tags" && value) {
            formData.append(key, value.split(",").map((tag) => tag.trim())); // Convertir en tableau
          } else if (value) {
            formData.append(key, value);
          }
        });

        const response = await axiosClient.put(`/api/exams/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response)

        Swal.fire({
          icon: "success",
          title: "Examen mis à jour avec succès !",
          confirmButtonText: "OK",
        }).then(() => navigate("/admin/exams/efm"));
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Erreur lors de la mise à jour de l'examen !",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <HashLoader size={50} color="#2563EB" />
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-6 py-16 bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-3xl font-extrabold text-primary-dark mb-8 text-center">
        Modifier un Examen (EFM)
      </h1>

      {isSubmitting ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <HashLoader size={50} color="#2563EB" />
        </div>
      ) : (
        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Partie gauche */}
          <div className="space-y-6">
            {/* Titre */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Titre</label>
              <input
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full p-3 border rounded focus:ring-2 ${
                  formik.touched.title && formik.errors.title
                    ? "ring-red-500 border-red-500"
                    : "ring-primary-light border-gray-300"
                }`}
                placeholder="Titre de l'examen"
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
              )}
            </div>

            {/* Module */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Module</label>
              <select
                name="module_id"
                value={formik.values.module_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border rounded focus:ring-2 ring-primary-light border-gray-300"
              >
                <option value="">Sélectionnez un module</option>
                {modules.map((module) => (
                  <option key={module.id} value={module.id}>
                    {module.nomMod}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Partie droite */}
          <div className="space-y-6">
            {/* Fichiers PDF */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Fichier PDF</label>
              <input
                type="file"
                name="path"
                onChange={(e) => formik.setFieldValue("path", e.target.files[0])}
                className="w-full p-3 border rounded focus:ring-2 ring-primary-light border-gray-300"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Image</label>
              <input
                type="file"
                name="image_path"
                onChange={(e) =>
                  formik.setFieldValue("image_path", e.target.files[0])
                }
                className="w-full p-3 border rounded focus:ring-2 ring-primary-light border-gray-300"
              />
            </div>
          </div>
        </form>
      )}

      {!isSubmitting && (
        <motion.button
          type="submit"
          className="bg-primary hover:bg-primary-light text-white py-3 px-6 rounded-lg shadow-lg flex items-center space-x-2 text-lg mt-8 w-full justify-center"
          whileHover={{ x: 2 }}
          onClick={formik.handleSubmit}
        >
          <FaCheckCircle />
          <span>Modifier l'examen</span>
        </motion.button>
      )}
    </motion.div>
  );
}

export default EditEFM;
