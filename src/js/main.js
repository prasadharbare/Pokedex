// Packages
import shuffle from "array-shuffle";
import Fuse from "fuse.js";

import data from "./data";
import PokemonCard from "./components/PokemonCard";

// === DOM Targeting ===
const inputEl = document.querySelector('input[type="text"]');
const dataRow = document.querySelector("[data-row]");

renderPokemon(shuffle(data));

// Give list, it will render them
function renderPokemon(list) {
  dataRow.textContent = "";

  list.forEach((pokemonObj) => {
    const pokemon = PokemonCard(pokemonObj);
    dataRow.appendChild(pokemon);
  });
}

// Will be invoked on search
function handleSearch(input) {
  // const filteredPokemon = data.filter((pokemonObj) => {
  //   return pokemonObj.name.toLowerCase().includes(input);
  // });

  // Create fuse object
  const fuse = new Fuse(data, {
    keys: ["name", "description"],
  });

  // Perform search
  const searched = fuse.search(input);

  // Create without the 'item' key from fuse search
  const filterdPokemon = searched.map((obj) => obj.item);
  renderPokemon(filterdPokemon);
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
