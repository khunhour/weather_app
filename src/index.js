async function getCityWeatherInfo(cityName) {
  let apiID = `02cafa796b213d5a197f3a3378f70a47`;
  let url = `api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiID}`;
  console.log(url);
}
getCityWeatherInfo(sendai);
