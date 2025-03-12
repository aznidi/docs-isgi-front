import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { axiosClient } from "../../../../api/axios";
import { FaCheckCircle } from "react-icons/fa";

function AddEFM() {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Charger les modules disponibles
  useEffect(() => {
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

    fetchModules();
  }, []);

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
    tags: Yup.string().nullable(),
    max_score: Yup.number().nullable(),
    description: Yup.string()
    .required("La description est obligatoire")
    .min(5, "La description doit contenir au moins 5 caractères")
    .max(500, "La description ne peut pas dépasser 500 caractères"),
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
      description: "",
      path: null,
      image_path: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (value) formData.append(key, value);
        });

        await axiosClient.post("/api/exams", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        Swal.fire({
          icon: "success",
          title: "Examen ajouté avec succès !",
          confirmButtonText: "OK",
        }).then(() => navigate("/admin/exams/efm"));

        resetForm();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Erreur lors de l'ajout de l'examen !",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <motion.div
      className="container mx-auto px-6 py-16 bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-3xl font-extrabold text-primary-dark mb-8 text-center">
        Ajouter un Examen (EFM)
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
          <div className="space-y-6">
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

            <div>
              <label className="block text-gray-700 font-bold mb-2">Année</label>
              <input
                type="number"
                name="year"
                value={formik.values.year}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full p-3 border rounded focus:ring-2 ${
                  formik.touched.year && formik.errors.year
                    ? "ring-red-500 border-red-500"
                    : "ring-primary-light border-gray-300"
                }`}
                placeholder="Année de l'examen"
              />
              {formik.touched.year && formik.errors.year && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.year}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Duration(en min)</label>
              <input
                type="number"
                name="duration"
                value={formik.values.duration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full p-3 border rounded focus:ring-2 ${
                  formik.touched.year && formik.errors.duration
                    ? "ring-red-500 border-red-500"
                    : "ring-primary-light border-gray-300"
                }`}
                placeholder="Duration de l'examen"
              />
              {formik.touched.duration && formik.errors.duration && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.duration}</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
                <label className="block text-gray-700 font-bold mb-2">Diffucilte </label>
                <select
                name="difficulty_level"
                value={formik.values.difficulty_level}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border rounded focus:ring-2 ring-primary-light border-gray-300"
              >=
                  <option value={'facile'}>
                    facile
                  </option>
                  <option value={'intermédiaire'}>
                  intermédiaire
                  </option>
                  <option value={'difficile'}>
                  difficile
                  </option>
              </select>
            </div>

            <div>
                <label className="block text-gray-700 font-bold mb-2">Description </label>
                <textarea
                    name="description" // Assurez-vous que ce nom correspond à celui de `initialValues`
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-3 border rounded focus:ring-2 ring-primary-light border-gray-300"
                    />

                {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
                )}
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Fichier PDF</label>
              <input
                type="file"
                name="path"
                onChange={(e) => formik.setFieldValue("path", e.target.files[0])}
                className="w-full p-3 border rounded focus:ring-2 ring-primary-light border-gray-300"
              />
            </div>

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
          <span>Ajouter l'examen</span>
        </motion.button>
      )}
    </motion.div>
  );
}

export default AddEFM;
