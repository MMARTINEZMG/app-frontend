import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import DetailsPopup from "../components/DetailsPopup";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/");
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(API_URL, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(response.data);
          setFilteredData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [navigate]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedItem(null);
  };

  const tableHeaders = [
    "ID",
    "Name",
    "Email",
    "Phone",
    "Priority Level",
    "Description",
    "Type",
    "Created At",
  ];

  const barChartData = {
    labels: ["Technical", "Billing", "Account"],
    datasets: [
      {
        label: "Request Types Count",
        data: ["technical", "billing", "account"].map(
          (type) => data.filter((item) => item.type === type).length
        ),
        backgroundColor: ["#4CAF50", "#2196F3", "#FF9800"],
        borderColor: ["#E0E0E0", "#E0E0E0", "#E0E0E0"],
      },
    ],
  };

  const pieChartData = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        data: ["low", "medium", "high"].map(
          (level) => data.filter((item) => item.priorityLevel === level).length
        ),
        backgroundColor: ["#4CAF50", "#2196F3", "#F44336"],
        borderColor: ["#E0E0E0", "#E0E0E0", "#E0E0E0"],
        borderWidth: 2,
      },
    ],
  };

  const handleChartClick = (filter, value) => {
    const filtered = data.filter((item) => item[filter] === value);
    setFilteredData(filtered);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const truncateText = (text, length = 50) => {
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  const highPriorityCount = data.filter(
    (item) => item.priorityLevel === "high"
  ).length;
  const latestCase = data.reduce((latest, current) => {
    return new Date(current.createdAt) > new Date(latest.createdAt)
      ? current
      : latest;
  }, data[0] || {});

  return (
    <div className="min-h-screen bg-[#1a1b1f] text-white">
      <nav className="bg-[#15171a] text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-xl font-bold text-[#90e048] pr-8">
            TechLife Solutions
          </a>
          <button
            onClick={handleLogout}
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="p-10">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Support Request Dashboard
        </h1>
        {loading ? (
          <p className="text-center text-lg text-gray-300">Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-[#2a2b30] p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">High Priority Cases</h2>
                <p className="text-2xl font-bold mt-2 text-[#F44336]">
                  {highPriorityCount}
                </p>
              </div>
              <div className="bg-[#2a2b30] p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">Latest Case</h2>
                <p className="text-md mt-2">
                  {latestCase.name || "N/A"} - {latestCase.type || "N/A"}
                </p>
              </div>
              <div className="bg-[#2a2b30] p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">Total Cases</h2>
                <p className="text-2xl font-bold mt-2 text-[#4CAF50]">
                  {data.length}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto bg-[#15171a] p-4 rounded-lg shadow-md">
              <table className="table-auto w-full text-left text-white">
                <thead>
                  <tr className="bg-[#4CAF50] text-black">
                    {tableHeaders.map((header) => (
                      <th
                        key={header}
                        className="px-4 py-2 font-semibold uppercase"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#1a1b1f] border-b border-gray-700"
                      onClick={() => handleRowClick(item)}
                    >
                      <td className="px-4 py-2">{item.id}</td>
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.email}</td>
                      <td className="px-4 py-2">{item.phone}</td>
                      <td className="px-4 py-2">{item.priorityLevel}</td>
                      <td className="px-4 py-2">
                        {truncateText(item.description, 50)}
                      </td>
                      <td className="px-4 py-2">{item.type}</td>
                      <td className="px-4 py-2">
                        {new Date(item.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-center">
              <nav>
                <ul className="inline-flex space-x-2">
                  {pageNumbers.map((number) => (
                    <li key={number}>
                      <button
                        onClick={() => paginate(number)}
                        className={`px-4 py-2 rounded-md ${
                          currentPage === number ? "bg-[#4CAF50]" : ""
                        }`}
                      >
                        {number}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                className="bg-[#15171a] p-4 rounded-lg shadow-md flex flex-col justify-between"
                style={{ height: "250px" }}
              >
                <h2 className="text-lg font-semibold mb-4 text-center">
                  Request Types Distribution
                </h2>
                <div style={{ flexGrow: 1 }}>
                  <Bar
                    data={barChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      onClick: (_, elements) => {
                        if (elements.length > 0) {
                          const datasetIndex = elements[0].datasetIndex;
                          const index = elements[0].index;
                          const type = barChartData.labels[index];
                          handleChartClick("type", type.toLowerCase());
                        }
                      },
                      plugins: {
                        legend: {
                          labels: {
                            color: "white",
                          },
                        },
                      },
                      scales: {
                        x: {
                          ticks: { color: "white" },
                        },
                        y: {
                          ticks: { color: "white" },
                        },
                      },
                    }}
                    height={0}
                  />
                </div>
              </div>

              <div
                className="bg-[#15171a] p-4 rounded-lg shadow-md flex flex-col justify-between"
                style={{ height: "250px" }}
              >
                <h2 className="text-lg font-semibold mb-4 text-center">
                  Priority Levels Distribution
                </h2>
                <div style={{ flexGrow: 1 }}>
                  <Pie
                    data={pieChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      onClick: (_, elements) => {
                        if (elements.length > 0) {
                          const index = elements[0].index;
                          const level = pieChartData.labels[index];
                          handleChartClick(
                            "priorityLevel",
                            level.toLowerCase()
                          );
                        }
                      },
                      plugins: {
                        legend: {
                          labels: {
                            color: "white",
                          },
                        },
                      },
                    }}
                    height={0}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        {isPopupOpen && selectedItem && (
          <DetailsPopup data={selectedItem} onClose={handleClosePopup} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
