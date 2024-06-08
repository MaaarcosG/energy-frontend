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
import { GrUpdate } from "react-icons/gr";

const HomePage = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.api);
  // const id = 1717630710216
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

  // generate random id length 13 if not add 0 at the end
  const generateRandomId = () => {
    let timestamp = Date.now().toString();
    if (timestamp.length > 13) {
      timestamp = timestamp.slice(0, 13);
    } else if (timestamp.length < 13) {
      const padding = "0".repeat(13 - timestamp.length);
      timestamp = timestamp + padding;
    }
    return timestamp;
  };

  const id = generateRandomId();

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
        // border-dashed border border-zinc-500 rounded-lg
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold uppercase">
              Centro Nacional de Despachos
            </h1>
            <button
              className="py-2 px-7 bg-[#4caf50] hover:bg-blue-700 text-white rounded-lg uppercase transition-all flex items-center"
              onClick={refreshData}
            >
              <GrUpdate className="mr-2" />
              Actualizar
            </button>
          </div>
          {/* flex flex-col justify-center items-center */}
          <div className="mt-8">
            <h2 className="text-xl font-bold uppercase mb-4">
              Porcentaje por tipo de generación
            </h2>
            <PieGraphic
              hydropower={hydropowerData}
              termica={termicaData}
              solar={solarData}
              eolica={eolicaData}
            />
          </div>
          {/* border-dashed border border-zinc-500 rounded-lg */}
          <div className="mt-8">
            <h2 className="text-xl font-bold uppercase mb-4">
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
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default HomePage;
