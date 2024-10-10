// Packages
import shuffle from "array-shuffle";
import Fuse from "fuse.js";
import "../scss/main.scss"
import { Pokemon } from "./components/interfaces/Pokemon";

import data from "./data";
import PokemonCard from "./components/PokemonCard";

interface Pokemon{
  id: number;
  name: string;
  image: string;
  description: string;
  link: string;
  abilities: string[];
}

// === DOM Targeting ===
const inputEl = document.querySelector('input[type="text"]');
const dataRow = document.querySelector("[data-row]")as HTMLDivElement

renderPokemon(shuffle(data));

// Give list, it will render them
function renderPokemon(list):void{
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

const fragment = document.createDocumentFragment();
console.log(fragment);


// Will be invoked on search
function handleSearch(input:String) {
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
  function performSearch():Pokemon {
    if (!input) return data;

    const searched = fuse.search(input);
    return searched.map((obj) => obj.item);
  }

  // Create without the 'item' key from fuse search
  const filterdPokemon = performSearch();
  renderPokemon(filterdPokemon);
}

let debounceTimer:ReturnType<typeof setTimeout>;
inputEl.addEventListener("input", (e) => {
  clearTimeout(debounceTimer);
  
  const target = e.target as HTMLInputElement
  debounceTimer = setTimeout(() => {
    const currentInput = target.value.trim().toLowerCase();
    handleSearch(currentInput);
  }, 500);
});

// Add / to active search
document.addEventListener("keydown", (e:KeyboardEvent) => {
  if (e.key === "/") {
    // Don't type
    e.preventDefault();
    inputEl.focus();
  }
});


