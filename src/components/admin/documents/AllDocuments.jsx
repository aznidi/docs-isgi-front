import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { axiosClient } from "../../../api/axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function AllDocuments() {
  const [documents, setDocuments] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0); // Nombre total de pages
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments(currentPage);
    fetchModules();
  }, [currentPage]);

  const fetchDocuments = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axiosClient.get(`/api/admin/documents?page=${page}`);
      setDocuments(response.data.data);
      setPageCount(response.data.last_page); // Définir le nombre total de pages
    } catch (error) {
      console.error("Erreur lors du chargement des documents :", error);
      Swal.fire("Erreur", "Impossible de charger les documents.", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchModules = async () => {
    try {
      const response = await axiosClient.get("/api/modules");
      setModules(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des modules :", error);
      Swal.fire("Erreur", "Impossible de charger les modules.", "error");
    }
  };

  const deleteDocument = async (documentId) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosClient.delete(`/api/admin/documents/${documentId}`);
          Swal.fire("Supprimé !", "Le document a été supprimé avec succès.", "success");
          fetchDocuments(currentPage);
        } catch (error) {
          Swal.fire("Erreur", "Impossible de supprimer le document.", "error");
        }
      }
    });
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1); // Changer la page actuelle
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader size={50} color="#4A90E2" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Gestion des Documents</h1>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
          onClick={() => navigate("/admin/documents/add")}
        >
          <FaPlus className="mr-2" />
          Ajouter un Document
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg min-h-screen">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-6 py-3">Nom</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Libellé</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Module</th>
              <th className="px-6 py-3">Path</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4">{doc.nomDoc}</td>
                <td className="px-6 py-4">{doc.type}</td>
                <td className="px-6 py-4">{doc.libelleDoc}</td>
                <td className="px-6 py-4">{doc.descriptionDoc}</td>
                <td className="px-6 py-4">{doc.module?.nomMod}</td>
                <td className="px-6 py-4">
                  {doc.type === "video" ? (
                    <a href={doc.path} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      Voir Vidéo
                    </a>
                  ) : (
                    <a href={doc.path} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      Télécharger
                    </a>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-3"
                    onClick={() => navigate(`/admin/documents/edit/${doc.id}`)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteDocument(doc.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6">
        <ReactPaginate
          previousLabel={"Précédent"}
          nextLabel={"Suivant"}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="flex items-center space-x-2"
          pageClassName="px-4 py-2 border border-gray-300 rounded cursor-pointer hover:bg-blue-500 hover:text-white"
          activeClassName="bg-blue-500 text-white"
          previousClassName="px-4 py-2 border border-gray-300 rounded cursor-pointer hover:bg-blue-500 hover:text-white"
          nextClassName="px-4 py-2 border border-gray-300 rounded cursor-pointer hover:bg-blue-500 hover:text-white"
          breakClassName="px-4 py-2 border border-gray-300 rounded cursor-default"
        />
      </div>
    </div>
  );
}

export default AllDocuments;
