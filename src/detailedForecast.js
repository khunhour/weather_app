import { checkUnit } from './currentForecast';

async function fetchHourlyAndDailyWeatherData(url) {
  try {
    let response = await fetch(url, { mode: 'cors' });
    let formattedResponse = await response.json();
    let timeZoneOffset = formattedResponse.timezone_offset;
    let hourlyData = formattedResponse.hourly.slice(0, 24);
    let dailyData = formattedResponse.daily;

    let dailyForecast = { timeZoneOffset, dailyData };
    let hourlyForecast = { timeZoneOffset, hourlyData };
    return { dailyForecast, hourlyForecast };
  } catch (error) {
    console.log('error at fetchHourlyAndDailyWeatherData');
    console.error(error);
  }
}

function getDetailedForecastUrl(data) {
  let unit = checkUnit();
  let lon = data.coord.lon;
  let lat = data.coord.lat;
  let apiID = process.env.API_KEY;
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${apiID}&units=${unit}`;
  return url;
}

function displayDailyForecast(data) {
  let dailyData = data.dailyData;
  let timeZoneOffset = data.timeZoneOffset;
  for (let i = 0; i < 7; i++) {
    const daily = document.querySelector(`[data-daily='${i}']`).children;
    let dailyDay = daily[0];
    let dailyIcon = daily[1];
    let dailyTempLow = daily[2];
    let dailyTempHigh = daily[3];
    let day;

    if (i === 0) {
      day = 'Today';
    } else {
      day = convertTimeStampToDay(dailyData[i].dt + timeZoneOffset);
    }
    let icon = dailyData[i].weather[0].icon;
    let tempHigh = Math.round(dailyData[i].temp.max);
    let tempLow = Math.round(dailyData[i].temp.min);

    dailyDay.textContent = day;
    dailyIcon.src = `./images/${icon}.png`;
    dailyTempLow.textContent = `L: ${tempLow}\u00B0`;
    dailyTempHigh.textContent = `H: ${tempHigh}\u00B0`;
  }
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

    let icon = hourlyData[i].weather[0].icon;
    let temp = Math.round(hourlyData[i].temp);

    hourlyHour.textContent = hour;
    hourlyIcon.src = `./images/${icon}.png`;
    hourlyTemp.textContent = `${temp}\u00B0`;
  }
}

// convert timestamps from local time to UTC and from UTC to dedicated timezone
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
  convertTimeStampToHour,
};
