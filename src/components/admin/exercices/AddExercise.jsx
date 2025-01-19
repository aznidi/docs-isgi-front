import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";
import {axiosClient} from "../../../api/axios";
import { FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AddExercise() {
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState([]);
  const [modulesLoading, setModulesLoading] = useState(true);
  const navigate = useNavigate();

  // Charger les modules depuis l'API
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axiosClient.get("/api/modules");
        setModules(response.data); // Récupérer les modules depuis la réponse
        setModulesLoading(false);
      } catch (error) {
        Swal.fire("Erreur", "Impossible de charger les modules.", "error");
        setModulesLoading(false);
      }
    };

    fetchModules();
  }, []);

  // Validation des champs avec Yup
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Le titre est obligatoire."),
    description: Yup.string().nullable(),
    module_id: Yup.number().required("Veuillez sélectionner un module."),
    level: Yup.string().required("Veuillez sélectionner un niveau."),
    instructions: Yup.string().required("Les consignes sont obligatoires."),
    path: Yup.mixed().nullable(),
    image: Yup.mixed().nullable(),
  });

  // Fonction pour gérer l'envoi du formulaire
  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      const response = await axiosClient.post("/api/exercises", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Afficher un message de succès
      Swal.fire("Succès", "L'exercice a été ajouté avec succès.", "success");
      resetForm();
      navigate('/admin/exercises')
    } catch (error) {
      // Gérer les erreurs du backend
      console.log(error)
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        Swal.fire("Erreur", "Une erreur s'est produite.", "error");
      }
    }
    setLoading(false);
    setSubmitting(false);
  };

  return (
    <div className="p-6 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary-dark">
          Ajouter un Exercice
        </h1>

        <Formik
          initialValues={{
            title: "",
            description: "",
            module_id: "",
            level: "",
            instructions: "",
            path: null,
            image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-6">
              {/* Titre */}
              <div>
                <label htmlFor="title" className="block font-medium text-gray-700">
                  Titre <span className="text-red-500">*</span>
                </label>
                <Field
                  name="title"
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg ring-2 ring-blue-200 focus:outline-none focus:ring-blue-500"
                  placeholder="Entrez le titre de l'exercice"
                />
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block font-medium text-gray-700">
                  Description
                </label>
                <Field
                  name="description"
                  as="textarea"
                  className="w-full px-4 py-2 border rounded-lg ring-2 ring-blue-200 focus:outline-none focus:ring-blue-500"
                  placeholder="Entrez une description (facultatif)"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Module */}
              <div>
                <label htmlFor="module_id" className="block font-medium text-gray-700">
                  Module <span className="text-red-500">*</span>
                </label>
                {modulesLoading ? (
                  <HashLoader color="#3b82f6" size={30} />
                ) : (
                  <Field
                    as="select"
                    name="module_id"
                    className="w-full px-4 py-2 border rounded-lg ring-2 ring-blue-200 focus:outline-none focus:ring-blue-500"
                  >
                    <option value="">Sélectionnez un module</option>
                    {modules.map((module) => (
                      <option key={module.id} value={module.id}>
                        {module.nomMod}
                      </option>
                    ))}
                  </Field>
                )}
                <ErrorMessage name="module_id" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Niveau */}
              <div>
                <label htmlFor="level" className="block font-medium text-gray-700">
                  Niveau <span className="text-red-500">*</span>
                </label>
                <Field
                  as="select"
                  name="level"
                  className="w-full px-4 py-2 border rounded-lg ring-2 ring-blue-200 focus:outline-none focus:ring-blue-500"
                >
                  <option value="">Sélectionnez un niveau</option>
                  <option value="facile">Facile</option>
                  <option value="intermédiaire">Intermédiaire</option>
                  <option value="avancé">Avancé</option>
                </Field>
                <ErrorMessage name="level" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Instructions */}
              <div>
                <label htmlFor="instructions" className="block font-medium text-gray-700">
                  Consignes <span className="text-red-500">*</span>
                </label>
                <Field
                  name="instructions"
                  as="textarea"
                  className="w-full px-4 py-2 border rounded-lg ring-2 ring-blue-200 focus:outline-none focus:ring-blue-500"
                  placeholder="Entrez les consignes pour l'exercice"
                />
                <ErrorMessage
                  name="instructions"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Fichier PDF */}
              <div>
                <label htmlFor="path" className="block font-medium text-gray-700">
                  Fichier PDF
                </label>
                <input
                  type="file"
                  id="path"
                  className="w-full px-4 py-2 border rounded-lg ring-2 ring-blue-200 focus:outline-none focus:ring-blue-500"
                  onChange={(event) => setFieldValue("path", event.target.files[0])}
                />
              </div>

              {/* Image */}
              <div>
                <label htmlFor="image" className="block font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  className="w-full px-4 py-2 border rounded-lg ring-2 ring-blue-200 focus:outline-none focus:ring-blue-500"
                  onChange={(event) => setFieldValue("image", event.target.files[0])}
                />
              </div>

              {/* Bouton de soumission */}
              <div className="flex justify-center">
                {loading ? (
                  <HashLoader color="#3b82f6" size={50} />
                ) : (
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    Ajouter l'exercice
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddExercise;
