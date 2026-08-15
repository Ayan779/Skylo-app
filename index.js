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

  humidityElement.innerHTML =
    `${response.data.temperature.humidity}%`;

  windElement.innerHTML =
    `${response.data.wind.speed} mph`;

  descriptionElement.innerHTML =
    response.data.condition.description;

  timeElement.innerHTML = formatDate(date);

  iconElement.innerHTML = `
    <img
      src="${response.data.condition.icon_url}"
      alt="${response.data.condition.description}"
      class="weather-app-icon"
    />
  `;

  getForecast(response.data.city);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];

  return days[date.getDay()];
}

function searchCity(city) {
  let apiKey = "f438136d428cbf8fdab9t0a4o427660f";

  let apiUrl =
    `https://api.shecodes.io/weather/v1/current?query=${encodeURIComponent(
      city
    )}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showWeather);
}

function handleSearch(event) {
  event.preventDefault();

  let searchInput =
    document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "f438136d428cbf8fdab9t0a4o427660f";

  let apiUrl =
    `https://api.shecodes.io/weather/v1/forecast?query=${encodeURIComponent(
      city
    )}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 7) {
      forecastHtml =
        forecastHtml +
        `
          <div class="weather-forecast-day">
            <div class="weather-forecast-date">
              ${formatDay(day.time)}
            </div>

            <img
              src="${day.condition.icon_url}"
              alt="${day.condition.description}"
              class="weather-forecast-icon"
            />

            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>
                  ${Math.round(day.temperature.maximum)}°
                </strong>
              </div>

              <div class="weather-forecast-temperature">
                ${Math.round(day.temperature.minimum)}°
              </div>
            </div>
          </div>
        `;
    }
  });

  let forecastElement =
    document.querySelector("#forecast");

  forecastElement.innerHTML = forecastHtml;
}

function searchCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f438136d428cbf8fdab9t0a4o427660f";

  let apiUrl =
    `https://api.shecodes.io/weather/v1/current?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showWeather);
}

function handleCurrentLocation() {
  navigator.geolocation.getCurrentPosition(
    searchCurrentLocation
  );
}

let searchFormElement =
  document.querySelector("#search-form");

searchFormElement.addEventListener(
  "submit",
  handleSearch
);

let currentLocationButtonElement =
  document.querySelector("#current-location-button");

currentLocationButtonElement.addEventListener(
  "click",
  handleCurrentLocation
);

searchCity("Mankato");
