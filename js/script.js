

let searchInput = document.querySelector("#wheather-search-input");
let searchBtn = document.querySelector("#wheather-search-btn");
let  weather_url = "https://api.weatherbit.io/v2.0/current?city=Jeddah&key=d3435e5a703241d983618a727e5c7d6f";
fetch_weather(); 

searchBtn.addEventListener("click",function(){
    weather_url = "https://api.weatherbit.io/v2.0/current?city="+searchInput.value+"&key=d3435e5a703241d983618a727e5c7d6f";
    fetch_weather(); 
})

 function fetch_weather(){
 fetch(weather_url).then((response)=>{
    response.json().then((res) =>{
        let time = res.data[0].ob_time;
        let subtime = time.substr(time.length - 5);

    let innerCard = `
    <div class="d-flex">
    <h6 class="flex-grow-1">${res.data[0].city_name}</h6>
    <h6>${subtime}</h6>
  </div>
  <div class="d-flex flex-column text-center mt-5 mb-4">
    <h6 class="display-4 mb-0 fw-normal" style="color: #1C2331;"> ${res.data[0].temp}°C </h6>
    <span class="small" style="color: #868B94">${res.data[0].weather.description}</span>
  </div>

  <div class="d-flex align-items-center">
    <div class="flex-grow-1" style="font-size: 1rem;">
      <div><i class="fas fa-wind fa-fw" style="color: #868B94;"></i> <span class="ms-1"> ${res.data[0].wind_spd} km/h </span></div>
      <div><i class="fas fa-tint fa-fw" style="color: #868B94;"></i> <span class="ms-1"> ${res.data[0].rh}% </span></div>
      <div><i class="fas fa-sun fa-fw" style="color: #868B94;"></i> <span class="ms-1"> 0.2h </span></div>
    </div>
 
  </div>`;

  document.querySelector("#wheather-card").innerHTML=innerCard;


    })
 });
 }
