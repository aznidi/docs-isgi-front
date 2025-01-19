import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { axiosClient } from "../../../api/axios";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";

function EditDocument() {
  const { id } = useParams(); // Récupérer l'id du document depuis l'URL
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true); // Indicateur pour le chargement
  const [updating, setUpdating] = useState(false); // Indicateur pour la mise à jour
  const type = watch("type"); // Surveiller le type pour conditionner les champs

  useEffect(() => {
    fetchModules();
    fetchDocument();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await axiosClient.get("/api/modules");
      setModules(response.data);
    } catch (error) {
      Swal.fire("Erreur", "Impossible de charger les modules.", "error");
    }
  };

  const fetchDocument = async () => {
    try {
      const response = await axiosClient.get(`/api/admin/documents/${id}`);
      const document = response.data;

      // Pré-remplir les champs avec les données existantes
      setValue("codeDoc", document.codeDoc);
      setValue("nomDoc", document.nomDoc);
      setValue("libelleDoc", document.libelleDoc);
      setValue("descriptionDoc", document.descriptionDoc);
      setValue("content", document.content);
      setValue("type", document.type);
      setValue("module_id", document.module_id);

      if (document.type === "video") {
        setValue("url", document.path);
      }

      setLoading(false);
    } catch (error) {
      Swal.fire("Erreur", "Impossible de charger les données du document.", "error");
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setUpdating(true);
    const formData = new FormData();
    formData.append("codeDoc", data.codeDoc);
    formData.append("nomDoc", data.nomDoc);
    formData.append("libelleDoc", data.libelleDoc);
    formData.append("descriptionDoc", data.descriptionDoc);
    formData.append("type", data.type);
    formData.append("module_id", data.module_id);
    formData.append("content", data.content);

    if (data.type === "video") {
      formData.append("url", data.url);
    } else if (data.path?.length > 0) {
      formData.append("path", data.path[0]); // Ajouter le fichier seulement s'il est modifié
    }

    try {
      await axiosClient.post(`/api/admin/documents/${id}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire({
        title: "Succès",
        text: "Document mis à jour avec succès.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/admin/documents"); // Rediriger après succès
      });
    } catch (error) {
      Swal.fire(
        "Erreur",
        error.response?.data?.message || "Impossible de mettre à jour le document.",
        "error"
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color="#4A90E2" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg animate-fade-in">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Modifier un Document
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Code Document
          </label>
          <input
            type="text"
            {...register("codeDoc", { required: "Code du document est obligatoire" })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-red-500 text-sm">{errors.codeDoc?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nom Document
          </label>
          <input
            type="text"
            {...register("nomDoc", { required: "Nom du document est obligatoire" })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-red-500 text-sm">{errors.nomDoc?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Libellé Document
          </label>
          <input
            type="text"
            {...register("libelleDoc", { required: "Libellé du document est obligatoire" })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-red-500 text-sm">{errors.libelleDoc?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description Document
          </label>
          <textarea
            {...register("descriptionDoc", { required: "Description du document est obligatoire" })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
          <p className="text-red-500 text-sm">{errors.descriptionDoc?.message}</p>
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contenue de Document
          </label>
          <textarea
            {...register("content")}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
                {...register("type", { required: "Type est obligatoire" })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="">Sélectionnez un type</option>
                <option value="video">Vidéo</option>
                <option value="tp">TP</option>
                <option value="efm">Examen de fin de module (EFM)</option>
                <option value="control">Contrôle</option>
                <option value="cours">Cours</option>
            </select>
            <p className="text-red-500 text-sm">{errors.type?.message}</p>
        </div>

        {type === "video" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              URL Vidéo
            </label>
            <input
              type="url"
              {...register("url", { required: "L'URL est obligatoire pour les vidéos" })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.url?.message}</p>
          </div>
        )}

        {type !== "video" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fichier (Laissez vide pour conserver l'existant)
            </label>
            <input
              type="file"
              {...register("path")}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Module</label>
          <select
            {...register("module_id", { required: "Module est obligatoire" })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Sélectionnez un module</option>
            {modules.map((module) => (
              <option key={module.id} value={module.id}>
                {module.nomMod}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm">{errors.module_id?.message}</p>
        </div>

        <button
          type="submit"
          disabled={updating}
          className={`w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring focus:ring-blue-300 transition ${
            updating && "opacity-50 cursor-not-allowed"
          }`}
        >
          {updating ? <ClipLoader size={20} color="#ffffff" /> : "Mettre à jour Document"}
        </button>
      </form>
    </div>
  );
}

export default EditDocument;
