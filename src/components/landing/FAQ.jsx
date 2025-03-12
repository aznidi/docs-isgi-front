import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import { motion } from "framer-motion";
import faqSVG from "../../assets/faq.svg";

function FAQ() {
  return (
    <div className="container mx-auto py-16 px-6 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">
      {/* Texte et FAQ */}
      <motion.div
        className="lg:w-1/2 w-full text-center lg:text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-6">
          Questions <span className="underline">Fréquentes</span>
        </h2>
        <p className="text-gray-700 text-lg mb-8 leading-relaxed">
          Vous avez des questions ? Consultez notre FAQ pour en savoir plus sur l'application ISGIDocs.
        </p>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold font-grotesk">
              Quelle est l'utilité d'ISGIDocs ?
            </AccordionTrigger>
            <AccordionContent>
              ISGIDocs vous permet d'accéder facilement à des cours, vidéos, PDF, TP, examens de fin de module et bien plus encore pour une auto-formation optimale.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold font-grotesk">
              Comment puis-je accéder aux documents ?
            </AccordionTrigger>
            <AccordionContent>
              Une fois inscrit, connectez-vous à votre compte et explorez les modules pour accéder aux documents classés par type.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-semibold font-grotesk">
              Est-ce que les documents sont gratuits ?
            </AccordionTrigger>
            <AccordionContent>
              Oui, tous les documents sont accessibles gratuitement pour les étudiants inscrits.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-semibold font-grotesk">
              Comment puis-je contacter le support ?
            </AccordionTrigger>
            <AccordionContent>
              Vous pouvez nous contacter via la section "Contact-Support" ou directement sur nos réseaux sociaux.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>

      {/* Image SVG */}
      <motion.div
        className="lg:w-1/2 w-full justify-center lg:block hidden"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={faqSVG}
          alt="FAQ Illustration"
          className="w-full lg:w-3/4"
        />
      </motion.div>
    </div>
  );
}

export default FAQ;
