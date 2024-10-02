import data from "./data";

// === DOM Selection ===
const dataRow = document.querySelector("[data-row]");
console.log(dataRow);

for (let pokemon of data) {
  const div = document.createElement("div");
  div.classList.add("col");
  div.innerHTML = `<div class="card">
    <img
        src="${pokemon.image}"
        class="card-img-top"
        alt="${pokemon.name}"
    />
    <div class="card-body">
        <h5 class="card-title">${pokemon.name}</h5>
        <p class="card-text">${pokemon.description}</p>
        <a href="${pokemon.link}" class="btn btn-warning">Visit</a>
    </div>
    </div>`;
  dataRow.appendChild(div);
}
