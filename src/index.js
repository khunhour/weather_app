import {
  fetchHourlyAndDailyWeatherData,
  getDetailedForecastUrl,
  displayHourlyForecast,
  displayDailyForecast,
} from './hourly.js';

function getUrl(cityName, unit) {
  let apiID = `02cafa796b213d5a197f3a3378f70a47`;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiID}&units=${unit}`;
  return url;
}

function getCityName() {
  return document.getElementById('input').value;
}

function clearForm() {
  document.getElementById('input').value = '';
}

async function fetchCurrentWeatherData(url) {
  try {
    let weatherData = {};
    await fetch(url, { mode: 'cors' })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        weatherData.city = response.name;
        weatherData.temp = Math.round(response.main.temp);
        weatherData.lowTemp = Math.round(response.main.temp_min);
        weatherData.highTemp = Math.round(response.main.temp_max);
        weatherData.feels_like = response.main.feels_like;
        weatherData.humidity = response.main.humidity;
        weatherData.windSpeed = response.wind.speed;
        weatherData.weather = response.weather[0].main;
        weatherData.description = response.weather[0].description;
        weatherData.coord = response.coord;
      });
    // console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.log(error);
  }
}

function displayWeather(data) {
  const cityName = document.querySelector('.cityName');
  const temp = document.querySelector('.temp');
  const description = document.querySelector('.description');
  const highTemp = document.querySelector('.highTemp');
  const lowTemp = document.querySelector('.lowTemp');
  const humidity = document.querySelector('.humidity');
  const wind = document.querySelector('.wind');

  let tempUnit;
  let speedUnit;
  let currentUnit = checkUnit();
  if (currentUnit === 'metric') {
    tempUnit = '\u00B0C';
    speedUnit = 'm/s';
  } else {
    tempUnit = '\u00B0F';
    speedUnit = 'mph';
  }

  cityName.textContent = data.city;
  temp.textContent = `${data.temp}${tempUnit}`;
  description.textContent = data.description;
  highTemp.textContent = `High: ${data.highTemp}${tempUnit}`;
  lowTemp.textContent = `Low: ${data.lowTemp}${tempUnit}`;
  humidity.textContent = `Humidity: ${data.humidity}%`;
  wind.textContent = `Wind Speed: ${data.windSpeed}${speedUnit}`;
}

async function getWeatherInfo(name) {
  let unit = checkUnit();
  let url = getUrl(name, unit);
  let data = await fetchCurrentWeatherData(url);
  return data;
}

const form = document.querySelector('#form');
form.addEventListener('submit', (e) => {
  let cityName = getCityName();
  processData(cityName);
  e.preventDefault();
});

const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach((btn) => {
  btn.addEventListener('change', () => {
    processData(null);
  });
});

function checkUnit() {
  const radioButton = document.querySelector('input[name="unit"]:checked');
  if (radioButton.value === 'Celcius') {
    return 'metric';
  } else {
    return 'imperial';
  }
}

function processData(cityName) {
  // set the name of the previous city (for when changing unit)
  if (!cityName) {
    const nameNode = document.querySelector('.cityName');
    cityName = nameNode.textContent;
  }
  // if there is also no previous searched city, break(C/F)
  if (!cityName) {
    return;
  } else {
    let data = getWeatherInfo(cityName);
    console.log(data);
    data
      .then((info) => {
        displayWeather(info);
        return getDetailedForecastUrl(info);
      })
      .then((url) => {
        console.log(url);
        console.log('hi');
        return fetchHourlyAndDailyWeatherData(url);
      })
      .then((detailedData) => {
        displayHourlyForecast(detailedData);
        displayDailyForecast(detailedData);
      });
    clearForm();
  }
}
processData('Tokyo');
export { checkUnit };