import React, { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";
function Support() {

    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchModules();
      }, []);

    const fetchModules = async () => {
        try {
            const response = await axiosClient.get("/api/support/requests");
            setRequests(response.data);
        } catch (error) {
            Swal.fire("Erreur", "Impossible de charger la liste des modules.", "error");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
          <div className="flex justify-center items-center min-h-screen">
            <HashLoader size={50} color="#4A90E2" />
          </div>
        );
      }

    return (
        <>
            <div>
                <p className="text-primary-dark mt-5 p-5 text-3xl font-poppins font-bold">La listes des messages</p>

                <hr />
                <table className="min-w-full text-sm text-left text-gray-500">
                          <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                            <tr>
                              <th className="px-6 py-3">#</th>
                              <th className="px-6 py-3">Nom</th>
                              <th className="px-6 py-3">Email</th>
                              <th className="px-6 py-3">Message</th>
                            </tr>
                          </thead>
                          <tbody>
                            {requests.map((request) => (
                              <tr key={request.id} className="border-b hover:bg-gray-100">

                                <td className="px-6 py-4">{request.id}</td>
                                <td className="px-6 py-4">{request.nom}</td>
                                <td className="px-6 py-4">{request.email || "N/A"}</td>
                                <td className="px-6 py-4">{request.message}</td>
                                
                              </tr>
                            ))}
                          </tbody>
                        </table>
            </div>
        </>
    )
}

export default Support
