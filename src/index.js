import {
  fetchHourlyAndDailyWeatherData,
  getDetailedForecastUrl,
  displayHourlyForecast,
  displayDailyForecast,
  convertTimeStampToHour,
} from './detailedForecast.js';

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

function getCityName() {
  return document.getElementById('input').value;
}

async function processData(cityName) {
  // set the name of the previous city (for when changing unit)
  if (!cityName) {
    const nameNode = document.querySelector('.cityName');
    cityName = nameNode.textContent;
  }
  // if there is also no previous searched city, break(C/F)
  if (!cityName) {
    //display error
    return;
  } else {
    let data = await getWeatherInfo(cityName);
    let url = getDetailedForecastUrl(data);
    let detailedData = await fetchHourlyAndDailyWeatherData(url);
    clearForm();
    displayWeather(data);
    displayHourlyForecast(detailedData.hourlyForecast);
    displayDailyForecast(detailedData.dailyForecast);
  }
}

async function getWeatherInfo(name) {
  try {
    let unit = checkUnit();
    let url = getUrl(name, unit);
    let data = await fetchCurrentWeatherData(url);
    return data;
  } catch (error) {
    throw error;
  }
}

function checkUnit() {
  const radioButton = document.querySelector('input[name="unit"]:checked');
  if (radioButton.value === 'Celcius') {
    return 'metric';
  } else {
    return 'imperial';
  }
}

function getUrl(cityName, unit) {
  let apiID = `02cafa796b213d5a197f3a3378f70a47`;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiID}&units=${unit}`;
  return url;
}

async function fetchCurrentWeatherData(url) {
  try {
    let weatherData = {};
    let response = await fetch(url, { mode: 'cors' });
    let formattedResponse = await response.json();

    weatherData.city = formattedResponse.name;
    weatherData.temp = Math.round(formattedResponse.main.temp);
    weatherData.lowTemp = Math.round(formattedResponse.main.temp_min);
    weatherData.highTemp = Math.round(formattedResponse.main.temp_max);
    weatherData.feels_like = formattedResponse.main.feels_like;
    weatherData.humidity = formattedResponse.main.humidity;
    weatherData.windSpeed = formattedResponse.wind.speed;
    weatherData.weather = formattedResponse.weather[0].main;
    weatherData.description = formattedResponse.weather[0].description;
    weatherData.coord = formattedResponse.coord;
    weatherData.date = formattedResponse.dt;
    weatherData.timezone = formattedResponse.timezone;

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
  changeBackground(data);
  cityName.textContent = data.city;
  temp.textContent = `${data.temp}${tempUnit}`;
  description.textContent = data.description;
  highTemp.textContent = `High: ${data.highTemp}${tempUnit}`;
  lowTemp.textContent = `Low: ${data.lowTemp}${tempUnit}`;
  humidity.textContent = `Humidity: ${data.humidity}%`;
  wind.textContent = `Wind Speed: ${data.windSpeed}${speedUnit}`;
}
// change background color according to time of day and weather
function changeBackground(data) {
  let hour = Number(convertTimeStampToHour(data.date + data.timezone));
  if (hour > 5 && hour < 11) {
    document.body.className = '';
    document.body.classList.add('clear');
  } else if (hour > 11 && hour < 16) {
    document.body.className = '';
    document.body.classList.add('sunny');
  } else {
    document.body.className = '';
    document.body.classList.add('night');
  }

  if (
    data.description.includes('rain') ||
    data.description.includes('broken clouds') ||
    data.description.includes('overcast clouds') ||
    data.description.includes('snow')
  ) {
    document.body.className = 'grey';
  }
}

function clearForm() {
  document.getElementById('input').value = '';
}

processData('Tokyo');
export { checkUnit };
