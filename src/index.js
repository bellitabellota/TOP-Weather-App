import "./styles.css";

const searchButton = document.querySelector(".js-search-button");
const inputElem = document.getElementById("location");
const searchResultContainer = document.querySelector("js-search-result");

let fetchedWeatherData = new Promise (function(resolve) {
  searchButton.addEventListener("click", () => {
    const searchedLocation = inputElem.value.toLowerCase().trim();
    fetchWeatherData(searchedLocation, resolve);
  })
});

  fetchedWeatherData.then(function(result){
    console.log(result);
  })

function fetchWeatherData(location, resolve) {
  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=BMP4FPLMSRRNBQRAKYHDX5L95`)
  .then(function(result){
    return result.json();
  })
  .then(function(result) {
    const weatherData = {location, temperature: result.days[0].temp, description: result.days[0].description}
    resolve(weatherData);
  })
}



