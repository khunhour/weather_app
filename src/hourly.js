import { checkUnit } from './index';

async function fetchHourlyAndDailyWeatherData(url) {
  try {
    let response = await fetch(url, { mode: 'cors' });
    let formattedResponse = await response.json();
    let timeZoneOffset = formattedResponse.timezone_offset;
    let hourlyData = formattedResponse.hourly.slice(0, 24);
    let dailyData = formattedResponse.daily;

    let dailyForecast = { timeZoneOffset, dailyData };
    let hourlyForecast = { timeZoneOffset, hourlyData };
    // console.log(formattedResponse);
    return { dailyForecast, hourlyForecast };
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
  console.log('daily');
  console.log(data);
  let dailyData = data.dailyData;
  let timeZoneOffset = data.timeZoneOffset;
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
      day = convertTimeStampToDay(dailyData[i].dt + timeZoneOffset);
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
  let hourlyData = data.hourlyData;
  let timeZoneOffset = data.timeZoneOffset;
  for (let i = 0; i < 24; i++) {
    const hourly = document.querySelector(`[data-hourly='${i}']`).children;
    let hourlyHour = hourly[0];
    let hourlyIcon = hourly[1];
    let hourlyTemp = hourly[2];
    let hour;

    if (i === 0) {
      hour = 'Now';
    } else {
      hour = convertTimeStampToHour(hourlyData[i].dt + timeZoneOffset);
    }
    hourlyHour.textContent = hour;

    let icon = hourlyData[i].weather[0].icon;
    hourlyIcon.src = `./images/${icon}.png`;

    let temp = Math.round(hourlyData[i].temp);
    hourlyTemp.textContent = `${temp}\u00B0`;
  }
}

function convertTimeStampToHour(timeStamp) {
  let localTimeZoneOffsetMiliseconds = new Date().getTimezoneOffset() * 60;
  // offsettedDate = UTC stamp + timeZoneOFFset(from data) + localTime OFFset
  // offsettedDate convert local date to UTC and the offset got from data finally set the date to the dedicated timezone;
  let offsettedDate = timeStamp + localTimeZoneOffsetMiliseconds;
  let hour = new Date(offsettedDate * 1000).getHours();
  let formattedHour = ('0' + hour).slice(-2);
  return formattedHour;
}
export {
  getDetailedForecastUrl,
  fetchHourlyAndDailyWeatherData,
  displayHourlyForecast,
  displayDailyForecast,
};