import React, { useEffect, useState } from "react";
import { axiosClient } from "../api/axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";

function ModulesPage() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await axiosClient.get("/api/modules");
      setModules(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des modules :", error);
      Swal.fire("Erreur", "Impossible de charger la liste des modules.", "error");
    } finally {
      setLoading(false);
    }
  };

  const addModule = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Ajouter un Module",
      html: `
        <input id="swal-input-codeMod" class="swal2-input" placeholder="Code Module">
        <input id="swal-input-nomMod" class="swal2-input" placeholder="Nom Module">
        <textarea id="swal-input-descriptionMod" class="swal2-input" placeholder="Description"></textarea>
        <input id="swal-input-anneeMod" class="swal2-input" placeholder="Année (ex: 2025)">
        <input id="swal-input-imageMod" type="file" class="swal2-file">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Ajouter",
      cancelButtonText: "Annuler",
      preConfirm: () => {
        const codeMod = document.getElementById("swal-input-codeMod").value;
        const nomMod = document.getElementById("swal-input-nomMod").value;
        const descriptionMod = document.getElementById("swal-input-descriptionMod").value;
        const anneeMod = document.getElementById("swal-input-anneeMod").value;
        const imageMod = document.getElementById("swal-input-imageMod").files[0];

        if (!codeMod || !nomMod || !anneeMod) {
          Swal.showValidationMessage("Les champs Code, Nom et Année sont obligatoires !");
          return null;
        }

        const formData = new FormData();
        formData.append("codeMod", codeMod);
        formData.append("nomMod", nomMod);
        formData.append("descriptionMod", descriptionMod);
        formData.append("anneeMod", anneeMod);
        if (imageMod) formData.append("imageMod", imageMod);

        return formData;
      },
    });

    if (formValues) {
      try {
        await axiosClient.post("/api/modules", formValues, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire("Succès", "Le module a été ajouté avec succès.", "success");
        fetchModules();
      } catch (error) {
        Swal.fire("Erreur", "Impossible d'ajouter le module.", "error");
      }
    }
  };

  const editModule = async (module) => {
    const { value: formValues } = await Swal.fire({
      title: "Modifier le Module",
      html: `
        <input id="swal-input-codeMod" class="swal2-input" placeholder="Code Module" value="${module.codeMod}">
        <input id="swal-input-nomMod" class="swal2-input" placeholder="Nom Module" value="${module.nomMod}">
        <textarea id="swal-input-descriptionMod" class="swal2-input" placeholder="Description">${module.descriptionMod}</textarea>
        <input id="swal-input-anneeMod" class="swal2-input" placeholder="Année (ex: 2025)" value="${module.anneeMod}">
        <input id="swal-input-imageMod" type="file" class="swal2-file">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Mettre à jour",
      cancelButtonText: "Annuler",
      preConfirm: () => {
        const codeMod = document.getElementById("swal-input-codeMod").value;
        const nomMod = document.getElementById("swal-input-nomMod").value;
        const descriptionMod = document.getElementById("swal-input-descriptionMod").value;
        const anneeMod = document.getElementById("swal-input-anneeMod").value;
        const imageMod = document.getElementById("swal-input-imageMod").files[0];

        if (!codeMod || !nomMod || !anneeMod) {
          Swal.showValidationMessage("Les champs Code, Nom et Année sont obligatoires !");
          return null;
        }

        const formData = new FormData();
        formData.append("codeMod", codeMod);
        formData.append("nomMod", nomMod);
        formData.append("descriptionMod", descriptionMod);
        formData.append("anneeMod", anneeMod);
        if (imageMod) formData.append("imageMod", imageMod);

        return formData;
      },
    });

    if (formValues) {
      try {
        await axiosClient.post(`/api/modules/${module.id}?_method=PUT`, formValues, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire("Succès", "Le module a été mis à jour avec succès.", "success");
        fetchModules();
      } catch (error) {
        Swal.fire("Erreur", "Impossible de mettre à jour le module.", "error");
      }
    }
  };

  const deleteModule = async (moduleId) => {
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
          await axiosClient.delete(`/api/modules/${moduleId}`);
          Swal.fire("Supprimé !", "Le module a été supprimé avec succès.", "success");
          fetchModules();
        } catch (error) {
          Swal.fire("Erreur", "Impossible de supprimer le module.", "error");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color="#4A90E2" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Gestion des Modules</h1>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
          onClick={addModule}
        >
          <FaPlus className="mr-2" />
          Ajouter un Module
        </button>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Code</th>
              <th className="px-6 py-3">Nom</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Année</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module) => (
              <tr key={module.id} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4">
                  {module.imageMod ? (
                    <img
                      src={`${module.imageMod}`}
                      alt={module.nomMod}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    "Aucune image"
                  )}
                </td>
                <td className="px-6 py-4">{module.codeMod}</td>
                <td className="px-6 py-4">{module.nomMod}</td>
                <td className="px-6 py-4">{module.descriptionMod || "N/A"}</td>
                <td className="px-6 py-4">{module.anneeMod}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-3"
                    onClick={() => editModule(module)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteModule(module.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ModulesPage;
