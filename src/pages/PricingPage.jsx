import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaArrowRight, FaCreditCard, FaPaypal, FaApplePay, FaStripe, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const navigate = useNavigate();

  const plans = [
    {
      id: "standard",
      name: "Standard",
      monthlyPrice: "9.99",
      yearlyPrice: "99.99",
      features: [
        "Accès aux documents",
        "1 formateur par mois",
        "Support communautaire",
        "Accès limité aux vidéos",
      ],
      isRecommended: false,
    },
    {
      id: "recommended",
      name: "Recommandé",
      monthlyPrice: "19.99",
      yearlyPrice: "199.99",
      features: [
        "Accès illimité aux documents",
        "3 formateurs par mois",
        "Support prioritaire",
        "Ateliers exclusifs",
        "Accès complet aux vidéos",
        "Certificat après chaque module",
      ],
      isRecommended: true,
    },
    {
      id: "premium",
      name: "Premium Gold",
      monthlyPrice: "29.99",
      yearlyPrice: "299.99",
      features: [
        "Accès illimité aux documents",
        "Formateurs illimités",
        "Support 24/7",
        "Coaching personnalisé",
        "Accès à tous les ateliers",
        "Certificats professionnels",
        "Analyse de progression",
      ],
      isRecommended: false,
      isPremium: true,
    },
  ];

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Titre principal */}
      <motion.h2
        className="text-4xl font-extrabold lg:text-5xl text-primary-dark text-center mb-8 mt-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Votre Plan, Votre Réussite...
      </motion.h2>

      {/* Bouton de switch (Mensuel/Annuel) */}
      <div className="flex justify-center mb-10">
        <motion.div
          className="flex items-center bg-gray-200 rounded-full p-1 shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`py-2 px-6 rounded-full font-semibold focus:outline-none ${
              billingCycle === "monthly"
                ? "bg-primary text-white shadow-lg"
                : "text-gray-600"
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`py-2 px-6 rounded-full font-semibold focus:outline-none ${
              billingCycle === "yearly"
                ? "bg-primary text-white shadow-lg"
                : "text-gray-600"
            }`}
          >
            Annuel
          </button>
        </motion.div>
      </div>

      {/* Plans */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className={`relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow p-6 flex flex-col items-center ${
              plan.isRecommended
                ? "border-4 border-primary"
                : "border border-gray-200"
            }`}
            whileHover={{ y: -5 }}
          >
            {/* Badge "Recommandé" */}
            {plan.isRecommended && (
              <div className="absolute -top-1 bg-primary-dark text-white px-4 py-1 rounded-full text-sm font-semibold">
                Recommandé
              </div>
            )}

            {/* Premium badge avec effet or */}
            {plan.isPremium && (
              <div className="absolute -top-1 right-4 flex items-center gap-2 bg-yellow-400 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                <FaStar className="text-yellow-100" />
                Premium Gold
              </div>
            )}

            {/* Nom du plan */}
            <h3
              className={`text-2xl font-bold mb-4 ${
                plan.isPremium ? "text-yellow-500" : "text-gray-800"
              }`}
            >
              {plan.name}
            </h3>

            {/* Prix */}
            <p className="text-4xl font-extrabold text-primary mb-4">
              $
              {billingCycle === "monthly"
                ? plan.monthlyPrice
                : plan.yearlyPrice}
              <span className="text-sm font-medium text-gray-600">
                {billingCycle === "monthly" ? "/mois" : "/an"}
              </span>
            </p>

            {/* Fonctionnalités */}
            <ul className="space-y-3 text-gray-700 mb-6">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center gap-2">
                  <FaCheck className="text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Bouton */}
            <motion.button
              className={`py-3 px-6 rounded-lg shadow-lg flex items-center space-x-2 text-lg ${
                plan.isPremium
                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                  : "bg-primary hover:bg-primary-light text-white"
              }`}
              whileHover="hover"
              onClick={() => navigate(`/pricing/${plan.id.toLowerCase()}`)}
            >
              <span>Choisir ce plan</span>
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
          </motion.div>
        ))}
      </motion.div>

      {/* Méthodes de paiement */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-center text-primary-dark mb-6">
          Méthodes de Paiement Acceptées
        </h3>
        <div className="flex justify-center items-center gap-8">
          <FaCreditCard className="text-4xl text-gray-700" />
          <FaPaypal className="text-4xl text-blue-500" />
          <FaApplePay className="text-4xl text-gray-900" />
          <FaStripe className="text-4xl text-indigo-500" />
        </div>
      </div>

      {/* Lien pour réserver un formateur */}
      <div className="mt-16 flex justify-center">
        <motion.button
          className="bg-primary hover:bg-primary-light text-white py-3 px-6 rounded-lg shadow-lg flex items-center space-x-2 text-lg"
          whileHover="hover"
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
    </div>
  );
}

export default PricingPage;
