import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";
import { HashLoader } from "react-spinners";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../../../api/axios";

function AppEFM() {
  const [efms, setEfms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEfms(currentPage);
  }, [currentPage]);

  const fetchEfms = async (page) => {
    setLoading(true);
    try {
      const response = await axiosClient.get(`/api/exams/type/EFM?page=${page}`);
      setEfms(response.data.data); // Charger les données des examens
      setTotalPages(response.data.last_page); // Nombre total de pages
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Erreur lors du chargement des examens !",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible. Voulez-vous vraiment supprimer cet examen ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosClient.delete(`/api/exams/${id}`);
        setEfms(efms.filter((efm) => efm.id !== id)); // Mettre à jour la liste localement
        Swal.fire({
          icon: "success",
          title: "Supprimé !",
          text: "L'examen a été supprimé avec succès.",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Erreur lors de la suppression de l'examen.",
        });
      }
    }
  };

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Titre et bouton d'ajout */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-primary-dark">
          Liste des Examens (EFM)
        </h1>
        <motion.button
          className="bg-primary hover:bg-primary-light text-white py-3 px-6 rounded-lg shadow-lg flex items-center gap-2"
          whileHover={{ x: 2 }}
          onClick={() => navigate("/admin/exams/efm/add")}
        >
          <FaPlus />
          Ajouter un Examen
        </motion.button>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <HashLoader size={50} color="#2563EB" />
        </div>
      ) : (
        <>
          {/* Tableau */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Titre</th>
                  <th className="px-4 py-2 text-left">Module</th>
                  <th className="px-4 py-2 text-left">Année</th>
                  <th className="px-4 py-2 text-left">Niveau</th>
                  <th className="px-4 py-2 text-left">Durée (min)</th>
                  <th className="px-4 py-2 text-left">Statut</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {efms.map((efm) => (
                  <tr
                    key={efm.id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">{efm.id}</td>
                    <td className="px-4 py-2">{efm.title}</td>
                    <td className="px-4 py-2">
                      {efm.module ? efm.module.nomMod : "N/A"}
                    </td>
                    <td className="px-4 py-2">{efm.year}</td>
                    <td className="px-4 py-2">
                      {efm.difficulty_level ? efm.difficulty_level : "Non spécifié"}
                    </td>
                    <td className="px-4 py-2">{efm.duration || "N/A"}</td>
                    <td className="px-4 py-2">
                      {efm.status === "active"
                        ? "Actif"
                        : efm.status === "archived"
                        ? "Archivé"
                        : "Brouillon"}
                    </td>
                    <td className="px-4 py-2 flex justify-center gap-4">
                      <motion.button
                        className="text-yellow-500 hover:text-yellow-600 flex items-center gap-1"
                        whileHover={{ x: 2 }}
                        onClick={() => navigate(`/admin/exams/efm/edit/${efm.id}`)}
                      >
                        <FaEdit /> Éditer
                      </motion.button>
                      <motion.button
                        className="text-red-500 hover:text-red-600 flex items-center gap-1"
                        whileHover={{ x: 2 }}
                        onClick={() => handleDelete(efm.id)}
                      >
                        <FaTrash /> Supprimer
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <ReactPaginate
              previousLabel="← Précédent"
              nextLabel="Suivant →"
              pageCount={totalPages}
              onPageChange={(data) => setCurrentPage(data.selected + 1)}
              containerClassName="pagination flex space-x-2"
              previousLinkClassName="px-4 py-2 bg-gray-300 rounded"
              nextLinkClassName="px-4 py-2 bg-gray-300 rounded"
              activeLinkClassName="bg-primary text-white px-4 py-2 rounded"
              disabledLinkClassName="opacity-50 pointer-events-none"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default AppEFM;
