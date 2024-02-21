'use strict';
const API_KEY = '996d536097fb4d77a34aa356c2a2c298';
const BASE_URL = 'https://api.weatherbit.io/v2.0/forecast/';
class Weather {
  constructor(city, weatherDay) {
    this.temerature = weatherDay.temp;
    this.description = weatherDay.weather.description;
    this.city = city;
    this.date = weatherDay.datetime;
    this.icon = weatherDay.weather.icon;
  }

  print() {
    console.log(
      `Weather in ${this.city}: ${this.temerature}℉, ${this.description}`
    );
  }

  displayToDom(weatherData) {
    const weatherContainer = document.getElementById('weather-display');
    weatherContainer.innerHTML += `
    <div>
        <h3>Date: ${weatherData.date}</h3>
        <h4>City: ${weatherData.city}</h4>
        <div class="row">
            <p>Tempature: ${weatherData.temerature}℉</p>
            <img height="50" width="50" src="https://cdn.weatherbit.io/static/img/icons/${weatherData.icon}.png" alt="weather icon">
            <p>Description: ${weatherData.description}</p>
        </div>
    </div>
    `;
  }
}

async function fetchWeatherData(zip) {
  try {
    const response = await fetch(
      BASE_URL + `daily?postal_code=${zip}&key=${API_KEY}&units=I&days=7`
    );
    // const response = await fetch('weatherData.json');
    const weatherData = await response.json();
    const cityName = weatherData.city_name;

    const weatherDays = weatherData.data.map(
      (weatherDay) => new Weather(cityName, weatherDay)
    );

    weatherDays.forEach((day) => day.displayToDom(day));
  } catch (error) {
    console.log(error);
  }
}

const form = document.getElementById('zipcode-zip');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  fetchWeatherData(form.zip.value);
});
