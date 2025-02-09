document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("directory-container");
    const visitMessage = document.getElementById("visit-message");

    const lastVisit = localStorage.getItem("lastVisit");
    const currentDate = new Date();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(parseInt(lastVisit));
        const daysDifference = Math.floor((currentDate - lastVisitDate) / (1000 * 60 * 60 * 24));

        visitMessage.textContent =
            daysDifference < 1
                ? "Back so soon! Awesome!"
                : `You last visited ${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago.`;
    }
    localStorage.setItem("lastVisit", currentDate.getTime());

    function createCard(item) {
        const card = document.createElement("article");
        card.classList.add("card");

        card.innerHTML = `
            <h2>${item.name || item.title}</h2>
            <figure>
                <img src="${item.image}" alt="${item.name || item.title}" width="300" height="200">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button>Learn More</button>
        `;
        return card;
    }

    fetch("data/discover.json")
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(data => {
            data.forEach((item, index) => {
                const card = createCard(item);
                card.style.gridArea = `card${index + 1}`;
                container.appendChild(card);
            });
        })
        .catch(error => console.error("Error loading discover.json:", error));

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("show");
        });
    }
});
