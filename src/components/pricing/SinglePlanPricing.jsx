import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheck, FaArrowRight, FaHome, FaChalkboardTeacher } from "react-icons/fa";
import addToCart from "../../assets/add-to-cart.svg";

const plans = [
  {
    id: "standard",
    name: "Standard",
    priceMonthly: "9.99",
    priceYearly: "99.99",
    description: "Idéal pour les débutants ou ceux ayant des besoins limités.",
    features: [
      "Accès aux documents",
      "1 formateur par mois",
      "Support communautaire",
      "Accès limité aux vidéos",
    ],
  },
  {
    id: "recommended",
    name: "Recommandé",
    priceMonthly: "19.99",
    priceYearly: "199.99",
    description: "Le meilleur équilibre entre coût et fonctionnalités.",
    features: [
      "Accès illimité aux documents",
      "3 formateurs par mois",
      "Support prioritaire",
      "Ateliers exclusifs",
      "Accès complet aux vidéos",
      "Certificat après chaque module",
    ],
  },
  {
    id: "premium",
    name: "Premium Gold",
    priceMonthly: "29.99",
    priceYearly: "299.99",
    description: "Conçu pour les professionnels et les apprenants exigeants.",
    features: [
      "Accès illimité aux documents",
      "Formateurs illimités",
      "Support 24/7",
      "Coaching personnalisé",
      "Accès à tous les ateliers",
      "Certificats professionnels",
      "Analyse de progression",
    ],
  },
];

function SinglePlanPricing() {
  const { plan } = useParams();
  const navigate = useNavigate();

  const selectedPlan = plans.find((p) => p.id === plan);

  if (!selectedPlan) {
    return (
      <div className="text-center text-red-500 text-lg mt-20">
        <p>Plan introuvable !</p>
        <button
          onClick={() => navigate("/pricing")}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg shadow-lg"
        >
          Retour à la tarification
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Section principale */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 bg-white rounded-lg shadow-md p-8">
        {/* Image */}
        <motion.div
          className="lg:w-1/2 w-full"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={addToCart}
            alt={selectedPlan.name}
            className="w-full hidden lg:block"
          />
        </motion.div>

        {/* Contenu du plan */}
        <motion.div
          className="lg:w-1/2 w-full flex flex-col items-start"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-primary-dark mb-4">
            {selectedPlan.name}
          </h2>
          <p className="text-gray-700 mb-6">{selectedPlan.description}</p>
          <p className="text-4xl font-extrabold text-primary mb-6">
            ${selectedPlan.priceMonthly}
            <span className="text-sm text-gray-600">/mois</span>
          </p>
          <p className="text-gray-600 text-lg mb-4">
            Ou économisez{" "}
            <span className="text-primary font-bold">
              ${selectedPlan.priceYearly}
            </span>{" "}
            par an !
          </p>

          {/* Liste des fonctionnalités */}
          <ul className="space-y-3 text-gray-700 mb-6">
            {selectedPlan.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <FaCheck className="text-green-500" />
                {feature}
              </li>
            ))}
          </ul>

          {/* Boutons */}
          <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
            <motion.button
              className="bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg shadow-lg flex items-center justify-center space-x-2 text-lg w-full lg:w-auto"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
              onClick={() => alert(`Réservation pour le plan ${selectedPlan.name}`)}
            >
              <span>Réserver ce Plan</span>
              <motion.span
                variants={{
                  hover: { x: 5 },
                  initial: { x: 0 },
                }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <FaArrowRight />
              </motion.span>
            </motion.button>

            <motion.button
                className="bg-primary-dark hover:bg-primary text-white py-3 px-6 rounded-lg shadow-lg flex items-center space-x-2 text-lg"
                whileHover={{ x: 2 }}
                onClick={() => navigate(`/find-teacher}`)}
            >
                <span>Réserver un Formateur</span>
                <motion.span
                variants={{
                    hover: { x: 5 },
                    initial: { x: 0 },
                }}
                transition={{ type: "spring", stiffness: 200 }}
                >
                <FaArrowRight />
                </motion.span>
            </motion.button>
          </div>

          {/* Lien retour */}
          <p
            className="mt-6 text-blue-500 cursor-pointer underline flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <FaHome /> Retour à l'Accueil
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default SinglePlanPricing;
