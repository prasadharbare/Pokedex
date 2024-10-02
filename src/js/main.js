import data from "./data";

// === DOM Selection ===
const dataRow = document.querySelector("[data-row]");

data.forEach(Pokemon);

function Pokemon(data) {
  const div = document.createElement("div");
  div.classList.add("col");
  div.innerHTML = `<div class="card">
      <img
          src="${data.image}"
          class="card-img-top"
          alt="${data.name}"
      />
      <div class="card-body">
          <h5 class="card-title">${data.name}</h5>
          <p class="card-text">${data.description}</p>
          <a href="${data.link}" class="btn btn-warning">Visit</a>
      </div>
      </div>`;
  dataRow.appendChild(div);
}
