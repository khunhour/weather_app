import { getWeatherInfo, displayWeather } from './currentForecast';
import {
  fetchHourlyAndDailyWeatherData,
  getDetailedForecastUrl,
  displayHourlyForecast,
  displayDailyForecast,
} from './detailedForecast.js';



// form's event listener onsubmit
const form = document.querySelector('#form');
form.addEventListener('submit', (e) => {
  let cityName = document.getElementById('input').value;
  processData(cityName);
  e.preventDefault();
});

// when changing C to F display data according to units
const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach((btn) => {
  btn.addEventListener('change', () => {
    const nameNode = document.querySelector('.cityName');
    let cityName = nameNode.textContent;
    processData(cityName);
  });
});

//process data
async function processData(cityName) {
  if (!cityName) {
    return;
  }
  try {
    let data = await getWeatherInfo(cityName);
    if (data == null) {
      throw 'City Not Found';
    }
    let url = getDetailedForecastUrl(data);
    clearForm();
    let detailedData = await fetchHourlyAndDailyWeatherData(url);
    displayWeather(data);
    displayHourlyForecast(detailedData.hourlyForecast);
    displayDailyForecast(detailedData.dailyForecast);
  } catch (error) {
    alert('Please Enter a Valid City Name!');
    console.error(error);
  }
}

function clearForm() {
  document.getElementById('input').value = '';
}

// fire default weather on start-up;
processData('Tokyo');
