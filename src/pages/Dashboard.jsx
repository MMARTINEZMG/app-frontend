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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const tableHeaders = [
    "ID",
    "Name",
    "Email",
    "Phone",
    "Priority Level",
    "Description",
    "Created At",
  ];

  const barChartData = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: "Priority Levels Count",
        data: ["Low", "Medium", "High"].map(
          (level) => data.filter((item) => item.priorityLevel === level).length
        ),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderColor: ["#D7D9DD", "#D7D9DD", "#D7D9DD"],
      },
    ],
  };

  const pieChartData = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        data: ["Low", "Medium", "High"].map(
          (level) => data.filter((item) => item.priorityLevel === level).length
        ),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderColor: ["#d1d5db", "#d1d5db", "#d1d5db"],
        borderWidth: 2,
      },
    ],
  };

  const handleChartClick = (priorityLevel) => {
    const filtered = data.filter(
      (item) => item.priorityLevel === priorityLevel
    );
    setFilteredData(filtered);
  };

  return (
    <div className="min-h-screen bg-[#1a1b1f] text-white">
      <nav className="bg-[#15171a] text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Dashboard</div>
          <a
            href="/login"
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Logout
          </a>
        </div>
      </nav>

      <main className="p-10">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Welcome to your Dashboard!
        </h1>
        {loading ? (
          <p className="text-center text-lg text-gray-300">Loading...</p>
        ) : (
          <>
            <div className="overflow-x-auto bg-[#15171a] p-4 rounded-lg shadow-md">
              <table className="table-auto w-full text-left text-white">
                <thead>
                  <tr className="bg-[#A8FF53] text-black">
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
                  {filteredData.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#1a1b1f] border-b border-gray-700"
                    >
                      <td className="px-4 py-2">{item.id}</td>
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.email}</td>
                      <td className="px-4 py-2">{item.phone}</td>
                      <td className="px-4 py-2">{item.priorityLevel}</td>
                      <td className="px-4 py-2">{item.description}</td>
                      <td className="px-4 py-2">
                        {new Date(item.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-bold text-center mb-4">
                Priority Level Distribution
              </h2>
              <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
                <div className="w-full lg:w-1/2 border-b border-gray-700">
                  <Bar
                    className="border-b border-gray-500"
                    data={barChartData}
                    options={{
                      onClick: (_, elements) => {
                        if (elements.length > 0) {
                          const index = elements[0].index;
                          handleChartClick(barChartData.labels[index]);
                        }
                      },
                    }}
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <Pie
                    data={pieChartData}
                    options={{
                      onClick: (_, elements) => {
                        if (elements.length > 0) {
                          const index = elements[0].index;
                          handleChartClick(pieChartData.labels[index]);
                        }
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
