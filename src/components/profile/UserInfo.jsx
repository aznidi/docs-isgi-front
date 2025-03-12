import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { FaUser, FaEnvelope, FaSave } from "react-icons/fa";
import Button from "../../ui/Button";
import { HashLoader } from "react-spinners";
import { axiosClient } from "../../api/axios";

function UserInfo({ user, fetchUserProfile }) {
    console.log(user)
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-8 max-w-3xl mx-auto mb-6">
      {/* Section des informations utilisateur */}
      <div className="text-center space-y-4 mt-14">
        <div className="flex flex-col items-center">
          {user?.profile_image ? (
            <img
                src={
                (user.profile_image?.startsWith("http")
                  ? user.profile_image
                  : user.profile_image
                  ? `http://localhost:8000/storage/${user.profile_image}`
                  : "https://via.placeholder.com/150")
              }
              alt={user.name}
              className="w-24 h-24 rounded-full shadow-md object-cover"
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center bg-gray-300 text-white rounded-full text-3xl">
              {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
            </div>
          )}
        </div>
        <h3 className="text-2xl font-bold text-primary-dark">{user?.name || "Nom inconnu"}</h3>
        <p className="text-gray-600">{user?.email || "Email inconnu"}</p>
      </div>

      {/* Section de modification des informations */}
      <div>
        <h3 className="text-xl font-semibold text-primary-dark mb-4">Modifier vos informations</h3>
        <Formik
          initialValues={{
            username: user?.name || "",
            email: user?.email || "",
          }}
          enableReinitialize
          validationSchema={Yup.object({
            username: Yup.string()
              .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
              .required("Nom d'utilisateur requis"),
            email: Yup.string().email("Email invalide").required("Email requis"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              let usernameUpdated = false;
              let emailUpdated = false;

              // Mise à jour du nom d'utilisateur uniquement si modifié
              if (values.username !== user?.name) {
                const usernameResponse = await axiosClient.put("/api/update-username", {
                  username: values.username,
                });
                if (usernameResponse.status === 200) usernameUpdated = true;
              }

              // Mise à jour de l'email uniquement si modifié
              if (values.email !== user?.email) {
                const emailResponse = await axiosClient.put("/api/update-email", {
                  email: values.email,
                });
                if (emailResponse.status === 200) emailUpdated = true;
              }

              // Vérifier si au moins un champ a été mis à jour
              if (usernameUpdated || emailUpdated) {
                Swal.fire("Succès", "Vos informations ont été mises à jour.", "success");
                fetchUserProfile(); // Actualiser les données utilisateur
              } else {
                Swal.fire("Info", "Aucune information n'a été modifiée.", "info");
              }
            } catch (error) {
              Swal.fire(
                "Erreur",
                error.response?.data?.message || "Impossible de mettre à jour les informations.",
                "error"
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Champ Nom d'utilisateur */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-neutral-dark">
                  Nouveau nom d'utilisateur
                </label>
                <div className="relative">
                  <Field
                    type="text"
                    name="username"
                    className="w-full mt-1 p-3 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none pl-10"
                  />
                  <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                </div>
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-danger text-sm mt-1"
                />
              </div>

              {/* Champ Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-dark">
                  Nouvel email
                </label>
                <div className="relative">
                  <Field
                    type="email"
                    name="email"
                    className="w-full mt-1 p-3 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none pl-10"
                  />
                  <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger text-sm mt-1"
                />
              </div>

              {/* Bouton de soumission */}
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? <HashLoader size={20} color="white" /> : <FaSave />}
                Mettre à jour
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default UserInfo;
