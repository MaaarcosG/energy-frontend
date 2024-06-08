import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, LinearScale } from "chart.js/auto";
// TODO: https://apexcharts.com/react-chart-demos/column-charts/basic/
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
    <div className="p-4">
      <select
        className="py-2 px-7 bg-[#4caf50] hover:bg-blue-700 text-white rounded-lg uppercase transition-all flex items-center mb-4"
        value={select}
        onChange={handleSelect}
      >
        <option value="Hidroelectricas">Hidroeléctricas</option>
        <option value="Termicas">Térmicas</option>
        <option value="Solares">Solares</option>
        <option value="Eolicas">Eólicas</option>
      </select>
      <div className="w-full">
        {/* border-dashed border border-zinc-500 rounded-lg */}
        <div className="p-4">
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
            height={50}
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
      </div>
    </div>
  );
};

export default BarChart;
