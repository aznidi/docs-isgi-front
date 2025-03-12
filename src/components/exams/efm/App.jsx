import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { HashLoader } from "react-spinners";
import { MdErrorOutline } from "react-icons/md";
import ExamCard from "./ExamCard";
import { axiosClient } from "../../../api/axios";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ year: "Tous", module_id: "" });
  const [exams, setExams] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch modules on initial render
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axiosClient.get("/api/modules");
        setModules(response.data);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    fetchModules();
  }, []);

  // Fetch 10 random EFM exams on initial render
  useEffect(() => {
    const fetchRandomExams = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get("/api/exams/type/EFM");
        const randomExams = response.data.sort(() => 0.5 - Math.random()).slice(0, 10);
        setExams(randomExams);
      } catch (error) {
        console.error("Error fetching exams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomExams();
  }, []);

  // Handle search button click
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/api/exams", {
        params: {
          year: filters.year === "Tous" ? null : filters.year,
          module_id: filters.module_id,
          search: searchQuery.trim() !== "" ? searchQuery : null,
        },
      });
      setExams(response.data);
    } catch (error) {
      console.error("Error fetching exams:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen px-4 py-8 sm:px-8 flex flex-col items-center">
      {/* Search Section */}
      <motion.div
        className="flex flex-col items-center gap-6 w-full max-w-5xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-4 w-full sm:flex-row items-stretch sm:items-center">
          <input
            type="text"
            placeholder="Rechercher un efm..."
            className="w-full p-3 sm:flex-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-light"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <motion.button
            className="p-3 bg-primary-dark text-white rounded-lg flex items-center justify-center shadow-md hover:bg-primary focus:outline-none"
            whileHover={{ x: 2 }}
            onClick={handleSearch}
          >
            <FaSearch size={20} />
          </motion.button>
        </div>
        <div className="flex w-full gap-4">
          {/* Year Filter */}
          <motion.div className="w-1/2" whileHover={{ y: -2 }}>
            <select
              className="w-full p-3 bg-white border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-primary-light text-gray-700"
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            >
              <option value="Tous">Toutes les années</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </motion.div>

          {/* Module Filter */}
          <motion.div className="w-1/2" whileHover={{ y: -2 }}>
            <select
              className="w-full p-3 bg-white border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-primary-light text-gray-700"
              value={filters.module_id}
              onChange={(e) => setFilters({ ...filters, module_id: e.target.value })}
            >
              <option value="">Tous les modules</option>
              {modules.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.nomMod}
                </option>
              ))}
            </select>
          </motion.div>
        </div>
      </motion.div>

      {/* Exam Results */}
      {loading ? (
        <div className="flex justify-center mt-8">
          <HashLoader color="#2563EB" />
        </div>
      ) : exams.length > 0 ? (
        <div className="grid gap-6 mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
          {exams.map((exam) => (
            <motion.div key={exam.id} whileHover={{ y: -2 }}>
              <ExamCard exam={exam} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-8 text-center">
          <MdErrorOutline className="text-red-500 text-6xl mb-4" />
          <p className="text-gray-700 text-lg font-semibold">
            Oops, pas d'examens EFM trouvés.
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
