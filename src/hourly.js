import { doc } from 'prettier';
import { checkUnit } from './index';
async function fetchHourlyAndDailyWeatherData(url) {
  try {
    let detailedForecast;
    await fetch(url, { mode: 'cors' })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        detailedForecast = Object.assign({}, data);
      });
    return { detailedForecast };
  } catch (error) {
    console.log(error);
  }
}

function getDetailedForecastUrl(data) {
  console.log(data);
  let unit = checkUnit();

  let lon = data.coord.lon;
  let lat = data.coord.lat;
  let apiID = `02cafa796b213d5a197f3a3378f70a47`;
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${apiID}&units=${unit}`;
  return url;
}

function displayDailyForecast(data) {
  let dailyData = data.detailedForecast.daily;
  for (let i = 0; i < 7; i++) {
    const daily = document.querySelector(`[data-daily='${i}']`).children;
    let dailyDay = daily[0];
    let dailyIcon = daily[1];
    let dailyTempHigh = daily[2];
    let dailyTempLow = daily[3];
    let day;

    if (i === 0) {
      day = 'Today';
    } else {
      day = convertTimeStampToDay(dailyData[i].dt);
    }
    dailyDay.textContent = day;

    let icon = dailyData[i].weather[0].icon;
    dailyIcon.src = `./images/${icon}.png`;

    let tempHigh = Math.round(dailyData[i].temp.max);
    let tempLow = Math.round(dailyData[i].temp.min);
    dailyTempHigh.textContent = `H: ${tempHigh}\u00B0`;
    dailyTempLow.textContent = `L: ${tempLow}\u00B0`;
  }

  console.log(dailyData[0].weather.icon);
}

function convertTimeStampToDay(time) {
  const DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let dayIndex = new Date(time * 1000).getDay();
  let day = DAYS[dayIndex];
  return day;
}

function displayHourlyForecast(data) {
  let hourlyData = data.detailedForecast.hourly;
  for (let i = 0; i < 24; i++) {
    const hourly = document.querySelector(`[data-hourly='${i}']`).children;
    let hourlyHour = hourly[0];
    let hourlyIcon = hourly[1];
    let hourlyTemp = hourly[2];
    let hour;
    if (i === 0) {
      hour = 'Now';
    } else {
      hour = convertTimeStampToHour(hourlyData[i].dt);
    }
    hourlyHour.textContent = hour;

    let icon = hourlyData[i].weather[0].icon;
    hourlyIcon.src = `./images/${icon}.png`;

    let temp = Math.round(hourlyData[i].temp);
    hourlyTemp.textContent = `${temp}\u00B0`;
  }
  console.log(hourlyData[0].dt);
  console.log('hourly');
}

function convertTimeStampToHour(time) {
  let hour = new Date(time * 1000).getHours();
  let formattedHour = ('0' + hour).slice(-2);

  return formattedHour;
}
export {
  getDetailedForecastUrl,
  fetchHourlyAndDailyWeatherData,
  displayHourlyForecast,
  displayDailyForecast,
};
