var cityEl = document.getElementById("city-area");
var tempEl = document.getElementById("temp-area");
var windEl = document.getElementById("wind-area");
var humidityEl = document.getElementById("humidity-area");
var uvEl = document.getElementById("UV-area");

var currentWeather = function (city) {
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&id=524901&appid=9114ee0cf1e613881e91ee401ef02c78"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      cityEl.innerHTML = "<h2>" + response.name + " (example date) </h2>";
      tempEl.innerHTML = "Temp: " + response.main.temp;
      windEl.innerHTML = "Wind: " + response.wind.speed + " MPH";
      humidityEl.innerHTML = "Humidity: " + response.main.humidity + "%";
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      fetch(
        "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=9114ee0cf1e613881e91ee401ef02c78&cnt=1"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          console.log(response);
          uvEl.innerHTML = "UV Index: " + response[0].value;
        });
    });
};

currentWeather("kansas");
