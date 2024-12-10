var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var showdata = document.getElementById('showData');
console.log(showdata);
async function search(a) {
    let respone = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=667e0b9f292a4a1ab48125730240912&q=${a}&days=3`);
    if (respone.ok && 400 != respone.status) {
        let data = await respone.json();
        
        console.log(data);
        let locname =data.location.name;
        let temp = data.current.temp_c;
        let srcTod = data.current.condition.icon;
        let srcTmr = data.forecast.forecastday[1].day.condition.icon;
        let srcAfTmr = data.forecast.forecastday[2].day.condition.icon;
        let textTmr = data.forecast.forecastday[1].day.condition.text;
        let textAfTmr = data.forecast.forecastday[2].day.condition.text;
        let text = data.current.condition.text;
        let temptmr = data.forecast.forecastday[1].day.maxtemp_c;
        let tempAfTmr = data.forecast.forecastday[2].day.maxtemp_c;
        let minTempTmr = data.forecast.forecastday[1].day.mintemp_c;
        let minTempAfTmr = data.forecast.forecastday[2].day.mintemp_c;
        displayWeather(locname,temp,srcTod,text,temptmr,srcTmr,minTempTmr,textTmr,srcAfTmr,textAfTmr,tempAfTmr,minTempAfTmr);
        let date = data.current.last_updated;
        console.log(date);
        const d = new Date(date);
        document.getElementById('todayName').innerText = days[d.getDay()];
        document.getElementById('dateName').innerText = `${d.getDate()} ${months[d.getMonth()]}`;
        document.getElementById('tmrhead').innerText = days[d.getDay()+1%7];
        document.getElementById('afTmr').innerText = days[d.getDay()+2%7];

     



    }
}
search('cairo');
document.getElementById('searchName').addEventListener('keyup',function(e){
    search(e.target.value);
})

function displayWeather(a ,t,src,text,temptmr,srcTmr,mintemp,textTmr,srcAfTmr,textAfTmr,tempAfTmr,minTempAfTmr) {

    showdata.innerHTML =`<div class="row shadow w-80 mb-5 g-0">
    <div class="col-lg-4">
      <div class="weather-cards h-100 d-flex">
        <div class="today w-100">
          <div class="today-header p-3 d-flex justify-content-between">
            <span id="todayName">Sunday</span>
            <span id="dateName">8December</span>
          </div>
          <div class="today-weather p-4">
            <div class="location h3 text-white-50 fs-2 mt-3">${a}</div>
            <div class="degree text-white">
              <span id="temp" class="">${t}<sup>o</sup>C</span>
              <span id="icon"><i class="fas fa-sun"></i></span>
            </div>
            <div class="forecast-icon">
              <img src="https:/${src}" width="90" alt="">
            </div>
            <div class="custom">${text}</div>
            <div class="text-white d-flex align-items-center gap-2">
            <span><img src="images/icon-umberella.png" alt=""> 20%</span>
            <span><img src="images/icon-wind.png" alt=""> 18km/h</span>
            <span><img src="images/icon-compass.png" alt=""> East</span>
            </div>
          </div>
        </div>
    </div>
  </div>
  <div class="col-lg-4">
    <div class="weather-cards shadow h-100 d-flex">
      <div class="today bg-section pb-4 text-center w-100">
        <div id="tmrhead" class="tmr-header text-white part-color p-3">
          
        </div>
        <div class="today-weather p-5">
          <div class="forecast-icon pb-3">
            <img src="https:${srcTmr}" alt="">
          </div>
          <div class="degree text-white">
            <span id="" class="fs-3">${temptmr}<sup>o</sup>C</span>
          </div>
          <div class="degree mt-2 pt-2 text-white">
          <span id="" class="fs-6 ">${mintemp}<sup>o</sup>C</span>
        </div>
          <div class="custom">${textTmr}</div>
          </div>
        </div>
      </div>
  </div>
  <div class="col-lg-4">
  <div class="weather-cards shadow h-100 d-flex">
    <div class="today bg-section pb-4 text-center w-100">
      <div id="afTmr" class="tmr-header text-white part-color p-3">
        
      </div>
      <div class="today-weather p-5">
        <div class="forecast-icon pb-3">
          <img src="https:/${srcAfTmr}" alt="">
        </div>
        <div class="degree text-white">
          <span id="" class="fs-3">${tempAfTmr}</span>
        </div>
        <div class="degree mt-2 pt-2 text-white">
        <span id="" class="fs-6 ">${minTempAfTmr}<sup>o</sup>C</span>
      </div>
        <div class="custom">${textAfTmr}</div>
        </div>
      </div>
    </div>
</div>
`;
}