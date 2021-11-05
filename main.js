/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("function getUrl(cityName, unit) {\n  let apiID = `02cafa796b213d5a197f3a3378f70a47`;\n  let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiID}&units=${unit}`;\n  console.log(url);\n  return url;\n}\n\nfunction getCityName() {\n  return document.getElementById('input').value;\n}\n\nfunction clearForm() {\n  document.getElementById('input').value = '';\n}\n\nasync function getWeatherData(url) {\n  try {\n    weatherData = {};\n    await fetch(url, { mode: 'cors' })\n      .then((response) => {\n        return response.json();\n      })\n      .then((response) => {\n        weatherData.city = response.name;\n        weatherData.temp = Math.round(response.main.temp);\n        weatherData.lowTemp = Math.round(response.main.temp_min);\n        weatherData.highTemp = Math.round(response.main.temp_max);\n        weatherData.feels_like = response.main.feels_like;\n        weatherData.humidity = response.main.humidity;\n        weatherData.windSpeed = response.wind.speed;\n        weatherData.weather = response.weather[0].main;\n        weatherData.description = response.weather[0].description;\n      });\n    return weatherData;\n  } catch (error) {\n    console.log(error);\n  }\n}\n\nfunction displayWeather(data) {\n  const cityName = document.querySelector('.cityName');\n  const temp = document.querySelector('.temp');\n  const description = document.querySelector('.description');\n  const highTemp = document.querySelector('.highTemp');\n  const lowTemp = document.querySelector('.lowTemp');\n  const humidity = document.querySelector('.humidity');\n  const wind = document.querySelector('.wind');\n\n  let tempUnit;\n  let speedUnit;\n  let currentUnit = checkUnit();\n  if (currentUnit === 'metric') {\n    tempUnit = '\\u00B0C';\n    speedUnit = 'm/s';\n  } else {\n    tempUnit = '\\u00B0F';\n    speedUnit = 'mph';\n  }\n\n  cityName.textContent = data.city;\n  temp.textContent = `${data.temp}${tempUnit}`;\n  description.textContent = data.description;\n  highTemp.textContent = `High: ${data.highTemp}${tempUnit}`;\n  lowTemp.textContent = `Low: ${data.lowTemp}${tempUnit}`;\n  humidity.textContent = `Humidity: ${data.humidity}%`;\n  wind.textContent = `Wind Speed: ${data.windSpeed}${speedUnit}`;\n}\n\nasync function getWeatherInfo(name) {\n  let unit = checkUnit();\n  let url = getUrl(name, unit);\n  let data = await getWeatherData(url);\n  return data;\n}\n\nconst form = document.querySelector('#form');\nform.addEventListener('submit', (e) => {\n  processData();\n  e.preventDefault();\n});\n\nfunction checkUnit() {\n  const radioButton = document.querySelector('input[name=\"unit\"]:checked');\n  if (radioButton.value === 'Celcius') {\n    return 'metric';\n  } else {\n    return 'imperial';\n  }\n}\n\nfunction processData() {\n  let cityName = getCityName();\n  if (!cityName) {\n    const nameNode = document.querySelector('.cityName');\n    cityName = nameNode.textContent;\n  }\n\n  let data = getWeatherInfo(cityName);\n  data.then((info) => {\n    displayWeather(info);\n  });\n  clearForm();\n}\n\n\n//# sourceURL=webpack://weather_app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;