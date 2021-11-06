import { checkUnit } from './index';
function getHourlyAndDailyWeatherData(lon, lat) {}

function getOneTimeUrl(data) {
  console.log(data);
  let unit = checkUnit();

  let lon = data.coord.lon;
  let lat = data.coord.lat;
  let apiID = `02cafa796b213d5a197f3a3378f70a47`;
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${apiID}&units=${unit}`;
  console.log(url);
}

export { getOneTimeUrl };
