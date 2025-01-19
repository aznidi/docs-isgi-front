import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

function DocSignal({ onReport }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await onReport(data.reason); // Appeler la fonction pour signaler un document
      Swal.fire("Merci", "Votre signalement a été envoyé.", "success");
      reset(); // Réinitialiser le formulaire
    } catch (error) {
      Swal.fire("Erreur", "Impossible d'envoyer le signalement.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Titre de la section */}
      <h2 className="text-2xl font-bold text-red-600">Signaler un problème</h2>
      <p className="text-gray-600 text-sm">
        Si vous remarquez un problème avec ce document, veuillez nous en informer en décrivant la raison ci-dessous.
      </p>

      {/* Formulaire de signalement */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Raison du signalement
          </label>
          <textarea
            {...register("reason", { required: "Veuillez indiquer la raison du signalement." })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            rows={4}
            placeholder="Décrivez le problème ici..."
          ></textarea>
          {errors.reason && (
            <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-2 px-4 text-white font-bold rounded-lg transition ${
            submitting ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {submitting ? "Envoi en cours..." : "Envoyer le signalement"}
        </button>
      </form>
    </motion.div>
  );
}

export default DocSignal;
