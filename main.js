(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(){return"Celcius"===document.querySelector('input[name="unit"]:checked').value?"metric":"imperial"}function n(){let e=document.getElementById("input").value;if(e||(e=document.querySelector(".cityName").textContent),e){let n=async function(e){let n=(a=e,r=t(),`http://api.openweathermap.org/data/2.5/weather?q=${a}&appid=02cafa796b213d5a197f3a3378f70a47&units=${r}`),o=await async function(e){try{let t={};return await fetch(e,{mode:"cors"}).then((e=>e.json())).then((e=>{t.city=e.name,t.temp=Math.round(e.main.temp),t.lowTemp=Math.round(e.main.temp_min),t.highTemp=Math.round(e.main.temp_max),t.feels_like=e.main.feels_like,t.humidity=e.main.humidity,t.windSpeed=e.wind.speed,t.weather=e.weather[0].main,t.description=e.weather[0].description,t.coord=e.coord})),t}catch(e){console.log(e)}}(n);var a,r;return o}(e);console.log(n),n.then((e=>(function(e){const n=document.querySelector(".cityName"),o=document.querySelector(".temp"),a=document.querySelector(".description"),r=document.querySelector(".highTemp"),c=document.querySelector(".lowTemp"),i=document.querySelector(".humidity"),d=document.querySelector(".wind");let l,u;"metric"===t()?(l="°C",u="m/s"):(l="°F",u="mph"),n.textContent=e.city,o.textContent=`${e.temp}${l}`,a.textContent=e.description,r.textContent=`High: ${e.highTemp}${l}`,c.textContent=`Low: ${e.lowTemp}${l}`,i.textContent=`Humidity: ${e.humidity}%`,d.textContent=`Wind Speed: ${e.windSpeed}${u}`}(e),function(e){console.log(e);let n=t(),o=e.coord.lon;return`https://api.openweathermap.org/data/2.5/onecall?lat=${e.coord.lat}&lon=${o}&exclude=minutely,alerts&appid=02cafa796b213d5a197f3a3378f70a47&units=${n}`}(e)))).then((e=>(console.log(e),console.log("hi"),async function(e){try{let t;return await fetch(e,{mode:"cors"}).then((e=>e.json())).then((e=>{t=Object.assign({},e)})),{detailedForecast:t}}catch(e){console.log(e)}}(e)))).then((e=>{console.log("hourly"),function(e){let t=e.detailedForecast.daily;for(let e=0;e<7;e++){const o=document.querySelector(`[data-daily='${e}']`).children;let a=o[0],r=o[1],c=o[2],i=o[3],d=(n=t[e].dt,["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date(1e3*n).getDay()]);a.textContent=d;let l=t[e].weather[0].icon;console.log(l),r.src=`./images/${l}.png`;let u=Math.round(t[e].temp.max),m=Math.round(t[e].temp.min);c.textContent=`${u}°`,i.textContent=`${m}°`}var n;console.log(t[0].weather.icon)}(e)})),document.getElementById("input").value=""}}e.d({},{K:()=>t}),document.querySelector("#form").addEventListener("submit",(e=>{n(),e.preventDefault()})),document.querySelectorAll('input[type="radio"]').forEach((e=>{e.addEventListener("change",n)}))})();