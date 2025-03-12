import React, { useState, useRef, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useTranslations from "../hooks/useTranslations";
import { ClipLoader } from "react-spinners"; // Loader pour le bouton
import { AuthContext } from "../context/AuthContext"; // Import du contexte
import logo from "../assets/logo-ofppt.png";
import Lien from "../ui/Lien";
import Button from "../ui/Button";

function Navbar() {
    // 1. Consommer le contexte
    const { isLoggedIn, logout, user, loading } = useContext(AuthContext);

    // 2. Gérer les états du composant
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [locale, setLocale] = useState("fr");

    // 3. Utilisation de useTranslations
    const { translations, loading: translationsLoading, error } = useTranslations(locale);

    // 4. Références et navigation
    const menuRef = useRef();
    const navigate = useNavigate();

    // 5. Effets pour charger les traductions (debug)
    useEffect(() => {
        if (!translationsLoading && translations) {
            console.log("Translations loaded:", translations);
        }
    }, [translationsLoading, translations]);

    // 6. Effet pour gérer le clic extérieur du menu mobile
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 7. Gérer le changement de langue
    const handleChangeLanguage = (lang) => {
        setLocale(lang);
    };

    // 8. Gérer la déconnexion
    const handleLogout = async () => {
        Swal.fire({
            title: "Êtes-vous sûr ?",
            text: "Vous allez être déconnecté.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Oui, déconnectez-moi",
            cancelButtonText: "Annuler",
            customClass: {
                confirmButton: "bg-red-600 text-white px-4 py-2 rounded",
                cancelButton: "bg-gray-300 text-gray-700 px-4 py-2 rounded",
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                setIsLoggingOut(true); // Afficher le loader
                await logout(); // Appeler la fonction du contexte
                Swal.fire("Déconnexion réussie !", "Vous êtes déconnecté.", "success");
                setIsLoggingOut(false); // Cacher le loader
                navigate("/login");
            }
        });
    };

    // 9. Variants pour l'animation Framer Motion
    const menuVariants = {
        hidden: { x: "-100%", opacity: 0 },
        visible: { x: 0, opacity: 1 },
    };


    return (
        <header className="fixed w-full z-50 bg-white/30 backdrop-blur-lg shadow-sm transition-all duration-500">
        <nav className="container mx-auto flex items-center justify-between p-4">
            {/* Logo */}
            <div
            className="text-2xl font-bold text-primary cursor-pointer"
            onClick={() => navigate("/")}
            >
                <img src={logo} alt="ISGIDocs" className="w-12 h-12" />
            </div>

            {/* Hamburger Icon or Close Button */}
            <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-primary focus:outline-none"
            aria-label={isMobileMenuOpen ? "Close Mobile Menu" : "Open Mobile Menu"}
            >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
                />
            </svg>
            </button>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center space-x-6 text-primary">
            {[translations.navigation?.home || "Accueil", translations.navigation?.modules || "Modules", translations.navigation?.examens || "Examens", "Exercises"].map((item, index) => (
                <li key={item} className="group relative">
                    {item.toLowerCase() === "examens" ? (
                    <div className="relative inline-block">
                        {/* Main Link */}
                        <Lien
                        href="#"
                        variant="neutral"
                        onClick={(e) => e.preventDefault()}
                        className="cursor-pointer"
                        >
                        Examens
                        </Lien>
                        {/* Dropdown Menu */}
                        <div className="hidden group-hover:block absolute left-0 mt-2 w-48 bg-white shadow-md rounded-md z-50">
                        <ul>
                            {["Controles","EFM", "EFF"].map((subItem) => (
                            <li key={subItem}>
                                <Lien
                                href={`/examens/${subItem.toLowerCase().replace(" ", "-")}`}
                                variant="neutral"
                                className="block px-4 py-2 text-sm text-primary-light hover:text-primary-dark transition-all"
                                >
                                {subItem}
                                </Lien>
                            </li>
                            ))}
                        </ul>
                        </div>
                    </div>
                    ) : (
                    <Lien
                        href={`/${item.toLowerCase()}`}
                        variant="neutral"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                        {item}
                    </Lien>
                    )}
                    {/* Underline Animation */}
                    <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-300"></span>
                </li>
                ))}

            {isLoggedIn ? (
                <>
                <li className="group relative">
                    {loading ? (
                        <ClipLoader size={20} color="primary" />
                    ) : user.role === "admin" ? (
                        <Lien href="/admin/dashboard" variant="neutral">
                            Admin
                        </Lien>
                    ) : (
                        <Lien href="/profile" variant="neutral">
                            Mon Profil
                        </Lien>
                    )}
                </li>
                <li>
                    <Button
                    variant="secondary"
                    size="md"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    >
                    {isLoggingOut ? <ClipLoader size={20} color="white" /> : translations.auth?.logout || "Déconnexion"}
                    </Button>
                </li>
                </>
            ) : (
                <>
                <li>
                    <Lien href="/login" variant="neutral">
                    Login
                    </Lien>
                </li>
                <li>
                    <Button
                    variant="primary"
                    size="md"
                    onClick={() => navigate("/sign-up")}
                    >
                    S'inscrire
                    </Button>
                </li>
                </>
            )}
            </ul>
        </nav>

        {/* Mobile Menu */}
            {isMobileMenuOpen && (
            <motion.div
                ref={menuRef}
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="fixed top-0 left-0 w-3/4 h-full min-h-screen bg-white z-40 flex flex-col items-start px-6 py-8"
            >
                {/* Close Button */}
                <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 right-4 text-primary hover:text-red-500 focus:outline-none transition-colors duration-300"
                aria-label="Close Mobile Menu"
                >
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-8 h-8"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 90 }}
                    exit={{ rotate: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                    />
                </motion.svg>
                </button>

                {/* Navigation Links */}
                <ul className="flex flex-col mt-20 space-y-6 w-full bg-white">
                    {["Accueil", "Modules", "examens", "Exercises"].map((item) => (
                        <li key={item} className="group relative">
                        {item.toLowerCase() === "examens" ? (
                            <div>
                            <Lien
                                href="#"
                                variant="neutral"
                                onClick={(e) => e.preventDefault()}
                                className="cursor-pointer flex justify-between items-center"
                            >
                                Examens
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                                </svg>
                            </Lien>
                            {/* Dropdown Menu */}
                            <ul className="mt-2 space-y-2">
                                {["Controles", "EFM", "EFF"].map((subItem) => (
                                <li key={subItem}>
                                    <Lien
                                    href={`/examens/${subItem.toLowerCase().replace(" ", "-")}`}
                                    variant="neutral"
                                    className="block px-4 py-2 text-sm text-primary hover:text-primary-dark transition-all"
                                    >
                                    {subItem}
                                    </Lien>
                                </li>
                                ))}
                            </ul>
                            </div>
                        ) : (
                            <Lien
                            href={`/${item.toLowerCase()}`}
                            variant="neutral"
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            >
                            {item}
                            </Lien>
                        )}
                        </li>
                    ))}
                {isLoggedIn ? (
                    <>
                    <li>
                        <Lien href="/profile" variant="neutral">
                        Mon Profil
                        </Lien>
                    </li>
                    <li className="mt-4 w-full">
                        <Button
                        variant="secondary"
                        size="lg"
                        className="w-full hover:bg-secondary-light transition-colors duration-300"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        >
                        {isLoggingOut ? <ClipLoader size={20} color="white" /> : "Déconnexion"}
                        </Button>
                    </li>
                    </>
                ) : (
                    <>
                    <li>
                        <Lien href="/login" variant="neutral">
                        Login
                        </Lien>
                    </li>
                    <li className="mt-4 w-full">
                        <Button
                        variant="primary"
                        size="lg"
                        className="w-full hover:bg-primary-light transition-colors duration-300"
                        onClick={() => navigate("/sign-up")}
                        >
                        S'inscrire
                        </Button>
                    </li>
                    </>
                )}
                </ul>
            </motion.div>
            )}

        </header>
    );
}

export default Navbar;
