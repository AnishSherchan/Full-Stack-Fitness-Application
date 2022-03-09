import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: true,
      text: "Body progress comparison",
    },
  },
};

let usersmetric = [];
const index = () => {
  const getUsermetric = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/dashboard/userbodymetric",
        {
          method: "get",
          headers: {
            token: localStorage.token,
          },
        }
      );
      const parseRes = await response.json();
      for (var i in parseRes) {
        usersmetric.push(parseRes[i]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getUsermetric();
  }, []);
  const labels = [
    "Neck size",
    "Shoulder size",
    "forearm size",
    "Biceps size",
    "Hip size",
    "Thigh size",
    "Claves size",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Average Size inch",
        data: [14, 43, 9, 13.5, 35, 21, 15],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "User's size inch",
        data: usersmetric,
        borderColor: "rgb(96,127,232)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div className="p-4 shadow-lg shadow-blue-300 bg-white rounded-3xl">
      <Bar width="800px" height="400px" options={options} data={data} />
    </div>
  );
};

export default index;
