/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchData } from "../lib/features/api/apiSlice";
import {
  ARRAY_HIDROELECTRICS,
  ARRAY_TERMINC,
  ARRAY_SOLAR,
  ARRAY_EOLICA,
  URL_API_DATA,
} from "../constants";
// components utils
import Spinner from "../components/Spinner";
import PieGraphic from "../components/PieGraphic";
import BarChart from "../components/BarChart";

const HomePage = () => {
  const dispatch = useDispatch();
  const id = 1717630710216;
  const { data, loading, error } = useSelector((state) => state.api);
  // plants data
  const [hydropowerData, setHydropowerData] = useState(null);
  const [termicaData, setTermicaData] = useState(null);
  const [solarData, setSolarData] = useState(null);
  const [eolicaData, setEolicaData] = useState(null);

  const refreshData = () => {
    dispatch(fetchData(`${URL_API_DATA}${id}`));
  };

  useEffect(() => {
    // Solo se llama a refreshData cuando dispatch cambia
    refreshData();
  }, [dispatch]);

  // data parsing
  const filterPlants = (plants, typeSetPlant) => {
    return plants
      ?.filter((plant) => typeSetPlant.includes(plant.name))
      .map((plant) => ({ ...plant, value: parseFloat(plant.value) }));
  };

  useEffect(() => {
    if (data) {
      const dataParse = JSON.parse(data);
      const plants = dataParse?.unit;

      const hydropowerPlants = filterPlants(plants, ARRAY_HIDROELECTRICS);
      const termicPlant = filterPlants(plants, ARRAY_TERMINC);
      const solarPlant = filterPlants(plants, ARRAY_SOLAR);
      const eolicaPlant = filterPlants(plants, ARRAY_EOLICA);

      // set data
      setHydropowerData(hydropowerPlants);
      setTermicaData(termicPlant);
      setSolarData(solarPlant);
      setEolicaData(eolicaPlant);
    }
  }, [data]); // Se ejecuta solo cuando los datos cambian

  return (
    <div className="p-4">
      {!loading ? (
        <div className="p-4 border-dashed border border-zinc-500 rounded-lg">
          <div className="mt-8">
            <h2 className="text-xl font-bold uppercase">
              Porcentaje por tipo de generación
            </h2>
            <PieGraphic
              hydropower={hydropowerData}
              termica={termicaData}
              solar={solarData}
              eolica={eolicaData}
            />
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold uppercase">
              Porcentaje de generación por generador dado un tipo de planta
              (input)
            </h2>
            <BarChart
              hydropower={hydropowerData}
              termica={termicaData}
              solar={solarData}
              eolica={eolicaData}
            />
          </div>
          <div>
            <button
              className="mt-6 bg-blue-500 hover:bg-blue-700 text-white py-2 px-7 rounded-lg w-full uppercase transition-all"
              onClick={refreshData}
            >
              Actualizar Informacion
            </button>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default HomePage;
