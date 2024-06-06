import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, LinearScale } from "chart.js/auto";

const BarChart = ({ hydropower, termica, solar, eolica }) => {
  const [select, setSelect] = useState("Hidroelectricas");

  const handleSelect = (event) => {
    setSelect(event.target.value);
  };

  const selectedData = () => {
    switch (select) {
      case "Hidroelectricas":
        return hydropower;
      case "Termicas":
        return termica;
      case "Solares":
        return solar;
      case "Eolicas":
        return eolica;
      default:
        return [];
    }
  };

  const label = selectedData()?.map((plant) => plant.name);
  const data = selectedData()?.map((plant) => plant.value);

  return (
    <div>
      <select value={select} onChange={handleSelect}>
        <option value="Hidroelectricas">Hidroeléctricas</option>
        <option value="Termicas">Térmicas</option>
        <option value="Solares">Solares</option>
        <option value="Eolicas">Eólicas</option>
      </select>
      <Bar
        data={{
          labels: label,
          datasets: [
            {
              label: select,
              data: data,
              backgroundColor: "#4caf50",
              borderColor: "#4caf50",
              borderWidth: 1,
            },
          ],
        }}
        options={{
          scales: {
            y: {
              type: "linear",
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
