import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { axiosClient } from "../api/axios";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import Button from "../ui/Button";
import Lien from "../ui/Lien";

function ForgotPasswordPage() {
  // Validation Schema avec Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Adresse email invalide")
      .required("L'email est obligatoire"),
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
    <div className="flex justify-center items-center min-h-screen">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-6 md:p-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Titre */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
          Mot de passe oublié
        </h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Entrez votre adresse email pour recevoir un lien de réinitialisation.
        </p>

        {/* Formulaire */}
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              // Obtenez le cookie CSRF
              await axiosClient.get("/sanctum/csrf-cookie");

              // Effectuez la requête POST pour envoyer l'email
              const response = await axiosClient.post("/forgot-password", {
                email: values.email,
              });

              // Succès
              if (response.status === 200) {
                Swal.fire({
                  title: "Email envoyé !",
                  text: "Un lien de réinitialisation vous a été envoyé.",
                  icon: "success",
                  confirmButtonText: "OK",
                  customClass: {
                    confirmButton: "bg-primary text-white px-4 py-2 rounded",
                  },
                });
              }
            } catch (error) {
              if (error.response) {
                const { status, data } = error.response;

                if (status === 422) {
                  // Erreur de validation
                  setErrors({ email: "Email non reconnu. Veuillez réessayer." });
                  Swal.fire({
                    title: "Erreur",
                    text: "L'adresse email est invalide ou introuvable.",
                    icon: "error",
                    confirmButtonText: "OK",
                    customClass: {
                      confirmButton: "bg-red-600 text-white px-4 py-2 rounded",
                    },
                  });
                } else {
                  // Autres erreurs
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
              setSubmitting(false); // Désactiver le loader
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Champ Email */}
              <div className="mb-6">
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

              {/* Bouton Envoyer */}
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
                  "Envoyer"
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

export default ForgotPasswordPage;
