import data from "./data";

import shuffle from "array-shuffle";

import PokemonCard from "./components/PokemonCard";

renderPokemon(shuffle(data));

// Give list, it will render them
function renderPokemon(list) {
  list.forEach((pokemonObj) => {
    PokemonCard(pokemonObj);
  });
}
