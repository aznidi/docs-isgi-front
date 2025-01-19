import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import Swal from "sweetalert2"; // Import SweetAlert2
import Button from "../ui/Button";
import Lien from "../ui/Lien";
import { axiosClient } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE} from "../router";
import { ClipLoader } from "react-spinners"; // Loader pour le bouton
import { AuthContext } from "../context/AuthContext";

// Traductions des messages d'erreur
const errorTranslations = {
  "The email has already been taken.": "Cet email est déjà utilisé.",
  "The password confirmation does not match.": "Les mots de passe ne correspondent pas.",
  "The email field is required.": "L'email est obligatoire.",
  "The password field is required.": "Le mot de passe est obligatoire.",
  "The name field is required.": "Le nom est obligatoire.",
};

function translateErrorMessage(message) {
  return errorTranslations[message] || "Une erreur est survenue. Veuillez réessayer.";
}

function SignupPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Accès au contexte

  // Validation Schema avec Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .required("Le nom est obligatoire"),
    email: Yup.string()
      .email("Adresse email invalide")
      .required("L'email est obligatoire"),
    password: Yup.string()
      .min(9, "Le mot de passe doit contenir au moins 9 caractères")
      .required("Le mot de passe est obligatoire"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Les mots de passe doivent correspondre")
      .required("La confirmation du mot de passe est obligatoire"),
  });

  // Animation Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <div className="flex justify-center items-center min-h-80">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-6 md:p-10 w-full max-w-md mt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Titre */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
          Créer un compte
        </h2>

        {/* Formulaire */}
        <Formik
          initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              // Obtenez le cookie CSRF
              await axiosClient.get("/sanctum/csrf-cookie");

              // Effectuez la requête POST pour s'inscrire
              const response = await axiosClient.post("/register", {
                name: values.name,
                email: values.email,
                password: values.password,
                password_confirmation: values.confirmPassword,
              });

              if (response.status === 201) {
                const token = response.data.token;

                // Stocker le token
                window.localStorage.setItem("token", token);

                // Configurer axios pour inclure automatiquement le token
                axiosClient.defaults.headers.Authorization = `Bearer ${token}`;

                // Appeler la fonction de connexion du contexte
                login(token);

                // Alert de succès
                Swal.fire({
                  title: "Inscription réussie !",
                  text: "Votre compte a été créé avec succès. Veuillez vous connecter.",
                  icon: "success",
                  confirmButtonText: "OK",
                  customClass: {
                    confirmButton: "bg-primary text-white px-4 py-2 rounded",
                  },
                }).then(() => {
                  // Redirigez vers la page de connexion après avoir cliqué sur "OK"
                  navigate(HOME_ROUTE);
                });
              }
            } catch (error) {
              if (error.response && error.response.status === 422) {
                // Traduire les erreurs retournées par le backend
                const backendErrors = error.response.data.errors;
                const translatedErrors = {};
                for (const field in backendErrors) {
                  translatedErrors[field] = translateErrorMessage(
                    backendErrors[field][0]
                  );
                }
                setErrors(translatedErrors);

                // Alert d'erreur
                Swal.fire({
                  title: "Erreur d'inscription",
                  text: "Veuillez corriger les erreurs et réessayer.",
                  icon: "error",
                  confirmButtonText: "OK",
                  customClass: {
                    confirmButton: "bg-red-600 text-white px-4 py-2 rounded",
                  },
                });
              } else {
                setErrors({ email: "Une erreur inattendue est survenue." });

                // Alert d'erreur générale
                Swal.fire({
                  title: "Erreur inattendue",
                  text: "Une erreur est survenue. Veuillez réessayer plus tard.",
                  icon: "error",
                  confirmButtonText: "OK",
                  customClass: {
                    confirmButton: "bg-red-600 text-white px-4 py-2 rounded",
                  },
                });
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Champ Nom */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Champ Email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Champ Mot de passe */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mot de passe
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Champ Confirmation Mot de passe */}
              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirmer le mot de passe
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Bouton S'inscrire */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mb-4 hover:scale-105 transition-transform duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ClipLoader size={20} color="white" />
                ) : (
                  "S'inscrire"
                )}
              </Button>
            </Form>
          )}
        </Formik>

        {/* Lien vers connexion */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Vous avez déjà un compte ?{" "}
            <Lien
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              Se connecter
            </Lien>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default SignupPage;
