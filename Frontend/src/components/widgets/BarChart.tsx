import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChart: React.FC<{ labels: string[]; columnData: number[] }> = ({ labels, columnData }) => {
  // const labels = ["January", "February", "March", "April", "May", "June", "July"];

  console.log(labels, columnData);
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: "Expenses",
        data: columnData,
        backgroundColor: ["rgb(153, 102, 255)"],
        borderColor: ["rgb(153, 102, 255)"],
        borderWidth: 1,
      },
    ],
  });

  React.useEffect(() => {
    if (labels.length && columnData?.length) {
      setData({
        labels,
        datasets: [
          {
            label: "Expenses",
            data: columnData,
            backgroundColor: ["rgb(153, 102, 255)"],
            borderColor: ["rgb(153, 102, 255)"],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [labels, columnData]);

  return <Bar data={data} />;
};
