document.addEventListener("DOMContentLoaded",()=>{
const apiKey = "ed1f779c6e5949c2a22130150261103";
const URL = "http://api.weatherapi.com/v1/current.json?&aqi=no";
let city="";
let lat;
let long;
getLocation();
document.querySelector(".search").addEventListener("change", (e)=>{
city = e.target.value;
document.querySelector(".error").innerHTML ="";
document.getElementById("load").classList.add("loader");
getWeatherData();
});
let response;
async function getWeatherData() {
    if(city!=""){
     response = await fetch(URL + `&key=${apiKey}` + `&q=${city}`);
    } else{
        response = await fetch(URL + `&key=${apiKey}` + `&q=${lat},${long}`);
    }
    var data = await response.json();
  if(response.status == 400){
    document.querySelector(".error").innerHTML ="Invalid city name";
  }
    document.getElementById("load").classList.remove("loader");
    console.log(data);
    console.log(data.location.name);
    document.getElementById("temp").innerHTML = data.current.temp_c + "&degC";
    document.querySelector(".city").innerHTML = data.location.name + ", " + data.location.country;
    document.querySelector(".time").innerHTML = data.location.localtime;
    document.querySelector(".condition").innerHTML = data.current.condition.text;
    document.querySelector(".feel").innerHTML = "Feels like: " + data.current.feelslike_c + "&degC";
    document.querySelector(".humidity").innerHTML = "Humidity: " + data.current.humidity;
}
function getLocation() {
    document.getElementById("load").classList.add("loader");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
function success(position) {
  lat= position.coords.latitude;
  long=position.coords.longitude;
  getWeatherData();
}

function error() {
  alert("Sorry, no position available.");
}
});
