function showWeather(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");

  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;

  temperatureElement.innerHTML = Math.round(
    response.data.temperature.current
  );

  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  windElement.innerHTML = `${response.data.wind.speed} mph`;

  descriptionElement.innerHTML = response.data.condition.description;

  timeElement.innerHTML = formatDate(date);

  iconElement.innerHTML = `
    <img
      src="${response.data.condition.icon_url}"
      alt="${response.data.condition.description}"
      class="weather-app-icon"
    /> 
    `;
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = "f438136d428cbf8fdab9t0a4o427660f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showWeather);
}

function handleSearch(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);