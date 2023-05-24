function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()]; // || let dayIndex = date.getDay();

  return `${day} ${hours}: ${minutes}`;
}

let dayTime = document.querySelector(".dateTime");
let currentTime = new Date();
// let date = date.getDate();

dayTime.innerHTML = formatDate(currentTime);

//Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
function displayWeatherCondition(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  console.log(response);
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png `
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
}

function search(city) {
  let apiKey = "bde2a78fb83f6711e5b697e805f6cfad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#form-city").value;
  search(city);
}

let form = document.querySelector(".weather-app-form");
form.addEventListener("submit", handleSubmit);

search("New York");

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
}

// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

function convert(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureCel.classList.remove("active");
  temperatureFah.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function convertCel(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureCel.classList.add("active");
  temperatureFah.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  // temperature = Number(temperature);
  // temperatureElement.innerHTML = Math.round[(fahrenheit-32) * 5]/9;
}

let celsiusTemperature = null;

let temperatureFah = document.querySelector("#fahrenheit-link");
temperatureFah.addEventListener("click", convert);

let temperatureCel = document.querySelector("#celsius-link");
temperatureCel.addEventListener("click", convertCel);

function showPosition(position) {
  // let h1 = document.querySelector("h1");
  // h1.innerHTML = `Your latitude is , your longitude is  and your temperature is `;
  let apiKey = "bde2a78fb83f6711e5b697e805f6cfad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector(".location-button");
button.addEventListener("click", getCurrentPosition);
