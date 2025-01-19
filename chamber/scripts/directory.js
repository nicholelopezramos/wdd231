const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const display = document.querySelector("article");
const currentYear = document.getElementById('current-year');
const lastModified = document.getElementById('last-modified');

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;

fetch("data/members.json")
    .then(response => response.json())
    .then(data => {
        renderGrid(data); // Default view
        setupEventListeners(data);
    })
    .catch(error => console.error("Error loading data:", error));

// Render grid layout
function renderGrid(data) {
    display.className = "grid";
    display.innerHTML = data
        .map(member => `
            <section>
                <img src="${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            </section>
        `)
        .join("");
}

// Render list layout
function renderList(data) {
    display.className = "list";
    display.innerHTML = data
        .map(member => `
            <section>
                <img src="${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            </section>
        `)
        .join("");
}

// Setup event listeners for buttons
function setupEventListeners(data) {
    gridButton.addEventListener("click", () => renderGrid(data));
    listButton.addEventListener("click", () => renderList(data));
}

