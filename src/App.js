import axios from "axios";
import React, { useState, useEffect } from "react";
import Pokemon from "./components/Pokemon";
import "./App.css";

import logo from "./assets/logo.png";

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [page, setPage] = useState("https://pokeapi.co/api/v2/pokemon");

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`${page}`);
        console.log(result.data);
        setPokemonData(result.data);
      } catch (error) {}
    }

    fetchData();
  }, [page]);

  return (
    <>
      <nav>
        <button
          type="button"
          disabled={pokemonData && !pokemonData.previous}
          onClick={() => setPage(pokemonData.previous)}
        >
          vorige
        </button>
        <img className="logo" src={logo} alt="pokemon logo" />
        <button
          type="button"
          disabled={pokemonData && !pokemonData.next}
          onClick={() => setPage(pokemonData.next)}
        >
          volgende
        </button>
      </nav>
      <div className="container">
        <div className="pokemon-container">
          {pokemonData &&
            pokemonData.results.map((pokemoncard) => {
              return <Pokemon pokemonurl={pokemoncard.url} />;
            })}
        </div>
      </div>
    </>
  );
}

export default App;
