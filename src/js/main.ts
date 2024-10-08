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

  if (!list.length) {
    const pokemon = PokemonCard({
      name: "Not found",
      description: "Try another search",
      image:
        "https://i.pinimg.com/originals/f8/29/be/f829bed61f75627eea111dfde089fe2c.png",
    });
    dataRow.appendChild(pokemon);
  }

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
  const options = {
    keys: ["name", "abilities"],
    threshold: 0.5,
  };
  const fuse = new Fuse(data, options);

  // Perform search
  function performSearch() {
    if (!input) return data;

    const searched = fuse.search(input);
    return searched.map((obj) => obj.item);
  }

  // Create without the 'item' key from fuse search
  const filterdPokemon = performSearch();
  renderPokemon(filterdPokemon);
}

let debounceTimer;
inputEl.addEventListener("input", (e) => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    const currentInput = e.target.value.trim().toLowerCase();
    handleSearch(currentInput);
  }, 500);
});

// Add / to active search
document.addEventListener("keydown", (e) => {
  if (e.key === "/") {
    // Don't type
    e.preventDefault();
    inputEl.focus();
  }
});
