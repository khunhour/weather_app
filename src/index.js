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
    const nameNode = document.querySelector('.cityName');
    let cityName = nameNode.textContent;
    processData(cityName);
  });
});

function getCityName() {
  return document.getElementById('input').value;
}

async function processData(cityName) {
  if (!cityName) {
    alert('Please Enter A Valid City Name!');
    return;
  } else {
    try {
      let data = await getWeatherInfo(cityName);
      let url = getDetailedForecastUrl(data);
      clearForm();
      let detailedData = await fetchHourlyAndDailyWeatherData(url);
      displayWeather(data);
      displayHourlyForecast(detailedData.hourlyForecast);
      displayDailyForecast(detailedData.dailyForecast);
    } catch (error) {
      alert('Please Enter A Valid City Name!');
      throw error;
    }
  }
}

async function getWeatherInfo(name) {
  try {
    let unit = checkUnit();
    let url = getUrl(name, unit);
    let fetchedData = await fetchCurrentWeatherData(url);
    let data = extractCurrentWeatherData(fetchedData);
    return data;
  } catch (error) {
    console.log('error at getWeatherInfo');
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
    let response = await fetch(url, { mode: 'cors' });
    let formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.log('error at fetchCurrentWeatherData');
    throw error;
  }
}

async function extractCurrentWeatherData(data) {
  if (data.cod === 404) {
    throw error;
  } else {
    let weatherData = {};
    weatherData.city = data.name;
    weatherData.temp = Math.round(data.main.temp);
    weatherData.lowTemp = Math.round(data.main.temp_min);
    weatherData.highTemp = Math.round(data.main.temp_max);
    weatherData.feels_like = data.main.feels_like;
    weatherData.humidity = data.main.humidity;
    weatherData.windSpeed = data.wind.speed;
    weatherData.weather = data.weather[0].main;
    weatherData.description = data.weather[0].description;
    weatherData.coord = data.coord;
    weatherData.date = data.dt;
    weatherData.timezone = data.timezone;
    return weatherData;
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
