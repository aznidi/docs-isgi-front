import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section principale */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Titre et description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-primary mb-4">ISGIDocs</h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Simplifiez votre apprentissage avec une plateforme intuitive pour accéder à tous vos documents et modules éducatifs.
            </p>
          </motion.div>

          {/* Liens utiles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-xl font-semibold text-primary-light mb-4">Liens utiles</h4>
            <ul className="space-y-3">
              {["Accueil", "Modules", "Documents", "Founders", "Contact-Support"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-primary-light transition-colors"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Actions rapides */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h4 className="text-xl font-semibold text-primary-light mb-4">Actions rapides</h4>
            <motion.button
              className="bg-primary-dark hover:bg-primary text-white py-3 px-6 rounded-lg shadow-lg flex items-center space-x-2 text-lg w-full mb-4"
              whileHover={{ x: 5 }}
              onClick={() => navigate("/signup")}
            >
              <span>Créer un compte</span>
              <FaArrowRight />
            </motion.button>
            <motion.button
              className="bg-primary-light hover:bg-primary-dark text-white py-3 px-6 rounded-lg shadow-lg flex items-center space-x-2 text-lg w-full"
              whileHover={{ x: 5 }}
              onClick={() => navigate("/login")}
            >
              <span>Se connecter</span>
              <FaArrowRight />
            </motion.button>
          </motion.div>
        </div>

        {/* Ligne de séparation */}
        <div className="my-8 border-t border-gray-700"></div>

        {/* Section inférieure */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          {/* Icônes sociales */}
          <motion.div
            className="flex space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-light transition-colors duration-200"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-light transition-colors duration-200"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-light transition-colors duration-200"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-light transition-colors duration-200"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
          </motion.div>

          {/* Texte copyright */}
          <motion.p
            className="text-gray-400 text-center text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            © {new Date().getFullYear()} <span className="text-primary">ISGIDocs</span>. Tous droits réservés.
            <br />
            Développé par{" "}
            <a
              href="https://aznidi.vercel.app"
              className="text-primary-dark underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              This Guy
            </a>
          </motion.p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
