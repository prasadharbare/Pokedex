import data from "./data";
import shuffle from "array-shuffle";

// Component
import PokemonCard from "./components/PokemonCard";

// === DOM Targeting ===
const inputEl = document.querySelector('input[type="text"]');

renderPokemon(shuffle(data));

// Give list, it will render them
function renderPokemon(list) {
  list.forEach((pokemonObj) => {
    PokemonCard(pokemonObj);
  });
}

function handleSearch(input) {
  console.log(input);
}

inputEl.addEventListener("input", (e) => {
  handleSearch(e.target.value);
});

// Add / to active search
document.addEventListener("keydown", (e) => {
  if (e.key === "/") {
    // Don't type
    e.preventDefault();
    inputEl.focus();
  }
});
