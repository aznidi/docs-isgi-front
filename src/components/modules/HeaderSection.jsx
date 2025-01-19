import React from "react";
import { motion } from "framer-motion";

const HeaderSection = () => {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl mt-20 lg:text-4xl font-extrabold text-primary-dark mb-4 flex items-center justify-center gap-2">
        À Quel Module Pensez-Vous ?
      </h2>
      <p className="text-gray-700 text-lg">
        Explorez les modules qui suscitent le plus d’intérêt et qui enrichissent vos compétences.
      </p>
    </motion.div>
  );
};

export default HeaderSection;
