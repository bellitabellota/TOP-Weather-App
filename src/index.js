import "./styles.css";

const searchButton = document.querySelector(".js-search-button");
const inputElem = document.getElementById("location");
const searchResultContainer = document.querySelector(".js-search-result");

searchButton.addEventListener("click", () => {
  searchResultContainer.innerHTML = `<div class="loading-container">
      <div class="loading"></div>
      <div class="loading"></div>
      <div class="loading"></div>
    </div>`;


  const searchedLocation = inputElem.value.toLowerCase().trim();

  fetchWeatherData(searchedLocation)
  .then(function(result){
    console.log(result);
    displayWeather(result);
  })
  .catch(function(error) {
    alert(`The data could not be fetched. ${error.message}`);
  });
})


function displayWeather(weatherData) {
  searchResultContainer.innerHTML = "";
  searchResultContainer.innerHTML = `<p class="js-location">${weatherData.location.toUpperCase()}</p>
    <p class="js-temperature">Temperature: ${weatherData.temperature} °F</p>
    <p>${weatherData.description}</p>`;
}

function fetchWeatherData(location) {
  return fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=BMP4FPLMSRRNBQRAKYHDX5L95`)
  .then(function(result){
    if(!result.ok) {
      throw new Error(`Response.status: ${result.status}`)
    } else {
      return result.json();
    }  
  })
  .then(function(result) {
    return {location, temperature: result.days[0].temp, description: result.days[0].description};
  })
}



