import React, { useEffect, useState } from "react";
import { axiosClient } from "../api/axios";
import { FaTrash, FaEdit, FaPlus, FaSortUp, FaSortDown } from "react-icons/fa";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [sortOrder, setSortOrder] = useState({ column: "name", order: "asc" });
  const [editingUser, setEditingUser] = useState(null); // État pour l'édition

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, filterRole, sortOrder]);

  const fetchUsers = async (page = 1) => {
    setLoadingPage(true);
    setTimeout(async () => {
      try {
        const response = await axiosClient.get(`/api/admin/users?page=${page}`, {
          params: { role: filterRole, sort: sortOrder.column, order: sortOrder.order },
        });
        setUsers(response.data.data);
        setTotalPages(response.data.last_page);
      } catch (error) {
        Swal.fire("Erreur", "Impossible de charger la liste des utilisateurs.", "error");
      } finally {
        setLoading(false);
        setLoadingPage(false);
      }
    }, 1000); // Délai de 1 seconde
  };

  const deleteUser = async (userId) => {
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
          await axiosClient.delete(`/api/admin/user/${userId}`);
          Swal.fire("Supprimé !", "L'utilisateur a été supprimé avec succès.", "success");
          fetchUsers(currentPage);
        } catch (error) {
          Swal.fire("Erreur", "Impossible de supprimer l'utilisateur.", "error");
        }
      }
    });
  };

  const addUser = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Ajouter un nouvel utilisateur",
      html: `
        <input id="swal-input-name" class="swal2-input" placeholder="Nom">
        <input id="swal-input-email" type="email" class="swal2-input" placeholder="Email">
        <input id="swal-input-role" class="swal2-input" placeholder="Rôle (admin/user)">
        <input id="swal-input-password" type="password" class="swal2-input" placeholder="Mot de passe">
      `,
      showCancelButton: true,
      preConfirm: () => {
        const name = document.getElementById("swal-input-name").value;
        const email = document.getElementById("swal-input-email").value;
        const role = document.getElementById("swal-input-role").value;
        const password = document.getElementById("swal-input-password").value;
        if (!name || !email || !role || !password) {
          Swal.showValidationMessage("Tous les champs sont obligatoires !");
          return null;
        }
        return { name, email, role, password };
      },
    });

    if (formValues) {
      try {
        await axiosClient.post("/api/admin/user", formValues);
        Swal.fire("Succès", "L'utilisateur a été ajouté avec succès.", "success");
        fetchUsers(currentPage);
      } catch (error) {
        Swal.fire("Erreur", "Impossible d'ajouter l'utilisateur.", "error");
      }
    }
  };

  const editUser = async (user) => {
    const { value: formValues } = await Swal.fire({
      title: "Modifier l'utilisateur",
      html: `
        <input id="swal-input-name" class="swal2-input" placeholder="Nom" value="${user.name}">
        <input id="swal-input-email" type="email" class="swal2-input" placeholder="Email" value="${user.email}">
        <input id="swal-input-role" class="swal2-input" placeholder="Rôle (admin/user)" value="${user.role}">
      `,
      showCancelButton: true,
      preConfirm: () => {
        const name = document.getElementById("swal-input-name").value;
        const email = document.getElementById("swal-input-email").value;
        const role = document.getElementById("swal-input-role").value;
        if (!name || !email || !role) {
          Swal.showValidationMessage("Tous les champs sont obligatoires !");
          return null;
        }
        return { name, email, role };
      },
    });

    if (formValues) {
      try {
        await axiosClient.put(`/api/admin/user/${user.id}`, formValues);
        Swal.fire("Succès", "L'utilisateur a été mis à jour avec succès.", "success");
        fetchUsers(currentPage);
      } catch (error) {
        Swal.fire("Erreur", "Impossible de modifier l'utilisateur.", "error");
      }
    }
  };

  const handleSort = (column) => {
    setSortOrder((prev) => ({
      column,
      order: prev.column === column && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color="#4A90E2" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Gestion des Utilisateurs</h1>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg"
        />
        <button
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 flex items-center"
          onClick={addUser}
        >
          <FaPlus className="mr-2" /> Ajouter
        </button>
      </div>

      {loadingPage ? (
        <div className="flex justify-center items-center py-10 min-h-screen">
          <ClipLoader size={30} color="#4A90E2" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto bg-white shadow-md rounded-lg"
        >
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort("name")}>
                  Nom {sortOrder.column === "name" && (sortOrder.order === "asc" ? <FaSortUp /> : <FaSortDown />)}
                </th>
                <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort("email")}>
                  Email {sortOrder.column === "email" && (sortOrder.order === "asc" ? <FaSortUp /> : <FaSortDown />)}
                </th>
                <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort("role")}>
                  Rôle {sortOrder.column === "role" && (sortOrder.order === "asc" ? <FaSortUp /> : <FaSortDown />)}
                </th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  className="border-b hover:bg-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-3"
                      onClick={() => editUser(user)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => deleteUser(user.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      <ReactPaginate
        previousLabel={"Précédent"}
        nextLabel={"Suivant"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={(data) => setCurrentPage(data.selected + 1)}
        containerClassName={"pagination flex justify-center items-center mt-4"}
        activeClassName={"bg-blue-500 text-white px-3 py-1 rounded"}
        previousClassName={"px-3 py-1 bg-gray-200 text-gray-600 rounded"}
        nextClassName={"px-3 py-1 bg-gray-200 text-gray-600 rounded"}
        pageClassName={"px-3 py-1 mx-1 bg-gray-100 text-gray-600 rounded"}
        breakClassName={"px-3 py-1 mx-1 bg-gray-100 text-gray-600 rounded"}
      />
    </div>
  );
}

export default UsersPage;
