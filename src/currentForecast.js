import { convertTimeStampToHour } from './detailedForecast.js';

async function getWeatherInfo(name) {
  try {
    let unit = checkUnit();
    let url = getUrl(name, unit);
    let fetchedData = await fetchCurrentWeatherData(url);
    if (fetchedData.cod === '404') {
      return;
    }
    let data = extractCurrentWeatherData(fetchedData);
    return data;
  } catch (error) {
    console.log('error at getWeatherInfo');
    console.error(error);
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
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiID}&units=${unit}`;
  return url;
}

async function fetchCurrentWeatherData(url) {
  try {
    let response = await fetch(url, { mode: 'cors' });
    let formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.log('error at fetchCurrentWeatherData');
    console.error(error);
  }
}

function extractCurrentWeatherData(data) {
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

export { getWeatherInfo, displayWeather, checkUnit };
