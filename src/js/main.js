import data from "./data";
import PokemonCard from "./components/PokemonCard";

// data.forEach(Pokemon);

renderPokemon(data);

// Give list, it will render them
function renderPokemon(list) {
  list.forEach((pokemonObj) => {
    PokemonCard(pokemonObj);
  });
}
