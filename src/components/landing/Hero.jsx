import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import BlurText from "../ui/BlurText";
import CountUp from "../CountUp";
import { useNavigate } from "react-router-dom";
import { axiosClient } from '../../api/axios';
import { HashLoader } from "react-spinners";
import { AuthContext } from "../../context/AuthContext";

export default function Hero() {
    const [statistics, setStatistics] = useState(null); // Initialisez à null pour gérer le loader
    const [loading, setLoading] = useState(true); // Loader pour attendre les données
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext); // Consommer le contexte

    useEffect(() => {
        const fetchGeneral = async () => {
            try {
                setLoading(true); // Active le loader
                const response = await axiosClient.get('/api/public/statistics/general');
                setStatistics(response.data); // Stocke les statistiques directement
            } catch (err) {
                //
            } finally {
                setLoading(false); // Désactive le loader une fois terminé
            }
        };
        fetchGeneral();
    }, []);

    // Afficher un loader pendant que les données sont récupérées
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <HashLoader size={50} color="#4A90E2" />
            </div>
        );
    }

    return (
        <div
            className="flex flex-col md:flex-row items-center justify-between
        min-h-screen px-6 md:px-12 lg:px-24"
        >
            {/* Contenu principal */}
            <motion.div
                className="flex flex-col space-y-6 md:w-1/2 text-center md:text-center mt-24"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
            >
                {/* Titre principal avec animation */}
                <BlurText
                    text="Votre Apprentissage, Simplifié !"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="text-3xl sm:text-4xl md:text-5xl md:text-center font-extrabold text-primary-dark leading-tight"
                />

                {/* Description */}
                <p className="text-neutral text-sm md:text-base text-start leading-relaxed">
                    Accédez à une vaste collection de documents : cours, TP, examens, et bien plus encore.
                    Transformez votre auto-formation avec ISGIDocs.
                </p>

                {/* Boutons d'action et lien */}
                <div className="flex flex-col md:flex-row justify-center items-center md:justify-start space-y-4 md:space-y-0 md:space-x-4">
                    <motion.button
                        className="bg-primary hover:bg-primary-light text-white py-3 px-6 rounded-lg shadow-lg flex items-center space-x-2 text-lg"
                        whileHover="hover"
                        onClick={() => navigate("/documents")}
                    >
                        <span>Explorer les Documents</span>
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
                    <motion.p
                        className="text-secondary hover:underline decoration-2 cursor-pointer decoration-secondary-light text-lg"
                        whileHover={{ x: 2 }}
                        onClick={() => navigate("/login")}
                    >
                        Se connecter
                    </motion.p>
                </div>

                {/* Cartes de statistiques */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    {[
                        { stat: statistics.documentsCount || 0, label: "Cours disponibles" },
                        { stat: statistics.usersCount || 0, label: "Utilisateurs finaux" },
                        { stat: statistics.modulesCount || 0, label: "Modules finalisés" },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="bg-white shadow-top rounded-lg p-4 flex flex-col items-center "
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                        >
                            <CountUp
                                from={0}
                                to={item.stat}
                                separator=","
                                direction="up"
                                duration={1}
                                className="text-xl font-bold text-primary-dark"
                            />
                            <p className="text-sm text-neutral">{item.label}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Image à droite */}
            <motion.div
                className="hidden md:block md:w-1/2 mb-6 md:mb-0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
            >
                <img
                    src="hero.svg"
                    alt="Illustration ISGIDocs"
                    className="w-full max-w-xs sm:max-w-md md:max-w-lg"
                />
            </motion.div>
        </div>
    );
}
