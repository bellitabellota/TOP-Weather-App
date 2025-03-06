import "./styles.css";

const searchButton = document.querySelector(".js-search-button");
const inputElem = document.getElementById("location");
const searchResultContainer = document.querySelector(".js-search-result");

searchButton.addEventListener("click", () => {
  showLoadingSpinner();

  getWeatherData();

})

function showLoadingSpinner() {
  searchResultContainer.innerHTML = `<div class="loading-container">
    <div class="loading"></div>
    <div class="loading"></div>
    <div class="loading"></div>
  </div>`;
}

async function getWeatherData () {
  try {
    const searchedLocation = inputElem.value.toLowerCase().trim();
    const data = await fetchWeatherData(searchedLocation);
    if (data) {
      console.log(data);
      displayWeather(data);
    }
  } catch(error) {
    searchResultContainer.innerHTML = `The weather data could not be loaded. ${error.message}`;
  }
}


function displayWeather(weatherData) {
  searchResultContainer.innerHTML = "";
  searchResultContainer.innerHTML = `<p class="js-location">${weatherData.location.toUpperCase()}</p>
    <p class="js-temperature">Temperature: ${weatherData.temperature} °F</p>
    <p>${weatherData.description}</p>`;
}

async function fetchWeatherData(location, resolve) {
  try {
    const result = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=BMP4FPLMSRRNBQRAKYHDX5L95`)
    if(!result.ok) {
      throw new Error(`Response.status: ${result.status}`)
    }
    const data = await result.json(); 
    return {location, temperature: data.days[0].temp, description: data.days[0].description}
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}



