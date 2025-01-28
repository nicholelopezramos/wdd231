const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=51.09190337550689&lon=10.330076826156928&units=imperial&appid=1c6e73eb8069fb297283997169638cb9';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // Log API data for testing
            displayResults(data); // Update the DOM with the fetched data
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}

function displayResults(data) {
  // Update temperature
  currentTemp.innerHTML = `${data.main.temp}&deg;F`;

  // Update weather icon
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  let desc = data.weather[0].description;

  // Set the weather icon's attributes
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);

  // Set the caption description
  captionDesc.textContent = `${desc}`;
}

// Fetch the data when the script runs
apiFetch();
