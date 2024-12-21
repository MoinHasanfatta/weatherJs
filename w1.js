const API_KEY = "17689b041d973d1279c3d5f478464b0d"; // Replace with your actual API key
const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');

const getWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        loading.classList.remove('hidden'); // Show loading
        errorMessage.classList.add('hidden'); // Hide error message
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        loading.classList.add('hidden'); // Hide loading
        return data;
    } catch (error) {
        loading.classList.add('hidden'); // Hide loading
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden'); // Show error message
        return null;
    }
};

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    weatherInfo.innerHTML = ''; // Clear previous weather data
    const city = cityInput.value.trim();

    if (city) {
        const weatherData = await getWeather(city);
        if (weatherData) {
            weatherInfo.innerHTML = `
                <h2>${weatherData.name}</h2>
                <p>${weatherData.weather[0].description}</p>
                <p>Temperature: ${weatherData.main.temp}°C</p>
                <p>Humidity: ${weatherData.main.humidity}%</p>
            `;
        }
    }
});
