import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import aznidi from "../../assets/aznidi.jpeg";
function Founders() {
  return (
    <div className="container mx-auto py-16 px-6 flex flex-col lg:flex-row items-center gap-12">
      {/* Image du fondateur */}
      <motion.div
        className="lg:w-1/2 w-full flex justify-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={aznidi}
          alt="Salah Aznidi"
          className="rounded-lg shadow-lg w-full max-w-md object-cover"
        />
      </motion.div>

      {/* Infos du fondateur */}
      <motion.div
        className="lg:w-1/2 w-full text-center lg:text-left"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-extrabold text-primary mb-4">
          Salah Aznidi
        </h2>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Salut ! Je suis Salah Aznidi, un développeur fullstack passionné. Je
          transforme les idées en solutions numériques innovantes en utilisant
          des technologies modernes et des méthodologies agiles.
        </p>
        <ul className="text-gray-600 space-y-4 mb-6">
          <li className="flex items-center gap-2">
            <MdPhone className="text-primary" />
            <span>+212 6 11 38 67 92</span>
          </li>
          <li className="flex items-center gap-2">
            <MdEmail className="text-primary" />
            <span>salahaznidi09@gmail.com</span>
          </li>
          <li className="flex items-center gap-2">
            <FaGlobe className="text-primary" />
            <a
              href="https://aznidi.vercel.app"
              className="hover:text-primary-light transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              aznidi.vercel.app
            </a>
          </li>
        </ul>

        {/* Liens sociaux */}
        <div className="flex justify-center lg:justify-start gap-6">
          <a
            href="https://github.com/aznidi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary transition"
          >
            <FaGithub size={28} />
          </a>
          <a
            href="https://www.linkedin.com/in/aznidi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary transition"
          >
            <FaLinkedin size={28} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default Founders;
