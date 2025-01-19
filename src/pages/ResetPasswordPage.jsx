import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { axiosClient } from "../api/axios";
import { LOGIN_ROUTE } from "../router";
import Button from "../ui/Button";
import { ClipLoader } from "react-spinners";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importer les icônes

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token } = useParams(); // Récupérer le token depuis l'URL
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email"); // Récupérer l'email depuis les paramètres

  // Gestion des états pour afficher ou cacher les mots de passe
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation Schema
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(9, "Le mot de passe doit contenir au moins 9 caractères")
      .required("Le mot de passe est obligatoire"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Les mots de passe doivent correspondre")
      .required("La confirmation du mot de passe est obligatoire"),
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 md:p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Réinitialiser le mot de passe
        </h2>
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axiosClient.get("/sanctum/csrf-cookie");

              const response = await axiosClient.post("/reset-password", {
                token, // Token depuis l'URL
                email, // Email depuis les paramètres de l'URL
                password: values.password,
                password_confirmation: values.confirmPassword,
              });

              if (response.status === 200) {
                Swal.fire({
                  title: "Mot de passe réinitialisé !",
                  text: "Votre mot de passe a été mis à jour. Vous pouvez maintenant vous connecter.",
                  icon: "success",
                  confirmButtonText: "Se connecter",
                  customClass: {
                    confirmButton: "bg-primary text-white px-4 py-2 rounded",
                  },
                }).then(() => {
                  navigate(LOGIN_ROUTE);
                });
              }
            } catch (error) {
              if (error.response && error.response.status === 422) {
                Swal.fire({
                  title: "Erreur",
                  text: "Les informations fournies sont incorrectes.",
                  icon: "error",
                  confirmButtonText: "OK",
                  customClass: {
                    confirmButton: "bg-red-600 text-white px-4 py-2 rounded",
                  },
                });
              } else {
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
              <div className="mb-4 relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-3 right-3 text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-6 relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-3 right-3 text-gray-600 focus:outline-none"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? <ClipLoader size={20} color="white" /> : "Réinitialiser"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
