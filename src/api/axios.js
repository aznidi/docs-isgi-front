import axios from "axios";

export const axiosClient = axios.create({
    baseURL: "http://localhost:8000", // L'URL de votre backend Laravel
    withCredentials: true, // Inclure les cookies pour Sanctum
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
});

// Ajouter le token CSRF à chaque requête
axiosClient.interceptors.request.use((config) => {
    const xsrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];

    if (xsrfToken) {
      config.headers["X-XSRF-TOKEN"] = decodeURIComponent(xsrfToken);
    }
    return config;
  });
