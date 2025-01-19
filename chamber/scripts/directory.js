// THIS IS JUST A FIRST DRAFT I NEED TO POLISH IT MORE, FEEDBACK IS RECEIVED
// TBH NOT SURE IF THIS IS THE CORRECT APPROACH HAHA
async function loadMembers(view = "grid") {
    const response = await fetch('./data/members.json');
    const members = await response.json();
    displayMembers(members, view);
}

function displayMembers(members, view) {
    const container = document.getElementById('directory');
    container.innerHTML = ""; 

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = view === "grid" ? "member-card grid-view" : "member-card list-view";

        memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" class="member-image">
            <div class="member-details">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Website</a>
            </div>
        `;

        container.appendChild(memberCard);
    });
}

function toggleView(view) {
    const toggleButtons = document.querySelectorAll('.toggle-button');
    toggleButtons.forEach(button => button.classList.remove('active'));
    document.getElementById(view).classList.add('active');
    loadMembers(view);
}

function setFooterInfo() {
    const yearElement = document.getElementById('year');
    const lastModifiedElement = document.getElementById('last-modified');
    yearElement.textContent = new Date().getFullYear();
    lastModifiedElement.textContent = document.lastModified;
}

document.addEventListener('DOMContentLoaded', () => {
    loadMembers(); 
    setFooterInfo();

    document.getElementById('grid').addEventListener('click', () => toggleView('grid'));
    document.getElementById('list').addEventListener('click', () => toggleView('list'));
});