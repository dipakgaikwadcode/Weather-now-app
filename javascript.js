const API_KEY = '8db24xxxxxxxxxxxxxxxxxxxxxxx'; // Use your actual 32-character key
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherDisplay = document.getElementById('weatherDisplay');
const loader = document.getElementById('loader');

// 1. Initialize App: Load last searched city from LocalStorage
window.onload = () => {
    const lastCity = localStorage.getItem('preferredCity');
    if (lastCity) {
        getWeatherData(lastCity);
    }
};

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

// 2. Fetch Data using Async/Await
async function getWeatherData(city) {
    showLoading(true);
    // Simulating a real API delay
    setTimeout(() => {
        const mockData = {
            city: { name: city },
            list: Array(40).fill({
                main: { temp: 31, humidity: 45 },
                wind: { speed: 12 },
                weather: [{ description: "clear sky", main: "Clear" }],
                dt_txt: "2026-03-31 12:00:00"
            })
        };
        displayWeather(mockData);
        showLoading(false);
        console.log("Showing Mock Data because API Key is still activating.");
    }, 800);
}

function displayWeather(data) {
    const current = data.list[0];
    const currentWeatherDiv = document.getElementById('currentWeather');
    const forecastGrid = document.getElementById('forecastGrid');

    // Display Current
    currentWeatherDiv.innerHTML = `
        <h2>${data.city.name}</h2>
        <p>${new Date().toLocaleDateString()}</p>
        <h1 style="font-size: 3rem;">${Math.round(current.main.temp)}°C</h1>
        <p>${current.weather[0].description}</p>
        <p>Humidity: ${current.main.humidity}% | Wind: ${current.wind.speed} m/s</p>
    `;

    // Display 5-Day Forecast (every 8th index = approx 24 hours)
    forecastGrid.innerHTML = '';
    for (let i = 7; i < data.list.length; i += 8) {
        const day = data.list[i];
        forecastGrid.innerHTML += `
            <div class="forecast-card">
                <p><strong>${new Date(day.dt_txt).toLocaleDateString(undefined, {weekday: 'short'})}</strong></p>
                <p>${Math.round(day.main.temp)}°C</p>
                <p>${day.weather[0].main}</p>
            </div>
        `;
    }

    weatherDisplay.classList.remove('hidden');
    document.getElementById('errorMessage').classList.add('hidden');
}

function showLoading(state) {
    state ? loader.classList.remove('hidden') : loader.classList.add('hidden');
}

function showError(msg) {
    showLoading(false);
    weatherDisplay.classList.add('hidden');
    document.getElementById('errorMessage').classList.remove('hidden');
}