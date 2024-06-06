"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieGraphic = ({ hydropower, termica, solar, eolica }) => {
  // get sum of value collections
  const sumValues = (plants) => {
    return plants ? plants.reduce((acc, plant) => acc + plant.value, 0) : 0;
  };

  // get sums
  const hydropowerValue = sumValues(hydropower);
  const termicaValue = sumValues(termica);
  const solarValue = sumValues(solar);
  const eolicaValue = sumValues(eolica);

  // get sum total
  const totalValue = hydropowerValue + termicaValue + solarValue + eolicaValue;

  // get percentage to fixed 0.2
  const percentage = (value) => {
    return totalValue ? ((value / totalValue) * 100).toFixed(2) : "0.00";
  };

  const data = {
    labels: ["Hidroeléctricas", "Térmicas", "Solares", "Eólicas"],
    datasets: [
      {
        label: "Generación",
        data: [hydropowerValue, termicaValue, solarValue, eolicaValue],
        backgroundColor: ["#4caf50", "#f44336", "#ffeb3b", "#2196f3"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ display: "flex", width: "600px", height: "300px" }}>
      <div style={{ width: "50%" }}>
        <Pie data={data} width={300} height={300} />
      </div>
      <div style={{ width: "50%" }}>
        <div className="flex flex-col">
          <p>Hidroeléctricas: {percentage(hydropowerValue)}%</p>
          <p>Térmicas: {percentage(termicaValue)}%</p>
          <p>Solares: {percentage(solarValue)}%</p>
          <p>Eólicas: {percentage(eolicaValue)}%</p>
        </div>
      </div>
    </div>
  );
};

export default PieGraphic;
