import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ProfilePage from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import GuestLayout from "../layouts/GuestLayout";
import Layout from "../layouts/Layout";
import AuthLayout from "../layouts/AuthLayout";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import RequireAdmin from "../components/RequireAdmin";
import RequireAuth from "../components/auth/RequireAuth"; // Pour protéger les routes des utilisateurs authentifiés
import UsersPage from "../pages/UsersPage";
import ProfileAdmin from "../pages/ProfileAdmin";
import SettingsPage from "../pages/SettingsPage";
import ModulesPage from "../pages/ModulesPage";
import ModulesPageUser from "../pages/ModulesPageUser";
import ContactSupportPage from "../pages/ContactSupportPage";
import Founders from "../components/landing/Founders";
import SingleModulePage from "../pages/SingleModulePage";
import DocumentsAdminPage from "../pages/DocumentsAdminPage";
import AddDocument from "../components/admin/documents/AddDocument";
import EditDocument from "../components/admin/documents/EditDocument";
import SingleDocumentPage from "../pages/SingleDocumentPage";
import GoogleCallback from "../pages/GoogleCallback";

// Exercices
import ExercisesPage from "../pages/ExercisesPage"; // Liste des exercices pour les utilisateurs
import SingleExercisePage from "../pages/SingleExercisePage"; // Détail d'un exercice
import AdminExercisesPage from "../pages/AdminExercisesPage"; // Liste des exercices pour les administrateurs
import AddExercise from "../components/admin/exercices/AddExercise"; // Ajouter un exercice
import EditExercise from "../components/admin/exercices/EditExercise"; // Modifier un exercice

// Tarifs
import PricingPage from "../pages/PricingPage";
import SinglePlanPricing from "../components/pricing/SinglePlanPricing";
import DocumentsUserPage from "../pages/DocumentsUserPage";

// Routes
export const HOME_ROUTE = "/";
export const LOGIN_ROUTE = "/login";

export const router = createBrowserRouter([
  // Routes publiques
  {
    element: <Layout />, // Public Layout
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/accueil", element: <HomePage /> },
      { path: "/contact-support", element: <ContactSupportPage /> },
      { path: "/founders", element: <Founders /> },
      { path: "/pricing", element: <PricingPage /> },
      { path: "/pricing/:plan", element: <SinglePlanPricing /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  // Routes pour les invités
  {
    element: <GuestLayout />, // Layout pour les invités
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/sign-up", element: <SignupPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/password-reset/:token", element: <ResetPasswordPage /> },
      { path: "/login/callback", element: <GoogleCallback /> },
      { path: "/contact-support", element: <ContactSupportPage /> },
      { path: "/founders", element: <Founders /> },
      { path: "/pricing", element: <PricingPage /> },
      { path: "/pricing/:plan", element: <SinglePlanPricing /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  // Routes pour les utilisateurs connectés
{
    element: <AuthLayout />, // Layout pour les utilisateurs connectés
    children: [
      {
        path: "/modules",
        element: (
          <RequireAuth>
            <ModulesPageUser />
          </RequireAuth>
        ),
      },
      {
        path: "/modules/:id",
        element: (
          <RequireAuth>
            <SingleModulePage />
          </RequireAuth>
        ),
      },
      {
        path: "/profile",
        element: (
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        ),
      },
      {
        path: "/favorites",
        element: (
          <RequireAuth>
            <p>Favoris</p>
          </RequireAuth>
        ),
      },
      {
        path: "/documents",
        element: (
          <RequireAuth>
            <DocumentsUserPage />
          </RequireAuth>
        ),
      },
      {
        path: "/documents/:id",
        element: (
          <RequireAuth>
            <SingleDocumentPage />
          </RequireAuth>
        ),
      },
      {
        path: "/exercises",
        element: (
          <RequireAuth>
            <ExercisesPage />
          </RequireAuth>
        ),
      },
      {
        path: "/exercices/:id",
        element: (
          <RequireAuth>
            <SingleExercisePage />
          </RequireAuth>
        ),
      },
      { path: "/contact-support", element: <ContactSupportPage /> },
      { path: "/founders", element: <Founders /> },
      { path: "/pricing", element: <PricingPage /> },
      { path: "/pricing/:plan", element: <SinglePlanPricing /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },

  // Routes pour l'administration
  {
    element: (
      <RequireAdmin>
        <AdminLayout />
      </RequireAdmin>
    ),
    children: [
      { path: "/admin/dashboard", element: <AdminDashboardPage /> },
      { path: "/admin/users", element: <UsersPage /> },
      { path: "/admin/profile", element: <ProfileAdmin /> },
      { path: "/admin/settings", element: <SettingsPage /> },
      { path: "/admin/modules", element: <ModulesPage /> },
      { path: "/admin/documents", element: <DocumentsAdminPage /> },
      { path: "/admin/documents/add", element: <AddDocument /> },
      { path: "/admin/documents/edit/:id", element: <EditDocument /> },
      { path: "/admin/exercises", element: <AdminExercisesPage /> }, // Gestion des exercices
      { path: "/admin/exercises/add", element: <AddExercise /> },
      { path: "/admin/exercises/edit/:id", element: <EditExercise /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
