"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const fetchData = async () => {
  const id = 1717680755510;
  const res = await fetch(`https://backend-energy.onrender.com/api/data?id=${id}`);
  const data = await res.json();
  return data;
};

const HomePage = () => {
  const [pokemon, setPokemon] = useState(null);
  const [randomId, setRandomId] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      console.log(result);
      setPokemon(result);
    };
    getData();
  }, [randomId]);

  const generateRandomNumber = () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    setRandomId(randomId);
  };

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{pokemon.name}</h1>
      {/* <Image
        src={pokemon.sprites.front_default}
        width={200}
        height={200}
        alt={pokemon.name}
      /> */}
      
      <br />
      <button onClick={generateRandomNumber}>Generate Random Pokémon</button>
    </div>
  );
};

export default HomePage;
