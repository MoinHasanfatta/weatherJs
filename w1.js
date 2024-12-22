const API_KEY = "17689b041d973d1279c3d5f478464b0d"; 
const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');

const getWeather = async (city) => {
    weatherInfo.innerHTML = `<h2>Loading...</h2>`; // Show loading message
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        loading.classList.remove('hidden'); // Show loading spinner
        errorMessage.classList.add('hidden'); // Hide error message by default
        const response = await fetch(url);
        console.log('Response Status:', response.status); // Log response status for debugging

        if (!response.ok) {
            if (response.status === 404) {
                console.log('City not found error'); // Log for debugging
                weatherInfo.innerHTML = `<h2> City not found </h2>`
                cityInput.value = "";
                throw new Error('City not found'); // Handle City not found
                return;
            }

            console.log('Something went wrong');
            throw new Error('Something went wrong'); // Handle other errors
        }

        const data = await response.json();
        loading.classList.add('hidden'); // Hide loading spinner
        return data;
    } catch (error) {
        console.log('Error caught:', error.message); // Log error message for debugging
        loading.classList.add('hidden'); // Hide loading spinner
        errorMessage.textContent = error.message; // Set error message text
        errorMessage.classList.remove('hidden'); // Ensure error message is visible
        return null;
    }
};

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    weatherInfo.innerHTML = ''; // Clear any previous weather data
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
            cityInput.value = ""
        }
    }
});
