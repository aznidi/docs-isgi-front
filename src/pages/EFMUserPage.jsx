import React from 'react';
import App from '../components/exams/efm/App';
import { motion } from 'framer-motion';

function EFMUserPage() {
  return (
    <div className="container mx-auto px-6 py-16 min-h-screen">
      <motion.h1
        className="text-4xl font-extrabold text-primary-dark mb-6 text-center mt-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        À Quel EFM Pensez-Vous ?
      </motion.h1>
      <App />
    </div>
  );
}

export default EFMUserPage;
