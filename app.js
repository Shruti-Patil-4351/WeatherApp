// ✅ REPLACE WITH YOUR OWN KEY FROM https://openweathermap.org/api
const apiKey = "1e3e8f230b6064d27976e41163a82b77";

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

const weatherResult = document.getElementById("weather-result");
const errorMessage = document.getElementById("error-message");

const cityNameEl = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperatureEl = document.getElementById("temperature");
const descriptionEl = document.getElementById("description");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("wind-speed");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      showError();
      return;
    }

    const data = await response.json();
    errorMessage.classList.add("hidden");

    cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
    temperatureEl.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
    descriptionEl.textContent = `Conditions: ${capitalize(data.weather[0].description)}`;
    humidityEl.textContent = data.main.humidity;
    windSpeedEl.textContent = data.wind.speed;

    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    weatherResult.classList.remove("hidden");
  } catch (error) {
    showError();
    console.error(error);
  }
}

function showError() {
  weatherResult.classList.add("hidden");
  errorMessage.classList.remove("hidden");
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
