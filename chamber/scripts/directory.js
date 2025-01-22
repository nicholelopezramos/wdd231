async function displayCompanies() {
  try {
    // Fetch the JSON data
    const response = await fetch('./data/members.json'); // Adjust the path if necessary
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON data
    const companies = await response.json();

    // Get the container where company data will be displayed
    const container = document.getElementById("company-container");

    // Loop through the companies and generate HTML
    companies.forEach(company => {
      const companyDiv = document.createElement("div");
      companyDiv.classList.add("company");

      companyDiv.innerHTML = `
              <h3>${company.name}</h3>
              <img src="${company.icon_file_name}" alt="${company.name} Logo" onerror="this.style.display='none'">
              <p><strong>Address:</strong> ${company.address}</p>
              <p><strong>Phone:</strong> ${company.phone_number}</p>
              <p><strong>Website:</strong> <a href="${company.website_url}" target="_blank">${company.website_url}</a></p>
              
          `;

      // Append the companyDiv to the container
      container.appendChild(companyDiv);
    });
  } catch (error) {
    console.error("Error fetching or displaying company data:", error);
  }
}

// Call the function when the page loads
displayCompanies();


// Hamburger Menu functionality
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}

// Mock Data for Weather and Events
const eventsData = "No events available at this time.";
const currentWeatherData = {
  temperature: "75°F",
  condition: "Partly Cloudy",
  icon: "https://cdn-icons-png.flaticon.com/512/1146/1146869.png",
  high: "85°F",
  low: "52°F",
  humidity: "34%",
  sunrise: "7:30am",
  sunset: "9:59pm"
};
const forecastData = [
  { day: "Today", temperature: "90°F" },
  { day: "Wednesday", temperature: "89°F" },
  { day: "Thursday", temperature: "68°F" }
];

// Populate Events
document.getElementById("events").querySelector(".content").innerHTML = `<p>${eventsData}</p>`;

// Populate Current Weather
document.getElementById("current-weather").querySelector(".content").innerHTML = `
    <p><strong>${currentWeatherData.temperature}</strong></p>
    <img src="${currentWeatherData.icon}" alt="${currentWeatherData.condition}" class="weather-icon">
    <p>${currentWeatherData.condition}</p>
    <p>High: ${currentWeatherData.high}</p>
    <p>Low: ${currentWeatherData.low}</p>
    <p>Humidity: ${currentWeatherData.humidity}</p>
    <p>Sunrise: ${currentWeatherData.sunrise}</p>
    <p>Sunset: ${currentWeatherData.sunset}</p>
`;

// Populate Forecast
const forecastHTML = forecastData
  .map(forecast => `<p>${forecast.day}: <strong>${forecast.temperature}</strong></p>`)
  .join("");
document.getElementById("weather-forecast").querySelector(".content").innerHTML = forecastHTML;
