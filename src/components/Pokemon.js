import axios from "axios";
import React, { useState, useEffect } from "react";

const Pokemon = ({ pokemonurl }) => {
  const [pokemon, setPokemon] = useState(null);
  console.log(pokemonurl);
  useEffect(() => {
    async function fetchPokemon() {
      try {
        const result = await axios.get(`${pokemonurl}`);
        setPokemon(result.data);
        console.log(result.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPokemon();
  }, [pokemonurl]);

  function typeColor(type) {
    if (type === "fire") {
      return <li className="fire">{type}</li>;
    } else if (type === "grass" || type === "poison" || type === "bug") {
      return <li className="grass">{type}</li>;
    } else if (type === "water" || type === "ice") {
      return <li className="water">{type}</li>;
    } else if (type === "electric") {
      return <li className="electric">{type}</li>;
    } else if (type === "psychic" || type === "ghost") {
      return <li className="psychic">{type}</li>;
    } else {
      return <li className="others">{type}</li>;
    }
  }

  return (
    <div className="pokemon-card">
      {pokemon && (
        <>
          <h2>{pokemon.name}</h2>
          <img
            className="pokemon-card__sprite"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          ></img>
          <ul className="pokemon-card__types">
            {pokemon.types.map((type) => {
              return typeColor(type.type.name);
            })}
          </ul>
          <p>Moves: {pokemon.moves.length}</p>
          <p>Weight: {pokemon.weight}</p>
          <ul>
            {pokemon.abilities.map((ability) => {
              return <li className="ability">{ability.ability.name}</li>;
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default Pokemon;
