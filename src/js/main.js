import data from "./data";
import shuffle from "array-shuffle";

// Component
import PokemonCard from "./components/PokemonCard";

// === DOM Targeting ===
const inputEl = document.querySelector('input[type="text"]');
const dataRow = document.querySelector("[data-row]");

renderPokemon(shuffle(data));

// Give list, it will render them
function renderPokemon(list) {
  dataRow.textContent = "";

  list.forEach((pokemonObj) => {
    PokemonCard(pokemonObj);
  });
}

function handleSearch(input) {
  const filteredPokemon = data.filter((pokemonObj) =>
    pokemonObj.name.toLowerCase().includes(input)
  );

  renderPokemon(filteredPokemon);
}

inputEl.addEventListener("input", (e) => {
  const currentInput = e.target.value.trim().toLowerCase();
  handleSearch(currentInput);
});

// Add / to active search
document.addEventListener("keydown", (e) => {
  if (e.key === "/") {
    // Don't type
    e.preventDefault();
    inputEl.focus();
  }
});
