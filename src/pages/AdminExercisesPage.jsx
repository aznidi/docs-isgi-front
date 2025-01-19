import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";
import { HashLoader } from "react-spinners";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import {axiosClient} from "../api/axios";
import Swal from "sweetalert2"; // Importer SweetAlert2
import { useNavigate } from "react-router-dom";

function AdminExercisesPage() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const itemsPerPage = 5; // Nombre d'exercices par page

  // Charger les exercices
  const fetchExercises = async (page = 0) => {
    setLoading(true);
    try {
      const response = await axiosClient.get(`/api/exercises?page=${page + 1}`);
      setExercises(response.data.data); // Les exercices actuels
      setPageCount(response.data.last_page); // Nombre total de pages
    } catch (error) {
      console.error("Erreur lors du chargement des exercices :", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExercises(currentPage);
  }, [currentPage]);

  // Supprimer un exercice avec SweetAlert
  const deleteExercise = async (id) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action supprimera définitivement cet exercice !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosClient.delete(`/api/exercises/${id}`);
          Swal.fire("Supprimé !", "L'exercice a été supprimé.", "success");
          fetchExercises(currentPage); // Recharger les exercices
        } catch (error) {
          Swal.fire(
            "Erreur",
            "Une erreur s'est produite lors de la suppression.",
            "error"
          );
        }
      }
    });
  };

  // Gestion du changement de page
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <motion.div
      className="p-6 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary-dark">Gestion des Exercices</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700"
          onClick={() => navigate('/admin/exercises/add')}
        >
          <FaPlus className="mr-2" /> Ajouter un Exercice
        </button>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <HashLoader color="#3b82f6" size={80} />
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md min-h-screen">
          {/* Tableau des exercices */}
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Titre</th>
                <th className="py-3 px-6 text-left">Niveau</th>
                <th className="py-3 px-6 text-left">Module</th>
                <th className="py-3 px-6 text-center">Image</th>
                <th className="py-3 px-6 text-center">Fichier</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {exercises.map((exercise) => (
                <tr
                  key={exercise.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{exercise.title}</td>
                  <td className="py-3 px-6 text-left capitalize">
                    {exercise.level}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {exercise.module.nomMod}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {exercise.image_path ? (
                      <img
                        src={`http://localhost:8000/storage/${exercise.image_path}`}
                        alt="Exercice"
                        className="w-20 h-20 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-500 italic">Pas d'image</span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {exercise.path ? (
                      <a
                        href={`http://localhost:8000/storage/${exercise.path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Voir le fichier
                      </a>
                    ) : (
                      <span className="text-gray-500 italic">Aucun fichier</span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="text-yellow-500 hover:text-yellow-600 mx-2"
                      onClick={() => navigate(`/admin/exercises/edit/${exercise.id}`)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600 mx-2"
                      onClick={() => deleteExercise(exercise.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-4">
            <ReactPaginate
              previousLabel={"← Précédent"}
              nextLabel={"Suivant →"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination flex space-x-2"}
              previousLinkClassName={"px-4 py-2 bg-gray-300 rounded"}
              nextLinkClassName={"px-4 py-2 bg-gray-300 rounded"}
              activeLinkClassName={"bg-blue-500 text-white px-4 py-2 rounded"}
              disabledLinkClassName={"opacity-50 pointer-events-none"}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default AdminExercisesPage;
