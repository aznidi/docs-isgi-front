import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhoneAlt, FaArrowRight } from "react-icons/fa";

function ContactSupportPage() {
  // Validation du formulaire avec Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Le nom est requis"),
    email: Yup.string()
      .email("Adresse email invalide")
      .required("L'email est requis"),
    message: Yup.string()
      .min(10, "Le message doit contenir au moins 10 caractères")
      .required("Le message est requis"),
  });

  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Formulaire soumis :", values);
    alert("Merci pour votre message. Nous vous répondrons bientôt !");
    resetForm();
  };

  return (
<div className="container mx-auto p-6 min-h-screen flex flex-col items-center justify-start ">
  {/* Titre */}
  <motion.h1
    className="text-4xl font-bold text-primary-dark mt-14 mb-4 text-center leading-tight md:mt-16"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    Contactez notre équipe de support
  </motion.h1>

  <p className="text-lg text-neutral-dark mb-8 text-center max-w-2xl">
    Vous avez des questions ou besoin d'aide ? Envoyez-nous un message ou contactez-nous directement via nos réseaux sociaux !
  </p>

  {/* Formulaire */}
  <div className="p-8 rounded-sm shadow-sm w-full md:w-2/3 lg:w-1/2">
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col space-y-4">
          {/* Nom */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-dark">
              Nom complet
            </label>
            <Field
              type="text"
              name="name"
              className="w-full mt-1 p-3 border border-neutral-light rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none"
            />
            <ErrorMessage name="name" component="div" className="text-danger text-sm mt-1" />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-dark">
              Adresse email
            </label>
            <Field
              type="email"
              name="email"
              className="w-full mt-1 p-3 border border-neutral-light rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none"
            />
            <ErrorMessage name="email" component="div" className="text-danger text-sm mt-1" />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-neutral-dark">
              Votre message
            </label>
            <Field
              as="textarea"
              name="message"
              rows="4"
              className="w-full mt-1 p-3 border border-neutral-light rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none"
            />
            <ErrorMessage
              name="message"
              component="div"
              className="text-danger text-sm mt-1"
            />
          </div>

          {/* Bouton envoyer */}
          <motion.button
            type="submit"
            className="bg-primary text-center justify-center hover:bg-primary-light text-white py-3 px-6 rounded-lg shadow-lg flex items-center space-x-2 text-lg"
            whileHover="hover"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Envoi en cours..." :
                        <>
                            <span>Eonvoyer</span>
                            <motion.span
                                variants={{
                                    hover: { x: 5 },
                                    initial: { x: 0 },
                                }}
                                transition={{ type: "spring", stiffness: 200 }}
                                >
                                <FaArrowRight />
                            </motion.span>
                        </>
            }
          </motion.button>
        </Form>
      )}
    </Formik>
  </div>

  {/* Section Réseaux sociaux */}
  <div className="mt-10 text-center">
    <p className="text-neutral-dark mb-4">Ou contactez-nous via :</p>
    <div className="flex justify-center space-x-4">
      <motion.a
        href="https://facebook.com"
        className="text-primary text-3xl hover:text-primary-light transition-all duration-200"
        whileHover={{ scale: 1.2 }}
      >
        <FaFacebook />
      </motion.a>
      <motion.a
        href="https://twitter.com"
        className="text-primary text-3xl hover:text-primary-light transition-all duration-200"
        whileHover={{ scale: 1.2 }}
      >
        <FaTwitter />
      </motion.a>
      <motion.a
        href="https://instagram.com"
        className="text-primary text-3xl hover:text-primary-light transition-all duration-200"
        whileHover={{ scale: 1.2 }}
      >
        <FaInstagram />
      </motion.a>
    </div>
  </div>

  {/* Informations de contact */}
  <div className="mt-10 text-center">
    <p className="text-lg text-neutral-dark">
      <FaEnvelope className="inline-block text-primary mr-2" />
      support@isgi.com
    </p>
    <p className="text-lg text-neutral-dark mt-2">
      <FaPhoneAlt className="inline-block text-primary mr-2" />
      +212 6 12 34 56 78
    </p>
  </div>
</div>

  );
}

export default ContactSupportPage;
