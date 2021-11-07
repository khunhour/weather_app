(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){let t=60*(new Date).getTimezoneOffset();return("0"+new Date(1e3*(e+t)).getHours()).slice(-2)}function n(){return"Celcius"===document.querySelector('input[name="unit"]:checked').value?"metric":"imperial"}function o(e){e||(e=document.querySelector(".cityName").textContent),e&&(async function(e){let t=(a=e,r=n(),`http://api.openweathermap.org/data/2.5/weather?q=${a}&appid=02cafa796b213d5a197f3a3378f70a47&units=${r}`),o=await async function(e){try{let t={};return await fetch(e,{mode:"cors"}).then((e=>e.json())).then((e=>{t.city=e.name,t.temp=Math.round(e.main.temp),t.lowTemp=Math.round(e.main.temp_min),t.highTemp=Math.round(e.main.temp_max),t.feels_like=e.main.feels_like,t.humidity=e.main.humidity,t.windSpeed=e.wind.speed,t.weather=e.weather[0].main,t.description=e.weather[0].description,t.coord=e.coord})),t}catch(e){console.log(e)}}(t);var a,r;return o}(e).then((e=>(function(e){const t=document.querySelector(".cityName"),o=document.querySelector(".temp"),a=document.querySelector(".description"),r=document.querySelector(".highTemp"),i=document.querySelector(".lowTemp"),c=document.querySelector(".humidity"),l=document.querySelector(".wind");let d,u;"metric"===n()?(d="°C",u="m/s"):(d="°F",u="mph"),t.textContent=e.city,o.textContent=`${e.temp}${d}`,a.textContent=e.description,r.textContent=`High: ${e.highTemp}${d}`,i.textContent=`Low: ${e.lowTemp}${d}`,c.textContent=`Humidity: ${e.humidity}%`,l.textContent=`Wind Speed: ${e.windSpeed}${u}`}(e),function(e){console.log(e);let t=n(),o=e.coord.lon;return`https://api.openweathermap.org/data/2.5/onecall?lat=${e.coord.lat}&lon=${o}&exclude=minutely,alerts&appid=02cafa796b213d5a197f3a3378f70a47&units=${t}`}(e)))).then((e=>(console.log(e),console.log("hi"),async function(e){try{let t=await fetch(e,{mode:"cors"}),n=await t.json(),o=n.timezone_offset,a=n.hourly.slice(0,24);return{dailyForecast:{timeZoneOffset:o,dailyData:n.daily},hourlyForecast:{timeZoneOffset:o,hourlyData:a}}}catch(e){console.log(e)}}(e)))).then((e=>{!function(e){let n=e.hourlyData,o=e.timeZoneOffset;for(let e=0;e<24;e++){const a=document.querySelector(`[data-hourly='${e}']`).children;let r,i=a[0],c=a[1],l=a[2];r=0===e?"Now":t(n[e].dt+o),i.textContent=r;let d=n[e].weather[0].icon;c.src=`./images/${d}.png`;let u=Math.round(n[e].temp);l.textContent=`${u}°`}}(e.hourlyForecast),function(e){console.log("daily"),console.log(e);let t=e.dailyData,n=e.timeZoneOffset;for(let e=0;e<7;e++){const a=document.querySelector(`[data-daily='${e}']`).children;let r,i=a[0],c=a[1],l=a[2],d=a[3];r=0===e?"Today":(o=t[e].dt+n,["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date(1e3*o).getDay()]),i.textContent=r;let u=t[e].weather[0].icon;c.src=`./images/${u}.png`;let m=Math.round(t[e].temp.max),s=Math.round(t[e].temp.min);l.textContent=`H: ${m}°`,d.textContent=`L: ${s}°`}var o;console.log(t[0].weather.icon)}(e.dailyForecast)})),document.getElementById("input").value="")}e.d({},{K:()=>n}),document.querySelector("#form").addEventListener("submit",(e=>{o(document.getElementById("input").value),e.preventDefault()})),document.querySelectorAll('input[type="radio"]').forEach((e=>{e.addEventListener("change",(()=>{o(null)}))})),o("Tokyo")})();