import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { axiosClient } from "../../api/axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaClock,
  FaCommentAlt,
  FaPaperPlane,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { AuthContext } from "../../context/AuthContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { HashLoader } from "react-spinners";

function DocComments({ comments, documentId }) {
  const { user } = useContext(AuthContext);

  const { register, handleSubmit, reset } = useForm();
  const [allComments, setAllComments] = useState(comments);
  const [loading, setLoading] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [loadingComments, setLoadingComments] = useState(false);

  // Simuler un chargement initial pour les commentaires
  const renderSkeletonComments = () =>
    Array(3)
      .fill()
      .map((_, index) => (
        <div
          key={index}
          className="bg-gray-100 p-3 rounded-lg shadow-sm flex items-start space-x-3"
        >
          <Skeleton circle={true} height={48} width={48} />
          <div className="flex-1">
            <Skeleton height={15} width="30%" />
            <Skeleton height={15} width="50%" className="mt-1" />
            <Skeleton height={50} className="mt-2" />
          </div>
        </div>
      ));

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (editingComment) {
        await updateComment(data);
        return;
      }

      const response = await axiosClient.post(`/api/documents/${documentId}/comments`, {
        content: data.comment,
      });

      const newComment = {
        ...response.data.comment,
        user: {
          name: user?.name || "Utilisateur inconnu",
          email: user?.email || "Email inconnu",
          profile_image: user?.profile_image || null,
        },
      };

      setAllComments([...allComments, newComment]);
      reset();
      Swal.fire("Succès", "Commentaire ajouté avec succès.", "success");
    } catch (error) {
      Swal.fire("Erreur", "Impossible d'ajouter le commentaire.", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    setLoading(true);
    try {
      await axiosClient.delete(`/api/documents/comments/${commentId}`);
      setAllComments(allComments.filter((comment) => comment.id !== commentId));
      setEditingComment(null);
      reset();
      Swal.fire("Succès", "Commentaire supprimé avec succès.", "success");
    } catch (error) {
      Swal.fire("Erreur", "Impossible de supprimer le commentaire.", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateComment = async (data) => {
    setLoading(true);
    try {
      const response = await axiosClient.put(`/api/documents/comments/${editingComment.id}`, {
        content: data.comment,
      });

      const updatedComments = allComments.map((comment) =>
        comment.id === editingComment.id ? { ...response.data.comment, user: comment.user } : comment
      );

      setAllComments(updatedComments);
      setEditingComment(null);
      reset();
      Swal.fire("Succès", "Commentaire modifié avec succès.", "success");
    } catch (error) {
      Swal.fire("Erreur", "Impossible de modifier le commentaire.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-white p-4 rounded-lg shadow-md space-y-4 w-full mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <FaCommentAlt className="text-primary text-xl" />
        <h2 className="text-xl font-bold text-primary-dark">Commentaires</h2>
      </div>

      {/* Comment List */}
      <div
        className="space-y-4 overflow-y-auto max-h-80 border-t border-gray-300 pt-2"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#4A90E2 #E5E5E5" }}
      >
        {loadingComments
          ? renderSkeletonComments()
          : allComments.length > 0
          ? allComments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-100 p-3 rounded-lg shadow-sm flex items-start space-x-3"
              >
                {/* User Image */}
                {comment.user?.profile_image ? (
                  <img
                    src={
                      comment.user.profile_image.startsWith("http")
                        ? comment.user.profile_image
                        : `http://localhost:8000/storage/${comment.user.profile_image}`
                    }
                    alt={comment.user.name}
                    className="w-12 h-12 rounded-full object-cover shadow"
                  />
                ) : (
                  <FaUserCircle className="text-gray-400 w-12 h-12" />
                )}

                {/* Comment Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800">{comment.user?.name || "Utilisateur inconnu"}</p>
                      <p className="text-gray-500 text-xs truncate">{comment.user?.email || "Email inconnu"}</p>
                    </div>
                    <div className="flex items-center text-gray-500 text-xs">
                      <FaClock className="mr-1" />
                      <span>
                        {formatDistanceToNow(new Date(comment.created_at), {
                          addSuffix: true,
                          locale: fr,
                        })}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-1 text-sm">{comment.content}</p>

                  {/* Actions */}
                  {user?.id === comment.user_id && (
                    <div className="flex gap-2 mt-2">
                      <button
                        className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
                        onClick={() => {
                          setEditingComment(comment);
                          reset({ comment: comment.content });
                        }}
                      >
                        <FaEdit /> Modifier
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                        onClick={() => deleteComment(comment.id)}
                      >
                        <FaTrash /> Supprimer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          : !loadingComments && (
              <p className="text-gray-500 italic text-center">
                Aucun commentaire pour ce document. Soyez le premier à en ajouter !
              </p>
            )}
      </div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <textarea
          {...register("comment", { required: "Veuillez écrire un commentaire." })}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          rows={3}
          placeholder="Ajoutez votre commentaire ici..."
        ></textarea>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary-dark transition text-sm"
          disabled={loading}
        >
          {loading ? <HashLoader size={16} color="#FFF" /> : <FaPaperPlane />}
          {editingComment ? "Modifier le commentaire" : "Ajouter un commentaire"}
        </button>
      </motion.form>
    </motion.div>
  );
}

export default DocComments;
