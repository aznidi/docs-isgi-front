import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import Swal from "sweetalert2"; // Import SweetAlert2
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import Button from "../ui/Button";
import Lien from "../ui/Lien";
import { axiosClient } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../router";
import { ClipLoader } from "react-spinners"; // Importer le loader
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Accès au contexte
  const [loading, setLoading] = useState(false); // État pour le loader

  // Validation Schema avec Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Adresse email invalide")
      .required("L'email est obligatoire"),
    password: Yup.string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères")
      .required("Le mot de passe est obligatoire"),
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

  // Gestion du clic sur "Continuer avec Google"
  const handleGoogleLogin = async () => {
    try {
      setLoading(true); // Affiche le loader

      // Obtenir l'URL de redirection depuis l'API
      const response = await axiosClient.get("/api/auth/google/redirect");

      if (response.data.redirect_url) {
        window.location.href = response.data.redirect_url; // Redirige vers Google
      } else {
        Swal.fire({
          title: "Erreur",
          text: "Impossible d'obtenir l'URL de redirection.",
          icon: "error",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "bg-red-600 text-white px-4 py-2 rounded",
          },
        });
      }
    } catch (error) {
      console.error("Erreur lors de la connexion avec Google :", error);
      Swal.fire({
        title: "Erreur",
        text: "Une erreur est survenue lors de la connexion avec Google.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "bg-red-600 text-white px-4 py-2 rounded",
        },
      });
    } finally {
      setLoading(false); // Masque le loader
    }
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
        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary-dark mb-6">
          Connexion
        </h2>

        {/* Formulaire */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              await axiosClient.get("/sanctum/csrf-cookie");

              const response = await axiosClient.post("/login", values);

              if (response.status === 200) {
                const token = response.data.token;

                // Stocker le token
                window.localStorage.setItem("token", token);

                // Configurer axios pour inclure automatiquement le token
                axiosClient.defaults.headers.Authorization = `Bearer ${token}`;

                // Appeler la fonction de connexion du contexte
                login(token);

                // Alert de succès
                Swal.fire({
                  title: "Connexion réussie !",
                  text: "Bienvenue sur ISGIDocs.",
                  icon: "success",
                  confirmButtonText: "OK",
                  customClass: {
                    confirmButton: "bg-primary text-white px-4 py-2 rounded",
                  },
                }).then(() => {
                  navigate(HOME_ROUTE);
                });
              }
            } catch (error) {
              if (error.response) {
                const { status, data } = error.response;

                if (status === 422) {
                  setErrors({ email: "Identifiants incorrects." });
                  Swal.fire({
                    title: "Erreur de connexion",
                    text: "Vos identifiants sont incorrects. Veuillez réessayer.",
                    icon: "error",
                    confirmButtonText: "OK",
                    customClass: {
                      confirmButton: "bg-red-600 text-white px-4 py-2 rounded",
                    },
                  });
                } else if (status === 404) {
                  setErrors({ email: "Route non trouvée." });
                  Swal.fire({
                    title: "Erreur",
                    text: "La route demandée est introuvable.",
                    icon: "error",
                    confirmButtonText: "OK",
                    customClass: {
                      confirmButton: "bg-red-600 text-white px-4 py-2 rounded",
                    },
                  });
                } else {
                  setErrors({
                    email: "Une erreur est survenue. Veuillez réessayer.",
                  });
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
              }
            } finally {
              setSubmitting(false);
            }
          }}

        >
          {({ isSubmitting }) => (
            <Form>
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
              <div className="mb-6">
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

              {/* Bouton Connexion */}
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
                  "Se connecter"
                )}
              </Button>
            </Form>
          )}
        </Formik>
         {/* Lien vers mot de passe oublie */}
         <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            <Lien
              href="/forgot-password"
              className="text-primary hover:underline font-medium"
            >
              Mot de passe oublié ?
            </Lien>
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-gray-500">ou</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

       {/* Providers */}
        <div className="flex justify-center items-center mb-6">
        <button
            type="button"
            className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 p-3 w-full max-w-xs shadow-md transition-all duration-300 rounded-md"
            aria-label="Se connecter avec Google"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={24} color="#4A90E2" />
            ) : (
              <>
                <FaGoogle className="text-red-500 w-6 h-6 mr-2" />
                <span className="text-gray-700 font-medium">
                  Continuer avec Google
                </span>
              </>
            )}
          </button>
        </div>


        {/* Lien vers inscription */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Vous n'avez pas de compte ?{" "}
            <Lien
              href="/sign-up"
              className="text-primary hover:underline font-medium"
            >
              Créer un compte
            </Lien>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
