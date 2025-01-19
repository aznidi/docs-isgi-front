import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ModuleCard({ module }) {
    const navigate = useNavigate();
  return (
    <motion.div
                key={module.id}
                className="p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {/* Image du module */}
                  <div className="w-full h-32 lg:h-40 bg-gray-100 flex items-center justify-center">
                    {module.imageMod ? (
                      <img
                        src={module.imageMod}
                        alt={module.nomMod}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-500 text-sm">Aucune image</span>
                    )}
                  </div>

                  {/* Contenu du module */}
                  <div className="p-4 lg:p-6 text-left">
                    <h3 className="text-lg lg:text-xl font-bold text-primary-dark mb-2">
                      {module.nomMod}
                    </h3>
                    <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-4">
                      {module.descriptionMod}
                    </p>

                    {/* Section Année avec icône */}
                    <div className="flex items-center text-gray-600 mb-4">
                      <FaCalendarAlt className="text-primary mr-2" />
                      <span className="text-sm font-medium">{module.anneeMod}</span>
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex flex-col md:flex-row gap-3">
                      <motion.button
                        className="bg-primary-dark w-full text-white py-2 px-4 rounded-lg
                        flex items-center justify-center gap-2 hover:bg-primary text-sm lg:text-base"
                        whileHover={{ x: 5 }}
                        onClick={() =>{
                            navigate(`/modules/${module.nomMod.toLowerCase().replace(/\s+/g, "-")}-${module.id}`, {
                              state: module,
                            });
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                      >
                        Voir plus
                        <FaArrowRight />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
  );
}

export default ModuleCard;
