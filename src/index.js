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

async function getWeatherData(url) {
  try {
    weatherData = {};
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
      });
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
  let data = await getWeatherData(url);
  return data;
}

const form = document.querySelector('#form');
form.addEventListener('submit', (e) => {
  processData();
  e.preventDefault();
});

const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach((btn) => {
  btn.addEventListener('change', processData);
});

function checkUnit() {
  const radioButton = document.querySelector('input[name="unit"]:checked');
  if (radioButton.value === 'Celcius') {
    return 'metric';
  } else {
    return 'imperial';
  }
}

function processData() {
  let cityName = getCityName();
  // set the name of the previous city (for when changing unit)
  if (!cityName) {
    const nameNode = document.querySelector('.cityName');
    cityName = nameNode.textContent;
  }
  // if there is also no previous searched city, break
  if (!cityName) {
    return;
  } else {
    let data = getWeatherInfo(cityName);
    data.then((info) => {
      displayWeather(info);
    });
    clearForm();
  }
}
