// Global Configuration Context
// Register for a free key at openweathermap.org/api if you haven't yet
const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// DOM Node References
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherInfo = document.getElementById("weather-info");
const errorMessage = document.getElementById("error-message");

const locationName = document.getElementById("location-name");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

/**
 * Asynchronously pulls weather details from OpenWeatherMap API
 * @param {string} city 
 */
async function fetchWeather(city) {
  // Build query parameter layout explicitly requesting Metric (Celsius) units
  const targetUrl = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(targetUrl);
    
    if (!response.ok) {
      throw new Error("Target city geolocation records not found");
    }

    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    showErrorState();
  }
}

/**
 * Parses JSON response stream and rewrites HTML content structures
 * @param {Object} data 
 */
function displayWeatherData(data) {
  // Hide previous error states if they were visible
  errorMessage.classList.add("hidden");

  // Extract properties safely out of JSON payload
  locationName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = Math.round(data.main.temp);
  weatherDescription.textContent = data.weather[0].description;
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; // Convert m/s to km/h

  // Make the data card frame visible
  weatherInfo.classList.remove("hidden");
}

/**
 * Displays user-friendly error frame when requests drop or fail
 */
function showErrorState() {
  weatherInfo.classList.add("hidden");
  errorMessage.classList.remove("hidden");
}

// Event Listeners Integration Setup
searchBtn.addEventListener("click", () => {
  const query = cityInput.value.trim();
  if (query) fetchWeather(query);
});

// Trigger search execution smoothly if the user presses 'Enter' inside the text field
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const query = cityInput.value.trim();
    if (query) fetchWeather(query);
  }
});