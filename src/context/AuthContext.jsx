import React, { createContext, useState, useEffect } from "react";
import { axiosClient } from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // État de chargement initialisé à true

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      const tokenTimestamp = localStorage.getItem("token_timestamp");
      const sessionLifetime = 120 * 60 * 1000; // 120 minutes en ms

      if (token && tokenTimestamp) {
        const timeElapsed = Date.now() - parseInt(tokenTimestamp, 10);

        if (timeElapsed < sessionLifetime) {
          axiosClient.defaults.headers.Authorization = `Bearer ${token}`;
          await fetchUserProfile();
          setIsLoggedIn(true);
        } else {
          logout(); // Déconnecter automatiquement si la session est expirée
        }
      } else {
        // Si pas de token ou de timestamp, désactiver le loader
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true); // Début du chargement
    try {
      const response = await axiosClient.get("/api/user");
      setUser(response.data); // Stocker les données utilisateur
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
      logout(); // Déconnecter si une erreur se produit
    } finally {
      setLoading(false); // Désactiver le loader après la tentative
    }
  };

  const login = async (token) => {
    const timestamp = Date.now(); // Enregistrer l'heure de connexion
    localStorage.setItem("token", token);
    localStorage.setItem("token_timestamp", timestamp.toString());
    axiosClient.defaults.headers.Authorization = `Bearer ${token}`;
    setIsLoggedIn(true);
    await fetchUserProfile(); // Charger les données utilisateur
  };

  const logout = async () => {
    try {
      await axiosClient.get("/sanctum/csrf-cookie"); // Appeler le CSRF cookie Laravel
      await axiosClient.post("/logout"); // Appeler la route Laravel pour la déconnexion
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    } finally {
      // Nettoyer les données locales et réinitialiser les états
      localStorage.removeItem("token");
      localStorage.removeItem("token_timestamp");
      delete axiosClient.defaults.headers.Authorization;
      setIsLoggedIn(false);
      setUser(null);
      setLoading(false); // S'assurer que le loader est désactivé après déconnexion
    }
  };

  // Vérification périodique de l'expiration de la session
  useEffect(() => {
    const interval = setInterval(() => {
      const tokenTimestamp = localStorage.getItem("token_timestamp");
      const sessionLifetime = 120 * 60 * 1000;

      if (tokenTimestamp) {
        const timeElapsed = Date.now() - parseInt(tokenTimestamp, 10);

        if (timeElapsed >= sessionLifetime) {
          logout(); // Déconnecter si le temps de session est écoulé
        }
      }
    }, 60000); // Vérification toutes les 60 secondes

    return () => clearInterval(interval); // Nettoyer l'intervalle lorsque le composant est démonté
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
