import data from "./data";
import shuffle from "array-shuffle";

// Component
import PokemonCard from "./components/PokemonCard";

// === DOM Targeting ===
const inputEl = document.querySelector('input[type="text"]');
console.log(inputEl);

renderPokemon(shuffle(data));

// Give list, it will render them
function renderPokemon(list) {
  list.forEach((pokemonObj) => {
    PokemonCard(pokemonObj);
  });
}

// Add / to active search
document.addEventListener("keyup", (e) => {
  if (e.key === "/") {
    inputEl.focus();
  }
});
